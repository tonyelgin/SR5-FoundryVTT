import SR5BaseActorSheet from './SR5BaseActorSheet';
import SR5Runner from '../SR5Runner';
import { ActorType } from '../types/ActorType';

export default class SR5RunnerSheet extends SR5BaseActorSheet<SR5Runner> {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(data: BaseEntityData, options?: any) {
        super(data, options);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    get template(): string {
        return `systems/shadowrun5e/dist/templates/actor/runner.html`;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    getData(): ActorSheetData {
        const data = super.getData();
        return data;
    }

    // </editor-fold>
}
