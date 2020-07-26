import SR5ActorProxy from './actor/SR5ActorProxy';
import SR5BaseItem from './item/SR5BaseItem';
import { SYSTEM_NAME } from './Constants';
import SR5BaseActorSheet from './actor/SR5BaseActorSheet';

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

        // Register item + sheets
        CONFIG.Item.entityClass = SR5BaseItem;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(SYSTEM_NAME, SR5BaseItem, { makeDefault: true });

        // Above code will run synchronously with Foundry
        // Async tasks can be done by returning a new Promise
        return Promise.resolve();
    }
    protected static async setup(): Promise<void> {}
    protected static async ready(): Promise<void> {}
}
