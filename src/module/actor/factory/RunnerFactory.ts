import { ActorFactoryData } from './AbstractActorFactory';
import { ISR5RunnerDataContainer } from '../SR5Runner';
import { IPreCreateActorData } from '../../common/Hooks';
import { AttributeName, RunnerAttributes } from '../../common/Attribute';
import BaseActorFactory from './BaseActorFactory';

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

            magic: {
                name: AttributeName.Magic,
                value: 1,
            },
            resonance: {
                name: AttributeName.Resonance,
                value: 1,
            },

            essence: {
                name: AttributeName.Essence,
                value: 6,
            },

            depth: {
                name: AttributeName.Depth,
                value: 1,
            },
        };

        return {
            ...superData,
            data: {
                attributes,
            },
        };
    }
}
