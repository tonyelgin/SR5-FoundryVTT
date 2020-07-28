import { ActiveSkillName } from './Skills';
import { AttributeName } from './Attribute';

export const ValidModifier = { ...AttributeName, ...ActiveSkillName };
export type ValidModifier = AttributeName | ActiveSkillName;

export interface Modifier<TName extends ValidModifier, TValue extends number | string> {
    modifies: TName;
    value: TValue;
}
