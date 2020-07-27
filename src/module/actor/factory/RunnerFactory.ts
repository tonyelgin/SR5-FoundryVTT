import { ActorFactoryData } from './AbstractActorFactory';
import { ISR5RunnerDataContainer } from '../SR5Runner';
import { IPreCreateActorData } from '../../common/Hooks';
import { AttributeName, RunnerAttributes } from '../../common/Attribute';
import BaseActorFactory from './BaseActorFactory';
import { ActiveSkillList, ActiveSkillName } from '../../common/Skills';

export default class RunnerFactory extends BaseActorFactory {
    create(data: IPreCreateActorData): ActorFactoryData<ISR5RunnerDataContainer> {
        const superData = super.create(data);
        let attributes: RunnerAttributes = {
            body: {
                name: AttributeName.Body,
                value: 1,
            },
            agility: {
                name: AttributeName.Agility,
                value: 1,
            },
            charisma: {
                name: AttributeName.Charisma,
                value: 1,
            },
            intuition: {
                name: AttributeName.Intuition,
                value: 1,
            },
            logic: {
                name: AttributeName.Logic,
                value: 1,
            },
            reaction: {
                name: AttributeName.Reaction,
                value: 1,
            },
            strength: {
                name: AttributeName.Strength,
                value: 1,
            },
            willpower: {
                name: AttributeName.Willpower,
                value: 1,
            },

            edge: {
                name: AttributeName.Edge,
                value: 1,
            },

            essence: {
                name: AttributeName.Essence,
                value: 6,
            },

            magic: {
                name: AttributeName.Magic,
                value: 0,
            },
            resonance: {
                name: AttributeName.Resonance,
                value: 0,
            },
            depth: {
                name: AttributeName.Depth,
                value: 0,
            },
        };

        let skills: ActiveSkillList = {
            archery: {
                name: ActiveSkillName.Archery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            automatics: {
                name: ActiveSkillName.Automatics,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            blades: {
                name: ActiveSkillName.Blades,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            clubs: {
                name: ActiveSkillName.Clubs,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            heavy_weapons: {
                name: ActiveSkillName.HeavyWeapons,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            longarms: {
                name: ActiveSkillName.Longarms,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            pistols: {
                name: ActiveSkillName.Pistols,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            throwing_weapons: {
                name: ActiveSkillName.ThrowingWeapons,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            unarmed_combat: {
                name: ActiveSkillName.UnarmedCombat,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            disguise: {
                name: ActiveSkillName.Disguise,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            diving: {
                name: ActiveSkillName.Diving,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Body,
            },
            escape_artist: {
                name: ActiveSkillName.EscapeArtist,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            flight: {
                name: ActiveSkillName.Flight,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            free_fall: {
                name: ActiveSkillName.FreeFall,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Body,
            },
            gymnastics: {
                name: ActiveSkillName.Gymnastics,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            palming: {
                name: ActiveSkillName.Palming,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            perception: {
                name: ActiveSkillName.Perception,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            running: {
                name: ActiveSkillName.Running,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Strength,
            },
            sneaking: {
                name: ActiveSkillName.Sneaking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            survival: {
                name: ActiveSkillName.Survival,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Willpower,
            },
            swimming: {
                name: ActiveSkillName.Swimming,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Strength,
            },
            tracking: {
                name: ActiveSkillName.Tracking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            con: {
                name: ActiveSkillName.Con,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            etiquette: {
                name: ActiveSkillName.Etiquette,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            impersonation: {
                name: ActiveSkillName.Impersonation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            instruction: {
                name: ActiveSkillName.Instruction,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            intimidation: {
                name: ActiveSkillName.Intimidation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            leadership: {
                name: ActiveSkillName.Leadership,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            negotiation: {
                name: ActiveSkillName.Negotiation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            performance: {
                name: ActiveSkillName.Performance,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            alchemy: {
                name: ActiveSkillName.Alchemy,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            arcana: {
                name: ActiveSkillName.Arcana,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            artificing: {
                name: ActiveSkillName.Artificing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            assensing: {
                name: ActiveSkillName.Assensing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            astral_combat: {
                name: ActiveSkillName.AstralCombat,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Willpower,
            },
            banishing: {
                name: ActiveSkillName.Banishing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            binding: {
                name: ActiveSkillName.Binding,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            counterspelling: {
                name: ActiveSkillName.Counterspelling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            disenchanting: {
                name: ActiveSkillName.Disenchanting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            ritual_spellcasting: {
                name: ActiveSkillName.RitualSpellcasting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            spellcasting: {
                name: ActiveSkillName.Spellcasting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            summoning: {
                name: ActiveSkillName.Summoning,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Magic,
            },
            compiling: {
                name: ActiveSkillName.Compiling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Resonance,
            },
            decompiling: {
                name: ActiveSkillName.Decompiling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Resonance,
            },
            registering: {
                name: ActiveSkillName.Registering,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Resonance,
            },
            aeronautics_mechanic: {
                name: ActiveSkillName.AeronauticsMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            automotive_mechanic: {
                name: ActiveSkillName.AutomotiveMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            industrial_mechanic: {
                name: ActiveSkillName.IndustrialMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            nautical_mechanic: {
                name: ActiveSkillName.NauticalMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            animal_handling: {
                name: ActiveSkillName.AnimalHandling,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Charisma,
            },
            armorer: {
                name: ActiveSkillName.Armorer,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            artisan: {
                name: ActiveSkillName.Artisan,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            biotechnology: {
                name: ActiveSkillName.Biotechnology,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            chemistry: {
                name: ActiveSkillName.Chemistry,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            computer: {
                name: ActiveSkillName.Computer,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            cybercombat: {
                name: ActiveSkillName.Cybercombat,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            cybertechnology: {
                name: ActiveSkillName.Cybertechnology,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            demolitions: {
                name: ActiveSkillName.Demolitions,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            electronic_warfare: {
                name: ActiveSkillName.ElectronicWarfare,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            first_aid: {
                name: ActiveSkillName.FirstAid,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            forgery: {
                name: ActiveSkillName.Forgery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            hacking: {
                name: ActiveSkillName.Hacking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            hardware: {
                name: ActiveSkillName.Hardware,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            locksmith: {
                name: ActiveSkillName.Locksmith,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            medicine: {
                name: ActiveSkillName.Medicine,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            navigation: {
                name: ActiveSkillName.Navigation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Intuition,
            },
            software: {
                name: ActiveSkillName.Software,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Logic,
            },
            gunnery: {
                name: ActiveSkillName.Gunnery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: AttributeName.Agility,
            },
            pilot_aerospace: {
                name: ActiveSkillName.PilotAerospace,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Reaction,
            },
            pilot_aircraft: {
                name: ActiveSkillName.PilotAircraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Reaction,
            },
            pilot_walker: {
                name: ActiveSkillName.PilotWalker,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Reaction,
            },
            pilot_ground_craft: {
                name: ActiveSkillName.PilotGroundCraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Reaction,
            },
            pilot_water_craft: {
                name: ActiveSkillName.PilotWaterCraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: AttributeName.Reaction,
            },
        };

        return {
            ...superData,
            data: {
                attributes,
                skills: {
                    active: skills,
                    knowledge: {},
                },
            },
        };
    }
}
