import { AttributeName } from './Attribute';

export enum CombatSkillName {
    Archery = 'archery',
    Automatics = 'automatics',
    Blades = 'blades',
    Clubs = 'clubs',
    // TODO: ExoticMeleeWeapon = 'exotic_melee_weapon',
    // TODO: ExoticRangedWeapon = 'exotic_ranged_weapon',
    HeavyWeapons = 'heavy_weapons',
    Longarms = 'longarms',
    Pistols = 'pistols',
    ThrowingWeapons = 'throwing_weapons',
    UnarmedCombat = 'unarmed_combat',
}

export enum MagicalSkillName {
    Alchemy = 'alchemy',
    Arcana = 'arcana',
    Artificing = 'artificing',
    Assensing = 'assensing',
    AstralCombat = 'astral_combat',
    Banishing = 'banishing',
    Binding = 'binding',
    Counterspelling = 'counterspelling',
    Disenchanting = 'disenchanting',
    RitualSpellcasting = 'ritual_spellcasting',
    Spellcasting = 'spellcasting',
    Summoning = 'summoning',
}

export enum PhysicalSkillName {
    AnimalHandling = 'animal_handling',
    Disguise = 'disguise',
    Diving = 'diving',
    EscapeArtist = 'escape_artist',
    Flight = 'flight',
    FreeFall = 'free_fall',
    Gymnastics = 'gymnastics',
    Palming = 'palming',
    Perception = 'perception',
    Running = 'running',
    Sneaking = 'sneaking',
    Survival = 'survival',
    Swimming = 'swimming',
    Tracking = 'tracking',
}

export enum ResonanceSkillName {
    Compiling = 'compiling',
    Decompiling = 'decompiling',
    Registering = 'registering',
}

export enum SocialSkillName {
    Con = 'con',
    Etiquette = 'etiquette',
    Impersonation = 'impersonation',
    Instruction = 'instruction',
    Intimidation = 'intimidation',
    Leadership = 'leadership',
    Negotiation = 'negotiation',
    Performance = 'performance',
}

export enum TechnicalSkillName {
    AeronauticsMechanic = 'aeronautics_mechanic',
    Armorer = 'armorer',
    Artisan = 'artisan',
    AutomotiveMechanic = 'automotive_mechanic',
    Biotechnology = 'biotechnology',
    Chemistry = 'chemistry',
    Computer = 'computer',
    Cybercombat = 'cybercombat',
    Cybertechnology = 'cybertechnology',
    Demolitions = 'demolitions',
    ElectronicWarfare = 'electronic_warfare',
    FirstAid = 'first_aid',
    Forgery = 'forgery',
    Hacking = 'hacking',
    Hardware = 'hardware',
    IndustrialMechanic = 'industrial_mechanic',
    Locksmith = 'locksmith',
    Medicine = 'medicine',
    NauticalMechanic = 'nautical_mechanic',
    Navigation = 'navigation',
    Software = 'software',
}

export enum VehicleSkillName {
    Gunnery = 'gunnery',
    PilotAerospace = 'pilot_aerospace',
    PilotAircraft = 'pilot_aircraft',
    // TODO: PilotExoticVehicle = 'pilot_exotic_vehicle',
    PilotGroundCraft = 'pilot_ground_craft',
    PilotWalker = 'pilot_walker',
    PilotWaterCraft = 'pilot_water_craft',
}

export const ActiveSkillName = {
    ...CombatSkillName,
    ...MagicalSkillName,
    ...PhysicalSkillName,
    ...ResonanceSkillName,
    ...SocialSkillName,
    ...TechnicalSkillName,
    ...VehicleSkillName,
};

export type ActiveSkillName =
    | CombatSkillName
    | MagicalSkillName
    | PhysicalSkillName
    | ResonanceSkillName
    | SocialSkillName
    | TechnicalSkillName
    | VehicleSkillName;

export enum SkillGroupName {
    Acting = 'acting',
    Athletics = 'athletics',
    Biotech = 'biotech',
    CloseCombat = 'close_combat',
    Conjuring = 'conjuring',
    Cracking = 'cracking',
    Electronics = 'electronics',
    Enchanting = 'enchanting',
    Firearms = 'firearms',
    Influence = 'influence',
    Engineering = 'engineering',
    Outdoors = 'outdoors',
    Sorcery = 'sorcery',
    Stealth = 'stealth',
    Tasking = 'tasking',
}

export interface Skill<TName extends string> {
    name: TName;
    value: number;

    defaultAttribute: AttributeName;
    specializations: Array<string>;
    canDefault: boolean;
}

export interface ActiveSkill<TName extends ActiveSkillName> extends Skill<TName> {}

export enum KnowledgeSkillType {
    Street = 'street',
    Academic = 'academic',
    Interest = 'interest',
    Language = 'language',
}
export interface KnowledgeSkill extends Skill<string> {
    type: KnowledgeSkillType;
}

export type ActiveSkillList = {
    [TName in ActiveSkillName]: ActiveSkill<TName>;
};

export type KnowledgeSkillList = {
    [id in string]: KnowledgeSkill;
};
