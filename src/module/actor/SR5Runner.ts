import SR5BaseActor, { ISR5BaseActorData, ISR5BaseActorDataContainer } from './SR5BaseActor';
import SR5ActorProxy from './SR5ActorProxy';
import { AttributeName, PhysicalAttributeName, RunnerAttributeName, RunnerAttributes } from '../common/Attribute';
import { ActorType } from './types/ActorType';
import { IPreCreateActorData, IPreCreateActorOptions } from '../common/Hooks';

// TODO: Assumes Foundry will be enforcing types - as we can see here
//  it's technically possible to get unexpected results.
export interface ISR5RunnerDataContainer extends ISR5BaseActorDataContainer {
    data: ISR5RunnerData;
}
export interface ISR5RunnerData extends ISR5BaseActorData {
    attributes: RunnerAttributes;
}

export default class SR5Runner extends SR5BaseActor {
    // <editor-fold desc="Static Properties">

    public static get TYPE() {
        return ActorType.Runner;
    }

    // </editor-fold>
    // <editor-fold desc="Static Methods">

    public static getDefaultValues(): ISR5RunnerData {
        console.warn(`SR5Runner getDefaultValues`);
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
            ...super.getDefaultValues(),
            attributes,
        };
    }

    // </editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5RunnerDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(proxy: SR5ActorProxy, data: ActorData, options: any) {
        super(proxy, data, options);

        console.warn(this);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
