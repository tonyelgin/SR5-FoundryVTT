import SR5BaseActorSheet from './SR5BaseActorSheet';
import SR5Grunt from '../SR5Grunt';

export default class SR5GruntSheet extends SR5BaseActorSheet<SR5Grunt> {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(...args: any) {
        super(...args);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters">

    get template(): string {
        return `systems/shadowrun5e/dist/templates/actor/grunt.html`;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
