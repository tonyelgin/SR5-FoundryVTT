import SR5Runner from './SR5Runner';
import SR5Grunt from './SR5Grunt';
import { ActorType } from './types/ActorType';
import SR5BaseActor from './SR5BaseActor';
import { IPreCreateActorData, IPreCreateActorOptions } from '../common/Hooks';

export default class SR5ActorProxy extends Actor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods">

    static async create(data: IPreCreateActorData, options: IPreCreateActorOptions): Promise<Entity> {
        // NOTE: This should be only 'leaf node' classes. The 'onPreCreate' methods
        //  should then chain the call upward with super calls if needed.
        const CLASSES = [SR5Runner, SR5Grunt];
        const CLASS = CLASSES.find((CLASS) => CLASS.TYPE === data.type);

        if (CLASS) {
            // Default values are over-written with provided ones.
            const defaultValues = CLASS.getDefaultValues();
            console.warn(`merged defaultValues`);
            console.warn(defaultValues);

            data = {
                name: data.name,
                folder: data.folder,
                type: data.type,
                data: defaultValues,
            };
        } else {
            console.warn(`Unable to find default values for type ${data.type}.`);
        }
        return super.create(data, options);
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
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
