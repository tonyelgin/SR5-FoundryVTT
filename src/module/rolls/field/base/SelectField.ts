import { DialogField } from './DialogField';

export abstract class SelectField extends DialogField<string> {
    protected _options: string[];
    protected _values: string[];

    protected constructor(id: string, label: string, value: string, options: string[], values: string[]) {
        super(id, label, value);

        if (options.length !== values.length) {
            throw new Error(`Cannot create SelectField: Options.length = ${options.length} but values.length = ${values.length}`);
        }

        this._options = options;
        this._values = values;
    }

    protected createOptions(): HTMLOptionElement[] {
        const options: HTMLOptionElement[] = [];
        for (let i = 0; i < this._options.length; i++) {
            const option = this._options[i];
            const value = this._values[i];

            const element = document.createElement('option');
            element.value = value;
            element.innerText = option;
            options.push(element);
        }
        return options;
    }

    protected createInput(): HTMLSelectElement {
        const select = document.createElement('select');

        select.id = this.getId('input');
        select.value = this._value.toString();

        select.onchange += this.onInputChanged.bind(this);

        const options = this.createOptions();
        select.append(...options);
        return select;
    }
}
