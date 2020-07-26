import SR5BaseActor, { SR5BaseActorData, SR5BaseActorDataContainer } from './SR5BaseActor';

// TODO: Assumes Foundry will be enforcing types - as we can see here
//  it's technically possible to get unexpected results.
export interface SR5RunnerDataContainer extends SR5BaseActorDataContainer {
    data: SR5RunnerData;
}
export interface SR5RunnerData extends SR5BaseActorData {
    butts: string;
}

export default class SR5Runner extends SR5BaseActor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">
    data: SR5RunnerDataContainer;
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
