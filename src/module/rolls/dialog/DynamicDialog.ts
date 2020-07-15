import { RollDialog, SR5RollDialogOptions } from './RollDialog';
import { DialogField } from '../field/base/DialogField';
import { SR5Actor } from '../../actor/SR5Actor';

export class DynamicDialog extends RollDialog {
    constructor(fields: DialogField<any>[], actor?: SR5Actor, options?: SR5RollDialogOptions) {
        super(actor, options);

        this._fields.push(...fields);
    }
}
