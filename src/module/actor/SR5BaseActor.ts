import SR5ActorProxy from './SR5ActorProxy';
import SR5BaseActorSheet from './sheet/SR5BaseActorSheet';
import { ActorType } from './types/ActorType';

export interface ISR5BaseActorDataContainer extends ActorData {
    type: ActorType;
    data: ISR5BaseActorData;
}
export interface ISR5BaseActorData {}

export default abstract class SR5BaseActor extends Actor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    public data: ISR5BaseActorDataContainer;
    public proxy: SR5ActorProxy;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(proxy: SR5ActorProxy, data: ActorData, options?: any) {
        super(data, options);

        // TODO: Safer cast. Should be true atm.
        this.data = data as ISR5BaseActorDataContainer;
        this.proxy = proxy;
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    get sheet(): SR5BaseActorSheet<SR5BaseActor> {
        // TODO: Figure out safe cast.
        return this.proxy.sheet as SR5BaseActorSheet<SR5BaseActor>;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}

export function isActorOfType<T extends SR5BaseActor>(actor: Actor): actor is T {
    return true;
}
