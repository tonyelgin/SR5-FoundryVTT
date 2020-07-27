import SR5BaseActor, { ISR5BaseActorData, ISR5BaseActorDataContainer } from './SR5BaseActor';
import { ActorType } from './types/ActorType';

export interface ISR5GruntDataContainer extends ISR5BaseActorDataContainer {
    data: ISR5GruntData;
}
export interface ISR5GruntData extends ISR5BaseActorData {}

export default class SR5Grunt extends SR5BaseActor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5GruntDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>

    prepareData() {
        super.prepareData();
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
    }
}

export function isGrunt(actor: Actor): actor is SR5Grunt {
    return actor.data.type === ActorType.Grunt;
}
