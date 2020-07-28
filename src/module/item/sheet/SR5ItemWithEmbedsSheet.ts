import SR5BaseItemSheet from './SR5BaseItemSheet';
import { isItemType, ItemType } from '../types/ItemType';

export default abstract class SR5ItemWithEmbedsSheet extends SR5BaseItemSheet {
    protected abstract get validDropTypes(): ItemType[];

    protected _onDragOver(event: DragEvent) {
        event.preventDefault();
        console.warn(event);
        return false;
    }

    protected _onDragStart(event: DragEvent) {
        console.warn('onDragStart');
        super._onDragStart(event);
    }

    protected _onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        console.warn(`_onDrop`);
        console.warn(event);

        if (!event.dataTransfer) {
            return;
        }

        let data: BaseEntityData;
        let type: ItemType;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
            if (!isItemType(data.type)) {
                console.log('Shadowrun5e | Can only drop Items');
                return;
            }
            type = data.type;
        } catch (err) {
            console.error('Error Dropping Entity');
            console.error(event);
            return;
        }

        console.warn(data);
        console.warn(type);

        // let item;
        //
        // // Case 1 - Data explicitly provided
        // if (data.data) {
        //     // TODO test
        //     if (this.item.isOwned && data.actorId === this.item.actor?._id && data.data._id === this.item._id) {
        //         console.log('Shadowrun5e | Cant drop item on itself');
        //         // @ts-ignore
        //         ui.notifications.error('Are you trying to break the game??');
        //     }
        //     item = data;
        // } else if (data.pack) {
        //     console.log(data);
        //     // Case 2 - From a Compendium Pack
        //     // TODO test
        //     item = await this._getItemFromCollection(data.pack, data.id);
        // } else {
        //     // Case 3 - From a World Entity
        //     item = game.items.get(data.id);
        // }
        //
        // this.item.createOwnedItem(item.data);
    }
}
