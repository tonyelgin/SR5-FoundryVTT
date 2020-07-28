import { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import BaseItemFactory from './BaseItemFactory';
import { ISR5ArmorDataContainer } from '../SR5Armor';
import { ItemType } from '../types/ItemType';
import { DamageElement } from '../../types/common/Damage';
import ItemWithEmbedsFactory from './ItemWithEmbedsFactory';

export default class ArmorFactory extends ItemWithEmbedsFactory {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5ArmorDataContainer> {
        const superData = super.create(data);
        return {
            name: superData.name,
            type: ItemType.Armor,
            data: {
                ...superData.data,
                armor: {
                    value: 12,
                    stacks: false,
                    element: {
                        [DamageElement.Physical]: {
                            value: 0,
                        },
                        [DamageElement.Fire]: {
                            value: 0,
                        },
                        [DamageElement.Cold]: {
                            value: 0,
                        },
                        [DamageElement.Electricity]: {
                            value: 0,
                        },
                        [DamageElement.Radiation]: {
                            value: 0,
                        },
                        [DamageElement.Pollution]: {
                            value: 0,
                        },
                    },
                },
            },
            flags: superData.flags,
        };
    }
}
