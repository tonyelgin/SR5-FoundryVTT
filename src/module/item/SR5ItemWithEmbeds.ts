import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';
import { EMBEDDED_ITEMS_KEY, SYSTEM_NAME } from '../Constants';

export type EmbeddedItemMap = Array<ISR5BaseItemDataContainer>;

export interface ISR5ItemWithEmbedsDataContainer extends ISR5BaseItemDataContainer {
    type: ItemType;
    data: ISR5ItemWithEmbedsData;
}
export interface ISR5ItemWithEmbedsData extends ISR5BaseItemData {}

export default abstract class SR5ItemWithEmbeds extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters">

    /**
     * Gets valid item types that are allowed to be dropped over this item.
     * Can potentially be dynamic, as long as it is deterministic.
     */
    protected abstract get allowedEmbeddedItemTypes(): ItemType[];

    /**
     * Overridable value - default behavior checks this field to see if id-based
     * duplicates should be permitted.
     */
    protected get allowDuplicateEmbeddedItems(): boolean {
        return true;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    /**
     * Return an array of all embedded item instances contained within this item.
     */
    public getEmbeddedItems(): EmbeddedItemMap {
        // Factory ensures this exists.
        return this.getFlag(SYSTEM_NAME, EMBEDDED_ITEMS_KEY) || [];
    }

    /**
     * Set the embeddedItems map to the newly provided array
     * @param items
     */
    public async setEmbeddedItems(items: EmbeddedItemMap): Promise<Entity> {
        console.warn(`attempting embedded item set`);
        console.warn(this);
        console.warn(items);
        // Unset clears old items, otherwise Foundry merges old + new by default
        // TODO: Race condition.
        //  If another request to add an item for example is dispatched between the unset and set
        //  the read will show 0 items, which will cause items to be "cleared". As such I'm just
        //  disabling the unset for now - this will probably be solved with a specific removeItem
        //  method that performs a single atomic operation that can't be intercepted as easily.
        // await this.unsetFlag(SYSTEM_NAME, EMBEDDED_ITEMS_KEY);
        return this.setFlag(SYSTEM_NAME, EMBEDDED_ITEMS_KEY, items);
    }

    /**
     * Returns whether the provide item is able to be embedded into this item.
     * @param itemData
     */
    public isEmbeddable(itemData: ISR5BaseItemDataContainer) {
        return this.allowedEmbeddedItemTypes.includes(itemData.type);
    }

    protected preAddEmbeddedItem(itemData: ISR5BaseItemDataContainer) {}

    /**
     * Add an item to the collection of embedded items
     * @param itemData
     * @param render If the sheet should be re-rendered after adding
     */
    public async addEmbeddedItem(itemData: ISR5BaseItemDataContainer, render: boolean = true) {
        console.warn(`attempting embedded item insert`);
        console.warn(this);
        console.warn(itemData);
        if (!this.isEmbeddable(itemData)) {
            throw new Error(`Tried to embedded a ${itemData.type} in a ${this.data.type} - this is not allowed.`);
        }

        const currentItems = this.getEmbeddedItems();
        if (currentItems.find((item) => item._id === itemData._id) && !this.allowDuplicateEmbeddedItems) {
            throw new Error(`Tried to embedded ${itemData._id} but duplicates are disabled and it already exists.`);
        }
        currentItems.push(itemData);

        await this.setEmbeddedItems(currentItems);

        // prepareData has a chicken-egg scenario
        await this.prepareData();
        await this.prepareEmbeddedEntities();
        await this.prepareData();

        await this.render(render);
    }

    public async updateEmbeddedItem(itemData: Partial<ISR5BaseItemDataContainer>, render: boolean = true) {}

    // </editor-fold>
}
