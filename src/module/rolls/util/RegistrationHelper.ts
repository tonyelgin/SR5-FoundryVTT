import { SituationalModifierField } from '../field/SituationalModifierField';

export const registerCustomElements = () => {
    console.warn(`Registering Custom HTML Elements`);
    window.customElements.define('sitmod-field', SituationalModifierField);
};
