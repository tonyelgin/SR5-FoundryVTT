import { ISR5BaseItemDataContainer } from '../SR5BaseItem';
import { ItemType } from '../types/ItemType';

export interface IPreCreateItemOptions {
    renderSheet: boolean;
    temporary?: boolean;
}

export interface IPreCreateItemData {
    folder: string | undefined;
    name: string;
    type: ItemType;

    [key: string]: any;
}

type ExcludedKeys = 'token';
type OptionalKeys = 'flags';

// prettier-ignore
type RequiredData<T extends ISR5BaseItemDataContainer> = Omit<T, ExcludedKeys | OptionalKeys>;
// prettier-ignore
type OptionalData<T extends ISR5BaseItemDataContainer> = Partial<Pick<T, OptionalKeys>>;

export type ItemFactoryData<T extends ISR5BaseItemDataContainer> = RequiredData<T> & OptionalData<T>;

export default abstract class AbstractItemFactory<T extends ISR5BaseItemDataContainer> {
    public abstract create(data: IPreCreateItemData): ItemFactoryData<T>;
}
