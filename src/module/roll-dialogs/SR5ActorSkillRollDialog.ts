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
    specialization?: string;
};

export class SR5ActorSkillRollDialog extends SR5ActorRollDialog {
    readonly skillType: SkillTypes;
    protected specialization: string;
    protected skill: string;
    protected category?: string;
    get skillField(): SkillField | undefined {
        if (this.skillType === 'active') {
            return this.actor.findActiveSkill(this.skill);
        } else if (this.skillType === 'language') {
            return this.actor.findLanguageSkill(this.skill);
        } else if (this.skillType === 'knowledge' && this.category) {
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
        this.specialization = options.specialization ?? '';
        this.category = options.category;
        this.skill = options.skill;
        if (this.skillField?.label) {
            this.addPart(this.skillField.label, this.skillField.value);
            this.attribute = this.skillField.attribute;
        }
        if (this.attributeField?.label) {
            this.addPart(this.attributeField.label, this.attributeField.value);
        }
        this.limit = this.limitField?.value ?? 0;
    }

    getData(options?: any): any {
        const data = super.getData(options);
        data.skill = this.skill;
        data.attribute = this.attribute;
        data.enableAttributeOption = true;
        const skillSpecs = this.skillField?.specs ?? [];
        if (skillSpecs.length > 0) {
            data.enableSpecializationOption = true;
            data.specialization = this.specialization;
            data.skillSpecializations = skillSpecs;
        }

        return data;
    }

    changeAttribute(attributeId: string) {
        const oldAtt = this.attributeField;
        this.attribute = attributeId;

        if (oldAtt?.label) {
            this.removePart(oldAtt.label);
        }

        if (this.attributeField?.label) {
            this.addPart(this.attributeField.label, this.attributeField.value);
        }
        this.limit = this.limitField?.value ?? 0;
    }

    changeSpec(specialization: string) {
        const oldSpec = this.specialization;
        if (oldSpec) {
            this.removePart(oldSpec);
        }
        this.specialization = specialization;
        if (this.specialization) {
            this.addPart(this.specialization, 2);
        }
    }

    changeSkill(skillId) {
        const oldSkill = this.skillField;
        const oldAtt = this.attributeField;
        this.skill = skillId;

        if (this.skillField?.label) {
            this.attribute = this.skillField.attribute;
        }
        this.removePart('SR5.Defaulting');

        // remove old parts
        if (oldAtt?.label) {
            this.removePart(oldAtt?.label);
        }
        if (oldSkill?.label) {
            this.removePart(oldSkill.label);
        }

        if (this.skillField?.label) {
            // add the defaulting key if at 0, otherwise add the skill to parts
            if (this.skillField.value === 0) {
                this.addPart('SR5.Defaulting', -1);
            } else {
                this.addPart(this.skillField.label, this.skillField.value);
            }
        }

        // add attribute to parts
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

        $(html)
            .find('[name="specialization"]')
            .on('change', (event: any) => {
                const spec = event.currentTarget.value;
                if (spec) {
                    this.changeSpec(spec);
                    this.render();
                }
            });
    }
}
