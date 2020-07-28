import SR5BaseActor, { ISR5BaseActorData, ISR5BaseActorDataContainer } from './SR5BaseActor';
import SR5ActorProxy from './SR5ActorProxy';
import { RunnerAttributes } from '../common/Attribute';
import { ActiveSkillList, KnowledgeSkillList } from '../common/Skills';
import { ActorType } from './types/ActorType';
import SR5Grunt from './SR5Grunt';

// TODO: Assumes Foundry will be enforcing types - as we can see here
//  it's technically possible to get unexpected results.
export interface ISR5RunnerDataContainer extends ISR5BaseActorDataContainer {
    data: ISR5RunnerData;
}
export interface ISR5RunnerData extends ISR5BaseActorData {
    attributes: RunnerAttributes;
    skills: {
        active: ActiveSkillList;
        knowledge: KnowledgeSkillList;
    };
}

export default class SR5Runner extends SR5BaseActor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5RunnerDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(proxy: SR5ActorProxy, data: ActorData, options: any) {
        super(proxy, data, options);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}

export function isRunner(actor: Actor): actor is SR5Runner {
    return actor.data.type === ActorType.Runner;
}
