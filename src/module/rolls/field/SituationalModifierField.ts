import { NumberField } from './base/NumberField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';

export class SituationalModifierField extends NumberField {
    public constructor(id: string, label: string, value: number) {
        super(id, label, value);
    }

    collect(actor: SR5Actor, data: RollData) {
        data['situationalModifier'] = this._value;
    }
}
