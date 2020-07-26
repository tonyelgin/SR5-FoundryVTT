import SR5ActorProxy from './SR5ActorProxy';

export interface SR5BaseActorDataContainer extends ActorData {
    data: SR5BaseActorData;
}
export interface SR5BaseActorData {}

export default class SR5BaseActor extends Actor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    public data: SR5BaseActorDataContainer;
    public proxy: SR5ActorProxy;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(proxy: SR5ActorProxy, data: ActorData, options?: any) {
        super(data, options);

        this.data = data;
        this.proxy = proxy;

        console.warn(`Created a new ${this.constructor.name}`);
        console.warn(this);
    }

    prepareData() {
        super.prepareData();

        console.warn(this.data);

        console.warn(`${this.constructor.name} prepareData`);
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();

        console.warn(this.data);

        console.warn(`${this.constructor.name} prepareEmbeddedEntities`);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
