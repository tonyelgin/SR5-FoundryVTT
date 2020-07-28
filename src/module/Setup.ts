import SR5ActorProxy from './actor/SR5ActorProxy';
import { SYSTEM_NAME } from './Constants';
import SR5BaseActorSheet from './actor/sheet/SR5BaseActorSheet';
import SR5ItemProxy from './item/SR5ItemProxy';
import SR5BaseItemSheet from './item/sheet/SR5BaseItemSheet';
import SR5RunnerSheet from './actor/sheet/SR5RunnerSheet';
import SR5GruntSheet from './actor/sheet/SR5GruntSheet';

export default class Setup {
    public static run(): void {
        Hooks.once('init', this.init);
        Hooks.once('setup', this.setup);
        Hooks.once('ready', this.ready);
    }

    // Tasks called on init
    protected static init(): Promise<void> {
        // Register actor + sheets
        CONFIG.Actor.entityClass = SR5ActorProxy;
        Actors.unregisterSheet('core', ActorSheet);
        Actors.registerSheet(SYSTEM_NAME, SR5BaseActorSheet, { makeDefault: true });
        Actors.registerSheet(SYSTEM_NAME, SR5RunnerSheet, { makeDefault: false });
        Actors.registerSheet(SYSTEM_NAME, SR5GruntSheet, { makeDefault: false });

        // Register item + sheets
        CONFIG.Item.entityClass = SR5ItemProxy;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(SYSTEM_NAME, SR5BaseItemSheet, { makeDefault: true });

        Hooks.on('preCreateItem', (...args) => {
            console.warn(args);
        });

        // Register Handlebars Helpers
        // if equal
        Handlebars.registerHelper('ife', function (v1, v2, options) {
            console.warn(v1);
            console.warn(v2);
            if (v1 === v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if not equal
        Handlebars.registerHelper('ifne', function (v1, v2, options) {
            if (v1 !== v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if greater than
        Handlebars.registerHelper('ifgt', function (v1, v2, options) {
            if (v1 > v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if greater than equal to
        Handlebars.registerHelper('ifge', function (v1, v2, options) {
            if (v1 >= v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if less than
        Handlebars.registerHelper('iflt', function (v1, v2, options) {
            if (v1 < v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if less than equal to
        Handlebars.registerHelper('ifle', function (v1, v2, options) {
            if (v1 <= v2) return options.fn(this);
            else return options.inverse(this);
        });
        // if includes
        Handlebars.registerHelper('ifin', function (val, arr, options) {
            if (arr.includes(val)) return options.fn(this);
            else return options.inverse(this);
        });

        // Above code will run synchronously with Foundry
        // Async tasks can be done by returning a new Promise
        return Promise.resolve();
    }
    protected static async setup(): Promise<void> {}
    protected static async ready(): Promise<void> {}
}
