import { SituationalModifierField } from '../field/SituationalModifierField';
import { SkillField } from '../field/SkillField';

export const registerCustomElements = () => {
    window.customElements.define('sitmod-field', SituationalModifierField);
    window.customElements.define('skill-field', SkillField);
};
