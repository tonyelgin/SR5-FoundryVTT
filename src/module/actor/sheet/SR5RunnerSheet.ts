import SR5BaseActorSheet from './SR5BaseActorSheet';

export default class SR5RunnerSheet extends SR5BaseActorSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(data: BaseEntityData, options?: any) {
        super(data, options);

        console.warn(`A new ${this.constructor.name} has been created.`);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    get template(): string {
        return `systems/shadowrun5e/dist/templates/test/runner.html`;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
