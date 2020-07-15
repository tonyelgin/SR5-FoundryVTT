import { SelectField } from './base/SelectField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';
import { SR5ActiveSkill } from '../../types/enum/SR5ActiveSkill';
import SR5ActorData = Shadowrun.SR5ActorData;

export class SkillField extends SelectField {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(defaultSkill: SR5ActiveSkill) {
        super('skill', 'SR5.Skill', defaultSkill.toString());
    }

    protected getOptions(): string[] {
        return Object.keys(SR5ActiveSkill);
    }

    protected getValues(): string[] {
        return Object.values(SR5ActiveSkill);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">

    collect(actor: SR5Actor | undefined, data: RollData) {
        // TODO: An example of how powerful this is.
        //  We might not want this to pull data like this though.
        //  Roll now has access to the entire skill *and* attribute.
        //  Three lines of code (but some error handling is needed).
        const actorData: SR5ActorData = actor?.data.data;
        data['skill'] = actorData.skills.active[this.getValue()];
        data['skill']['attribute'] = actorData.attributes[data['skill']['attribute']];
    }

    // </editor-fold>
}
