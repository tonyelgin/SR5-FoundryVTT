import { Helpers } from '../helpers';
import { SR5Item } from '../item/SR5Item';
import ItemData = Shadowrun.ItemData;
import Attributes = Shadowrun.Attributes;
import Skills = Shadowrun.Skills;
import KnowledgeSkillList = Shadowrun.KnowledgeSkillList;
import KnowledgeSkills = Shadowrun.KnowledgeSkills;
import Limits = Shadowrun.Limits;
import Tracks = Shadowrun.Tracks;
import AttributeField = Shadowrun.AttributeField;
import Matrix = Shadowrun.Matrix;
import SkillField = Shadowrun.SkillField;
import ValueMaxPair = Shadowrun.ValueMaxPair;
import ModList = Shadowrun.ModList;
import BaseValuePair = Shadowrun.BaseValuePair;
import ModifiableValue = Shadowrun.ModifiableValue;
import LabelField = Shadowrun.LabelField;
import LimitField = Shadowrun.LimitField;
import { SYSTEM_NAME } from '../constants';

export class SR5Actor extends Actor {
    async update(data, options?) {
        await super.update(data, options);
        // trigger update for all items with action
        // needed for rolls to properly update when items or attributes update
        const itemUpdates: Item[] = [];
        // @ts-ignore
        for (let item of this.data.items) {
            if (item && item.data.action) {
                itemUpdates.push(item);
            }
        }
        await this.updateEmbeddedEntity('OwnedItem', itemUpdates);
        return this;
    }

    getOverwatchScore() {
        const os = this.getFlag(SYSTEM_NAME, 'overwatchScore');
        return os !== undefined ? os : 0;
    }

    async setOverwatchScore(value) {
        const num = parseInt(value);
        if (!isNaN(num)) {
            return this.setFlag(SYSTEM_NAME, 'overwatchScore', num);
        }
    }

    prepareData() {
        super.prepareData();

        const actorData = this.data;
        // @ts-ignore
        const items: SR5Item[] = actorData.items;
        const data = actorData.data;
        const { attributes }: { attributes: Attributes } = data;
        const armor = data.armor;
        const { limits }: { limits: Limits } = data;
        const { language }: { language: KnowledgeSkillList } = data.skills;
        const { active }: { active: Skills } = data.skills;
        const { knowledge: knowledge }: { knowledge: KnowledgeSkills } = data.skills;
        const { track }: { track: Tracks } = data;

        attributes.magic.hidden = !(data.special === 'magic');
        attributes.resonance.hidden = !(data.special === 'resonance');

        if (!data.modifiers) data.modifiers = {};
        const modifiers = {};
        let miscTabModifiers = [
            'soak',
            'drain',
            'armor',
            'physical_limit',
            'social_limit',
            'mental_limit',
            'stun_track',
            'physical_track',
            'meat_initiative',
            'meat_initiative_dice',
            'astral_initiative',
            'astral_initiative_dice',
            'matrix_initiative',
            'matrix_initiative_dice',
            'composure',
            'lift_carry',
            'judge_intentions',
            'memory',
            'walk',
            'run',
            'defense',
            'wound_tolerance',
            'essence',
            'fade',
        ];
        miscTabModifiers.sort();
        miscTabModifiers.unshift('global');

        for (let item of miscTabModifiers) {
            modifiers[item] = data.modifiers[item] || 0;
        }

        data.modifiers = modifiers;

        let totalEssence = 6;
        armor.base = 0;
        armor.value = 0;
        armor.mod = {};
        for (const element of Object.keys(CONFIG.SR5.elementTypes)) {
            armor[element] = 0;
        }

        // DEFAULT MATRIX ATTS TO MOD VALUE
        const matrix: Matrix = data.matrix;
        matrix.firewall.value = Helpers.totalMods(matrix.firewall.mod);
        matrix.data_processing.value = Helpers.totalMods(matrix.data_processing.mod);
        matrix.attack.value = Helpers.totalMods(matrix.attack.mod);
        matrix.sleaze.value = Helpers.totalMods(matrix.sleaze.mod);
        matrix.condition_monitor.max = 0;
        matrix.rating = 0;
        matrix.name = '';
        matrix.device = '';

        // PARSE WEAPONS AND SET VALUES AS NEEDED
        for (let item of Object.values(items)) {
            const itemData: ItemData = (item.data as unknown) as ItemData;

            const equipped = itemData.technology?.equipped;
            if (equipped) {
                if (itemData.armor && itemData.armor.value) {
                    // if it's a mod, add to the mod field
                    if (itemData.armor.mod) {
                        armor.mod[item.name] = itemData.armor.value;
                    } // if not a mod, set armor.value to the items value
                    else {
                        armor.base = itemData.armor.value;
                        armor.label = item.name;
                        for (const element of Object.keys(CONFIG.SR5.elementTypes)) {
                            armor[element] = itemData.armor[element];
                        }
                    }
                }
            }
            // MODIFIES ESSENCE
            if (itemData.essence && itemData.technology && itemData.technology.equipped) {
                totalEssence -= itemData.essence;
            }
            // MODIFIES MATRIX ATTRIBUTES
            if (item.type === 'device' && itemData.technology?.equipped) {
                matrix.device = item._id;
                matrix.condition_monitor.max = itemData.technology.condition_monitor?.max || 0;
                matrix.condition_monitor.value = itemData.technology.condition_monitor?.value || 0;
                matrix.rating = itemData.technology.rating;
                matrix.is_cyberdeck = itemData.category === 'cyberdeck';
                matrix.name = item.name;
                matrix.item = itemData;

                if (itemData.category === 'cyberdeck' && itemData.atts) {
                    for (let [key, att] of Object.entries(itemData.atts)) {
                        matrix[att.att].value += att.value;
                        matrix[att.att].device_att = key;
                    }
                } else {
                    matrix.firewall.value += matrix.rating || 0;
                    matrix.data_processing.value += matrix.rating || 0;
                }
            }
        }

        armor.mod[game.i18n.localize('SR5.Bonus')] = modifiers['armor'];
        // SET ARMOR
        armor.value = armor.base + Helpers.totalMods(armor.mod);

        // ATTRIBUTES
        for (let [, att] of Object.entries(attributes)) {
            if (!att.hidden) {
                if (!att.mod) att.mod = {};
                att.value = att.base + Helpers.totalMods(att.mod);
            }
        }

        if (language) {
            if (!language.value) language.value = {};
            language.attribute = 'intuition';
        }

        const prepareSkill = (skill) => {
            skill.mod = {};
            if (!skill.base) skill.base = 0;
            if (skill.bonus?.length) {
                for (let bonus of skill.bonus) {
                    skill.mod[bonus.key] = bonus.value;
                }
            }
            skill.value = skill.base + Helpers.totalMods(skill.mod);
        };

        for (const skill of Object.values(active)) {
            if (!skill.hidden) {
                prepareSkill(skill);
            }
        }

        {
            const entries = Object.entries(data.skills.language.value);
            // remove entries which are deleted TODO figure out how to delete these from the data
            entries.forEach(([key, val]: [string, { _delete?: boolean }]) => val._delete && delete data.skills.language.value[key]);
        }

        for (let skill of Object.values(language.value)) {
            prepareSkill(skill);
        }

        for (let [, group] of Object.entries(knowledge)) {
            const entries = Object.entries(group.value);
            // remove entries which are deleted TODO figure out how to delete these from the data
            group.value = entries
                .filter(([, val]) => !val._delete)
                .reduce((acc, [id, skill]) => {
                    prepareSkill(skill);
                    acc[id] = skill;
                    return acc;
                }, {});
        }

        // TECHNOMANCER LIVING PERSONA
        if (data.special === 'resonance') {
            // if we don't have a device, use living persona
            if (matrix.device === '') {
                // we should use living persona
                matrix.firewall.value += attributes.willpower.value;
                matrix.data_processing.value += attributes.logic.value;
                matrix.rating = attributes.resonance.value;
                matrix.attack.value += attributes.charisma.value;
                matrix.sleaze.value += attributes.intuition.value;
                matrix.name = 'Living Persona';
                matrix.device = '';
                matrix.condition_monitor.max = 0;
            }
        }

        // set matrix condition monitor to max if greater than
        if (matrix.condition_monitor.value > matrix.condition_monitor.max) matrix.condition_monitor.value = matrix.condition_monitor.max;

        // ADD MATRIX ATTS TO LIMITS
        limits.firewall = {
            value: matrix.firewall.value,
            base: matrix.firewall.base,
            mod: matrix.firewall.mod,
            hidden: true,
        };
        limits.data_processing = {
            value: matrix.data_processing.value,
            base: matrix.data_processing.base,
            mod: matrix.data_processing.mod,
            hidden: true,
        };
        limits.attack = {
            value: matrix.attack.value,
            base: matrix.attack.base,
            mod: matrix.attack.mod,
            hidden: true,
        };
        limits.sleaze = {
            value: matrix.sleaze.value,
            base: matrix.sleaze.base,
            mod: matrix.sleaze.mod,
            hidden: true,
        };

        attributes.firewall = {
            value: matrix.firewall.value,
            base: matrix.firewall.base,
            mod: matrix.firewall.mod,
            hidden: true,
        };
        attributes.data_processing = {
            value: matrix.data_processing.value,
            base: matrix.data_processing.base,
            mod: matrix.data_processing.mod,
            hidden: true,
        };
        attributes.attack = {
            value: matrix.attack.value,
            base: matrix.attack.base,
            mod: matrix.attack.mod,
            hidden: true,
        };
        attributes.sleaze = {
            value: matrix.sleaze.value,
            base: matrix.sleaze.base,
            mod: matrix.sleaze.mod,
            hidden: true,
        };

        // SET ESSENCE
        actorData.data.attributes.essence.value = +(totalEssence + modifiers['essence']).toFixed(3);

        // SETUP LIMITS
        limits.physical.value =
            Math.ceil((2 * attributes.strength.value + attributes.body.value + attributes.reaction.value) / 3) + modifiers['physical_limit'];
        limits.mental.value = Math.ceil((2 * attributes.logic.value + attributes.intuition.value + attributes.willpower.value) / 3) + modifiers['mental_limit'];
        limits.social.value =
            Math.ceil((2 * attributes.charisma.value + attributes.willpower.value + attributes.essence.value) / 3) + modifiers['social_limit'];

        // MOVEMENT
        const movement = data.movement;
        movement.walk.value = attributes.agility.value * (2 + modifiers['walk']);
        movement.run.value = attributes.agility.value * (4 + modifiers['run']);

        // CONDITION_MONITORS
        track.physical.max = 8 + Math.ceil(attributes.body.value / 2) + modifiers['physical_track'];
        track.physical.overflow.max = attributes.body.value;
        track.stun.max = 8 + Math.ceil(attributes.willpower.value / 2) + modifiers['stun_track'];

        // CALCULATE RECOIL
        data.recoil_compensation = 1 + Math.ceil(attributes.strength.value / 3);

        // INITIATIVE
        const init = data.initiative;
        init.meatspace.base.base = attributes.intuition.value + attributes.reaction.value + modifiers['meat_initiative'];
        init.meatspace.dice.base = 1 + modifiers['meat_initiative_dice'];
        init.astral.base.base = attributes.intuition.value * 2 + modifiers['astral_initiative'];
        init.astral.dice.base = 2 + modifiers['astral_initiative_dice'];
        init.matrix.base.base = attributes.intuition.value + data.matrix.data_processing.value + modifiers['matrix_initiative'];
        init.matrix.dice.base = data.matrix.hot_sim ? 4 : 3 + modifiers['matrix_initiative_dice'];
        if (init.perception === 'matrix') init.current = init.matrix;
        else if (init.perception === 'astral') init.current = init.astral;
        else {
            init.current = init.meatspace;
            init.perception = 'meatspace';
        }
        init.current.dice.value = init.current.dice.base;
        if (init.edge) init.current.dice.value = 5;
        init.current.dice.value = Math.min(5, init.current.dice.value); // maximum of 5d6 for initiative
        init.current.dice.text = `${init.current.dice.value}d6`;
        init.current.base.value = init.current.base.base;

        if (data.magic.drain && !data.magic.drain.mod) data.magic.drain.mod = {};

        {
            const count = 3 + modifiers['wound_tolerance'];
            const stunWounds = Math.floor(data.track.stun.value / count);
            const physicalWounds = Math.floor(data.track.physical.value / count);

            data.track.stun.wounds = stunWounds;
            data.track.physical.wounds = physicalWounds;

            data.wounds = {
                value: stunWounds + physicalWounds,
            };
        }

        // limit labels
        for (let [l, limit] of Object.entries(limits)) {
            limit.label = CONFIG.SR5.limits[l];
        }
        // skill labels
        for (let [s, skill] of Object.entries(active)) {
            skill.label = CONFIG.SR5.activeSkills[s];
        }
        // attribute labels
        for (let [a, att] of Object.entries(attributes)) {
            att.label = CONFIG.SR5.attributes[a];
        }
        // tracks
        for (let [t, tr] of Object.entries(track)) {
            tr.label = CONFIG.SR5.damageTypes[t];
        }
    }

    getModifier(modifierName: string): number | undefined {
        return this.data.data.modifiers[modifierName];
    }

    findActiveSkill(skillName?: string): SkillField | undefined {
        if (skillName === undefined) return undefined;
        return this.data.data.skills.active[skillName];
    }

    findAttribute(attributeName?: string): AttributeField | undefined {
        if (attributeName === undefined) return undefined;
        return this.data.data.attributes[attributeName];
    }

    findLimitFromAttribute(attributeName?: string): LimitField | undefined {
        if (attributeName === undefined) return undefined;
        const attribute = this.findAttribute(attributeName);
        if (!attribute?.limit) return undefined;
        return this.findLimit(attribute.limit);
    }

    findLimit(limitName?: string): LimitField | undefined {
        if (!limitName) return undefined;
        return this.data.data.limits[limitName];
    }

    getWoundModifier(): number {
        return -1 * this.data.data.wounds?.value || 0;
    }

    getEdge(): AttributeField & ValueMaxPair<number> {
        return this.data.data.attributes.edge;
    }

    getArmor(): BaseValuePair<number> & ModifiableValue & LabelField {
        return this.data.data.armor;
    }

    getOwnedItem(itemId: string): SR5Item | null {
        return (super.getOwnedItem(itemId) as unknown) as SR5Item;
    }

    getMatrixDevice(): SR5Item | undefined | null {
        const matrix = this.data.data.matrix;
        console.log(matrix);
        if (matrix.device) return this.getOwnedItem(matrix.device);
        return undefined;
    }

    getFullDefenseAttribute(): AttributeField | undefined {
        let att = this.data.data.full_defense_attribute;
        if (!att) att = 'willpower';
        return this.findAttribute(att);
    }

    getEquippedWeapons(): SR5Item[] {
        return this.items.filter((item) => item.isEquipped() && item.data.type === 'weapon');
    }

    addKnowledgeSkill(category, skill?) {
        const defaultSkill = {
            name: '',
            specs: [],
            base: 0,
            value: 0,
            mod: 0,
        };
        skill = {
            ...defaultSkill,
            ...skill,
        };

        const id = randomID(16);
        const value = {};
        value[id] = skill;
        const fieldName = `data.skills.knowledge.${category}.value`;
        const updateData = {};
        updateData[fieldName] = value;
        this.update(updateData);
    }

    removeLanguageSkill(skillId) {
        const value = {};
        value[skillId] = { _delete: true };
        this.update({ 'data.skills.language.value': value });
    }

    addLanguageSkill(skill) {
        const defaultSkill = {
            name: '',
            specs: [],
            base: 0,
            value: 0,
            mod: 0,
        };
        skill = {
            ...defaultSkill,
            ...skill,
        };

        const id = randomID(16);
        const value = {};
        value[id] = skill;
        const fieldName = `data.skills.language.value`;
        const updateData = {};
        updateData[fieldName] = value;
        this.update(updateData);
    }

    removeKnowledgeSkill(skillId, category) {
        const value = {};
        const updateData = {};

        const dataString = `data.skills.knowledge.${category}.value`;
        value[skillId] = { _delete: true };
        updateData[dataString] = value;

        this.update(updateData);
    }

    _addMatrixParts(parts, atts) {
        if (Helpers.isMatrix(atts)) {
            const m = this.data.data.matrix;
            if (m.hot_sim) parts['SR5.HotSim'] = 2;
            if (m.running_silent) parts['SR5.RunningSilent'] = -2;
        }
    }
    _addGlobalParts(parts) {
        if (this.data.data.modifiers.global) {
            parts['SR5.Global'] = this.data.data.modifiers.global;
        }
    }

    _addDefenseParts(parts) {
        const reaction = this.findAttribute('reaction');
        const intuition = this.findAttribute('intuition');
        const mod = this.getModifier('defense');

        if (reaction) {
            parts[reaction.label || 'SR5.Reaction'] = reaction.value;
        }
        if (intuition) {
            parts[intuition.label || 'SR5.Intuition'] = intuition.value;
        }
        if (mod) {
            parts['SR5.Bonus'] = mod;
        }
    }

    _addArmorParts(parts: ModList<number>) {
        const armor = this.getArmor();
        if (armor) {
            parts[armor.label || 'SR5.Armor'] = armor.base;
            for (let [key, val] of Object.entries(armor.mod)) {
                parts[key] = val;
            }
        }
    }

    _addSoakParts(parts: ModList<number>) {
        const body = this.findAttribute('body');
        if (body) {
            parts[body.label || 'SR5.Body'] = body.value;
        }
        this._addArmorParts(parts);
    }

    /**
     * Override setFlag to remove the 'SR5.' from keys in modlists, otherwise it handles them as embedded keys
     * @param scope
     * @param key
     * @param value
     */
    setFlag(scope: string, key: string, value: any): Promise<Entity> {
        const newValue = Helpers.onSetFlag(value);
        return super.setFlag(scope, key, newValue);
    }

    /**
     * Override getFlag to add back the 'SR5.' keys correctly to be handled
     * @param scope
     * @param key
     */
    getFlag(scope: string, key: string): any {
        const data = super.getFlag(scope, key);
        return Helpers.onGetFlag(data);
    }
}
