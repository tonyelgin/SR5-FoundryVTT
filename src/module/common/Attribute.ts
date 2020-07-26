export enum PhysicalAttributeName {
    Body = 'body',
    Agility = 'agility',
    Reaction = 'reaction',
    Strength = 'strength',
}

export enum MentalAttributeName {
    Logic = 'logic',
    Intuition = 'intuition',
    Charisma = 'charisma',
    Willpower = 'willpower',
}

export enum SpecialAttributeName {
    Edge = 'edge',
    Essence = 'essence',
    Magic = 'magic',
    Resonance = 'resonance',
    Depth = 'depth',
}

export enum MatrixAttributeName {
    Attack = 'attack',
    Sleaze = 'sleaze',
    DataProcessing = 'data_processing',
    Firewall = 'firewall',
}

export const AttributeName = { ...PhysicalAttributeName, ...MentalAttributeName, ...SpecialAttributeName, ...MatrixAttributeName };
export type AttributeName = PhysicalAttributeName | MentalAttributeName | SpecialAttributeName | MatrixAttributeName;

export const RunnerAttributeName = { ...PhysicalAttributeName, ...MentalAttributeName, ...SpecialAttributeName };
export type RunnerAttributeName = PhysicalAttributeName | MentalAttributeName | SpecialAttributeName;

export interface Attribute<TName extends AttributeName> {
    name: TName; // TODO: Locale keys need arrangement for SR5.ATTRIBUTES.name
    value: number;
}

export type AttributeMap<TValues extends AttributeName> = {
    [TKey in TValues]: Attribute<TKey>;
};

// Helper maps - Can use AttributeMap for custom mappings
export type PhysicalAttributes = AttributeMap<PhysicalAttributeName>;
export type MentalAttribute = AttributeMap<MentalAttributeName>;
export type SpecialAttributes = AttributeMap<SpecialAttributeName>;
export type RunnerAttributes = AttributeMap<RunnerAttributeName>;
export type MatrixAttributes = AttributeMap<MatrixAttributeName>;

// export type AttributeField = BaseValuePair<number> &
//     CanHideFiled &
//     ModifiableValue &
//     LabelField & {
//     limit?: string;
// };
