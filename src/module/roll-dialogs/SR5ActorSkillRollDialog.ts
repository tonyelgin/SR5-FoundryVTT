import { SR5ActorRollDialog, SR5ActorRollDialogOptions } from './SR5ActorRollDialog';
import SkillField = Shadowrun.SkillField;
import AttributeField = Shadowrun.AttributeField;
import LimitField = Shadowrun.LimitField;
import KnowledgeSkillCategory = Shadowrun.KnowledgeSkillCategory;
import SkillTypes = Shadowrun.SkillTypes;

export type SR5ActorSkillRollDialogOptions = SR5ActorRollDialogOptions & {
    skill: string;
    skillType?: SkillTypes; // if left blank, assumed to be active
    attribute?: string;
    limit?: string;
    category?: KnowledgeSkillCategory;
};

export class SR5ActorSkillRollDialog extends SR5ActorRollDialog {
    readonly skillType: SkillTypes;
    protected skill: string;
    protected category?: string;
    get skillField(): SkillField | undefined {
        console.log(this.skillType);
        if (this.skillType === 'active') {
            return this.actor.findActiveSkill(this.skill);
        } else if (this.skillType === 'language') {
            return this.actor.findLanguageSkill(this.skill);
        } else if (this.skillType === 'knowledge' && this.category) {
            console.log('knowledge');
            return this.actor.findKnowledgeSkill(this.category, this.skill);
        }
    }

    attribute: string;
    get attributeField(): AttributeField | undefined {
        return this.actor.findAttribute(this.attribute);
    }

    get limitField(): LimitField | undefined {
        return this.actor.findLimitFromAttribute(this.attribute);
    }

    constructor(options: SR5ActorSkillRollDialogOptions) {
        super(options);
        this.skillType = options.skillType ?? 'active';
        this.category = options.category;
        this.skill = options.skill;
        console.log(this.skill);
        console.log(this.skillField);
        if (this.skillField) {
            this.addUniquePart(this.skillField.label ?? '', this.skillField.value);
            this.attribute = this.skillField.attribute;
            console.log(this.attribute);
        }
        if (this.attributeField) {
            this.addUniquePart(this.attributeField.label ?? '', this.attributeField.value);
        }
        this.limit = this.limitField?.value ?? 0;
    }

    getData(options?: any): any {
        const data = super.getData(options);
        data.skill = this.skill;
        data.attribute = this.attribute;
        data.enableAttributeOption = true;

        console.log(data);

        return data;
    }

    changeAttribute(attributeId) {
        if (this.attributeField?.label) {
            this.removePart(this.attributeField.label)
        }
        this.attribute = attributeId;
        if (this.attributeField?.label) {
            this.addPart(this.attributeField.label, this.attributeField.value);
        }
        this.limit = this.limitField?.value ?? 0;
    }

    changeSkill(skillId) {
        if (this.attributeField?.label) {
            this.removePart(this.attributeField?.label)
        }

        if (this.skillField?.label) {
            this.removePart(this.skillField.label);
        }
        this.skill = skillId;
        if (this.skillField?.label) {
            this.addPart(this.skillField.label, this.skillField.value);
        }

        if (this.attributeField?.label) {
            this.addPart(this.attributeField.label, this.attributeField.value);
        }
    }

    activateListeners(html: JQuery | HTMLElement) {
        super.activateListeners(html);
        $(html)
            .find('[name="skill"]')
            .on('change', (event: any) => {
                const newSkill = event.currentTarget.value;
                this.changeSkill(newSkill);
                this.render();
            });

        $(html)
            .find('[name="attribute"]')
            .on('change', (event: any) => {
                const newAttribute = event.currentTarget.value;
                this.changeAttribute(newAttribute);
                this.render();
            });
    }
}
