import { NumberField } from './base/NumberField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';

export const SITUATIONAL_MODIFIER_DATA_KEY = 'situationalModifier';

export class SituationalModifierField extends NumberField {
    public constructor(defaultModifier: number) {
        super('situational-modifier', 'SR5.SituationalModifier', defaultModifier);
    }

    collect(actor: SR5Actor, data: RollData) {
        data[SITUATIONAL_MODIFIER_DATA_KEY] = this.getValue();
    }
}
