import SR5ActorProxy from './SR5ActorProxy';
import { ActorType } from './types/ActorType';

export interface ISR5BaseActorDataContainer extends ActorData {
    data: ISR5BaseActorData;
}
export interface ISR5BaseActorData {}

export default class SR5BaseActor extends Actor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    public data: ISR5BaseActorDataContainer;
    public proxy: SR5ActorProxy;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(proxy: SR5ActorProxy, data: ActorData, options?: any) {
        super(data, options);

        this.data = data;
        this.proxy = proxy;
    }

    prepareData() {
        super.prepareData();
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
