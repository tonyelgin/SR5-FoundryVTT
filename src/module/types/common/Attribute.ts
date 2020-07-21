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
