import SR5BaseActor, { SR5BaseActorData, SR5BaseActorDataContainer } from './SR5BaseActor';

export interface SR5GruntDataContainer extends SR5BaseActorDataContainer {
    data: SR5GruntData;
}
export interface SR5GruntData extends SR5BaseActorData {
    professionalRating: number;
}

export default class SR5Grunt extends SR5BaseActor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">
    data: SR5GruntDataContainer;
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>

    prepareData() {
        super.prepareData();
        console.warn(`SR5Grunt prepareData`);

        this.data.data.professionalRating = this.name.length;

        console.warn(`<end of call chain>`);
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
        console.warn(`SR5Grunt prepareEmbeddedEntities`);

        console.warn(`<end of call chain>`);
    }
}
