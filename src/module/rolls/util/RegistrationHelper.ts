import { NumberField } from '../field/base/NumberField';

export const registerCustomElements = () => {
    console.warn(`Registering Custom HTML Elements`);
    window.customElements.define('number-field', NumberField);
};
