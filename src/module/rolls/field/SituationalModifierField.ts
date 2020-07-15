import { NumberField } from './base/NumberField';
import { RollData } from '../dialog/RollDialog';
import { SR5Actor } from '../../actor/SR5Actor';

export const SITUATIONAL_MODIFIER_DATA_KEY = 'situationalModifier';

export class SituationalModifierField extends NumberField {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    public constructor(defaultModifier: number) {
        super('situational-modifier', 'SR5.SituationalModifier', defaultModifier);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">

    collect(actor: SR5Actor, data: RollData) {
        data[SITUATIONAL_MODIFIER_DATA_KEY] = this.getValue();
    }

    // </editor-fold>
}
