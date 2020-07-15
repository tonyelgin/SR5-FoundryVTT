import { SelectField } from './base/SelectField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';

export class SkillField extends SelectField {
    collect(actor: SR5Actor | undefined, data: RollData) {
    }
}
