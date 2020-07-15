import { SituationalModifierField } from '../field/SituationalModifierField';
import { SkillField } from '../field/SkillField';

export const registerCustomElements = () => {
    console.warn(`Registering Custom HTML Elements`);
    window.customElements.define('sitmod-field', SituationalModifierField);
    window.customElements.define('skill-field', SkillField);
};
