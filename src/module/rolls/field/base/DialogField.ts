import { RollData } from '../../dialog/RollDialog';
import { SR5Actor } from '../../../actor/SR5Actor';

export abstract class DialogField<TValue extends { toString: () => string }> extends HTMLElement {
    protected readonly _labelKey: string;
    protected _value: TValue;

    /**
     * The localization key of the label.
     */
    public get labelKey(): string {
        return this._labelKey;
    }

    /**
     * Get the class that should be added to the root element.
     */
    public get class(): string {
        return 'form-group';
    }

    /**
     * Get an id for the specified type of element
     * @param type
     */
    public getId(type: string) {
        return `${this.id}-${type}`;
    }

    protected constructor(id: string, label: string, value: TValue) {
        super();

        this.id = id;
        this._labelKey = label;
        this._value = value;

        this.setAttribute('class', this.class);
    }

    /**
     * Overrides getAttribute to always return a string. Returns '' if the attribute is not found.
     * @param qualifiedName
     */
    public getAttribute(qualifiedName: string): string {
        const result = super.getAttribute(qualifiedName);
        if (result === null) return '';
        return result;
    }

    /**
     * This gets called when the element has been connected to the DOM. It's private so it doesn't get overwritten
     * by accident. If you want more elements you should use {@see createAdditionalElements} instead.
     */
    private connectedCallback() {
        const label = this.createLabel();
        const input = this.createInput();

        this.append(label);
        this.append(input);

        this.createAdditionalElements();
    }

    /**
     * Create any additional elements this field needs.
     */
    protected createAdditionalElements() {}

    /**
     * Create the label to be used in this field.
     */
    protected createLabel(): HTMLLabelElement {
        const label = document.createElement('label');

        label.id = this.getId('label');
        label.setAttribute('for', this.getId('input'));
        label.innerText = game.i18n.localize(this.labelKey);

        return label;
    }

    /**
     * Create the input to be used in this field.
     */
    protected abstract createInput(): HTMLElement;

    /**
     * Callback executed when input is changed.
     * @param event
     */
    protected abstract onInputChanged(event: Event);

    public abstract collect(actor: SR5Actor | undefined, data: RollData);
}
