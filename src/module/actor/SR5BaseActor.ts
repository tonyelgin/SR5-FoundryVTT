import SR5ActorProxy from './SR5ActorProxy';
import { IPreCreateActorData, IPreCreateActorOptions } from '../common/Hooks';
import { ActorType } from './types/ActorType';

export interface ISR5BaseActorDataContainer extends ActorData {
    data: ISR5BaseActorData;
}
export interface ISR5BaseActorData {}

export default abstract class SR5BaseActor extends Actor {
    // <editor-fold desc="Static Properties">

    /**
     * When creating actors, the type is checked against this array. If a matching type is found
     *  {@see onPreCreate} is called to initialize type-specific default data. Must be inherited.
     */
    public static get TYPE(): ActorType {
        throw new Error('ACTOR_TYPE must be implemented.');
    }

    // </editor-fold>
    // <editor-fold desc="Static Methods">

    /**
     * Initializes type-specific default data before the actor is sent to the server.
     */
    public static getDefaultValues(): ISR5BaseActorData {
        console.warn(`SR5BaseActor getDefaultValues`);
        return {
            name: 'Hello!',
        };
    }

    // </editor-fold>
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

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
