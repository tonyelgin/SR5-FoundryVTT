import { CanSort, HasDescription, HasId, HasImage, HasSource } from '../common/mixins/SimpleFields';

export interface BaseItem extends BaseEntityData, HasId, HasImage, CanSort {
    data: BaseItemDataContainer;
}

/**
 * The data container inside an item. Eg an instance of Item.data
 */
export interface BaseItemDataContainer extends HasSource, HasDescription {}
