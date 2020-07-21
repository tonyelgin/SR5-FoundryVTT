import { AttributeName, PhysicalAttributeName } from '../common/Attribute';
import { BaseItem, BaseItemDataContainer } from './BaseItem';

/**
 * A meta-type potentially modifies an attribute's values.
 */
export type Metatype = BaseItem & {
    data: MetatypeDataContainer;
};

export interface MetatypeDataContainer extends BaseItemDataContainer {
    // TODO: Ids from compendium or names to search for?
    qualities: never;
    modifiers: {
        [TKey in AttributeName]: {
            baseValue: number;
            maximumValue: number;
        };
    };
}

// let MetatypeTest = (0 as unknown) as Metatype;
// for (const attribute of Object.values(AttributeName)) {
//     if (MetatypeTest.data.modifiers) {
//         // Apply modifiers
//     }
// }
