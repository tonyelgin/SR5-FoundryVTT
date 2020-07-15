import { SelectField } from './base/SelectField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';
import { SR5ActiveSkill } from '../../types/enum/SR5ActiveSkill';
import SR5ActorData = Shadowrun.SR5ActorData;

export class SkillField extends SelectField {
    public static getOptions(): string[] {
        const pattern = /[A-Z]/;
        const keys = Object.keys(SR5ActiveSkill);
        for (let i = 0; i < keys.length; i++) {
            const match = keys[i].match(pattern);
            console.warn(keys[i]);
            console.warn(match);
        }
        return keys;
    }

    public static getValues(): string[] {
        return Object.values(SR5ActiveSkill);
    }

    constructor(defaultSkill: SR5ActiveSkill) {
        super('skill', 'SR5.Skill', defaultSkill.toString(), SkillField.getOptions(), SkillField.getValues());
    }

    collect(actor: SR5Actor | undefined, data: RollData) {
        // TODO: An example of how powerful this is.
        //  We might not want this to pull data like this though.
        //  Roll now has access to the entire skill *and* attribute.
        //  Three lines of code (but some error handling is needed).
        const actorData: SR5ActorData = actor?.data.data;
        data['skill'] = actorData.skills.active[this.getValue()];
        data['skill']['attribute'] = actorData.attributes[data['skill']['attribute']];
    }
}
