import SR5BaseItemSheet from './SR5BaseItemSheet';
import { isItemType, ItemType } from '../types/ItemType';
import SR5ItemWithEmbeds from '../SR5ItemWithEmbeds';
import { getBaseItemData } from '../../common/Helpers';
import SR5BaseItem from '../SR5BaseItem';
import SR5ItemProxy from '../SR5ItemProxy';

export default abstract class SR5ItemWithEmbedsSheet extends SR5BaseItemSheet {
    get item(): SR5ItemProxy {
        // TODO: Can we safely cast this?
        return super.item as SR5ItemProxy;
    }

    protected activateListeners(html: JQuery) {
        super.activateListeners(html);

        const form = $(this.form);
        form.on('drop', this._onDrop.bind(this));
        form.on('dragover', this._onDragOver.bind(this));
    }

    protected _onDragOver(event: DragEvent) {
        event.preventDefault();
        return true;
    }

    protected _onDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        console.warn(`_onDrop`);
        console.warn(event);
        // @ts-ignore
        console.warn(event.originalEvent.dataTransfer.getData('text/plain'));

        if (event.originalEvent) {
            const dropArgs = event.originalEvent.dataTransfer?.getData('text/plain');
            if (dropArgs === undefined) {
                return;
            }

            const parsedArgs = JSON.parse(dropArgs);
            if (parsedArgs.type && parsedArgs.type === 'Item') {
                const id: string = parsedArgs.id;
                let item = game.items.get(id);

                // ensure item is of our item types
                if (!isItemType(item.data.type)) {
                    return;
                }

                // Can't recurse items infinitely
                if (item.id === this.item.id) {
                    return;
                }

                // now safe to cast
                const sr5item = item as SR5BaseItem;
                // TODO: Can we safely cast this? It *should* be fine given the many layers of checks we have now.
                const insertTo: SR5ItemWithEmbeds = this.item.Impl as SR5ItemWithEmbeds;

                // TODO: Does this need awaiting?
                insertTo.addEmbeddedItem(getBaseItemData(sr5item));
            }

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
}
