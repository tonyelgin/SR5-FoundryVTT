import { ISort, IDescription, IId, IImage, ISource } from '../common/mixins/DataFields';

export interface IItem extends BaseEntityData, IId, IImage, ISort {
    data: IBaseItemDataContainer;
}

/**
 * The data container inside an item. Eg an instance of Item.data
 */
export interface IBaseItemDataContainer extends ISource, IDescription {}
