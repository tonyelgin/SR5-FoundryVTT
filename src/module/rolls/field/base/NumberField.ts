import { DialogField } from './DialogField';

export abstract class NumberField extends DialogField<number> {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    protected constructor(id: string, label: string, value: number) {
        super(id, label, value);
        // TODO: Handle min + max
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    public setValue(value: number | string) {
        if (typeof value === 'string') {
            value = parseInt(value);
        }

        super.setValue(value);
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    protected createInput(): HTMLInputElement {
        const input = document.createElement('input');

        input.id = this.getIdForChild('input');
        input.value = this.getValue().toString();

        input.setAttribute('type', 'number');

        return input;
    }

    protected onInputChanged(event: Event) {
        const input: HTMLInputElement = event.currentTarget as HTMLInputElement;
        const stringValue = input.value.trim();

        if (stringValue === '') {
            this.setValue(0);
        } else {
            this.setValue(stringValue);
        }
    }

    // </editor-fold>
}
