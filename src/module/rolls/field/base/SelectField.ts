import { DialogField } from './DialogField';

export abstract class SelectField extends DialogField<string> {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    protected readonly _options: string[];
    protected readonly _values: string[];
    private _select: HTMLSelectElement;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    protected constructor(id: string, label: string, value: string) {
        super(id, label, value);

        const options = this.getOptions();
        const values = this.getValues();

        if (options.length !== values.length) {
            throw new Error(`Cannot create SelectField: Options.length = ${options.length} but values.length = ${values.length}`);
        }

        this._options = options;
        this._values = values;
    }

    /**
     * Get valid option names for the select.
     */
    protected abstract getOptions();

    /**
     * Get valid option values for the select.
     */
    protected abstract getValues();

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    // Read Only
    public get select(): HTMLSelectElement {
        return this._select;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

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

    protected onInputChanged(event: Event) {
        event.preventDefault();

        this.setValue(this.select.value);
    }

    protected createInput(): HTMLSelectElement {
        const select = document.createElement('select');

        select.id = this.getIdForChild('input');
        select.value = this.getValue().toString();

        select.onchange += this.onInputChanged.bind(this);

        const options = this.createOptions();
        select.append(...options);

        this._select = select;

        return select;
    }

    // </editor-fold>
}
