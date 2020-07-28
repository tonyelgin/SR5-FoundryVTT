import SR5Runner from './SR5Runner';
import SR5Grunt from './SR5Grunt';
import { ActorType } from './types/ActorType';
import SR5BaseActor, { ISR5BaseActorDataContainer } from './SR5BaseActor';
import AbstractActorFactory, { IPreCreateActorData, IPreCreateActorOptions } from './factory/AbstractActorFactory';
import RunnerFactory from './factory/RunnerFactory';
import GruntFactory from './factory/GruntFactory';

export default class SR5ActorProxy extends Actor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods">

    static async create(data: IPreCreateActorData, options: IPreCreateActorOptions): Promise<Entity> {
        // We use a factory for default data instead of the template. This allows
        // us to correctly synchronize our internal types - the data template is
        // instead used only to create containers in which the data will be stored
        // Handling this internally has a number of benefits. Mostly it allows strong
        // and more thorough typing of data where the JSON template does not.
        let factory: AbstractActorFactory<ISR5BaseActorDataContainer>;
        switch (data.type) {
            case ActorType.Runner:
                factory = new RunnerFactory();
                break;
            case ActorType.Grunt:
                factory = new GruntFactory();
                break;
        }
        // This will only compile if *every* actor type is handled
        const factoryData = factory.create(data);
        return super.create(factoryData, options);
    }

    // </editor-fold>
    // <editor-fold desc="Properties">

    private readonly _implementation: SR5BaseActor;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(data: ActorData, options?: any) {
        super(data, options);

        switch (data.type as ActorType) {
            case ActorType.Runner:
                this._implementation = new SR5Runner(this, data, options);
                break;
            case ActorType.Grunt:
                this._implementation = new SR5Grunt(this, data, options);
                break;
        }
    }

    /** @override */
    prepareData(): void {
        if (this._implementation !== undefined) {
            this._implementation.prepareData();
        }

        return super.prepareData();
    }
    /** @override */
    prepareEmbeddedEntities(): void {
        if (this._implementation !== undefined) {
            this._implementation.prepareEmbeddedEntities();
        }

        return super.prepareEmbeddedEntities();
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    public get Impl(): SR5BaseActor {
        return this._implementation;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    // TODO:
    //  I think there shouldn't need to be any more methods proxied.
    //  However we may notice data not updating properly. If so, we
    //  can simply proxy update to the actor implementation.

    // </editor-fold>
}
