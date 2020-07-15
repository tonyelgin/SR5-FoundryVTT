import { DialogField } from './DialogField';

export abstract class NumberField extends DialogField<number> {
    protected constructor(id: string, label: string, value: number) {
        super(id, label, value);
        // TODO: Handle min + max
    }

    protected createInput(): HTMLInputElement {
        const input = document.createElement('input');

        input.id = this.getId('input');
        input.value = this._value.toString();

        input.onchange += this.onInputChanged.bind(this);

        input.setAttribute('type', 'number');

        return input;
    }

    protected onInputChanged(event: Event) {
        const input: HTMLInputElement = event.currentTarget as HTMLInputElement;
        const stringValue = input.value.trim();
        let numberValue: number;
        if (stringValue === '') {
            numberValue = 0;
        } else {
            numberValue = parseInt(stringValue);
        }

        this._value = numberValue;
    }
}
