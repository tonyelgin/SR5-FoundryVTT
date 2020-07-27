import SR5BaseActor, { isActorOfType } from '../SR5BaseActor';
import SR5ActorProxy from '../SR5ActorProxy';
import { ActorType } from '../types/ActorType';

export default abstract class SR5BaseActorSheet<T extends SR5BaseActor> extends ActorSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    protected constructor(...args: any) {
        super(...args);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    get actor(): T {
        // TODO: Figure out how to more safely cast this.
        return (super.actor as SR5ActorProxy).Impl as T;
    }

    get id(): string {
        return `actor-${this.actor.id}`;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    getData(): ActorSheetData {
        const data = super.getData();

        data['CONST'] = {
            ActorType: ActorType,
        };

        console.warn(`Sheet is of type ${this.constructor.name}`);
        console.warn(data);
        console.warn(super.actor);

        return data;
    }

    protected activateListeners(html: JQuery | HTMLElement) {
        console.warn(html);
        super.activateListeners(html);
    }

    close(): Promise<void> {
        console.warn(this.form);

        return super.close();
    }

    // </editor-fold>
}
