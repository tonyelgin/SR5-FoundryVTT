import { AttributeName, PhysicalAttributeName } from '../common/Attribute';
import { IItem, IBaseItemDataContainer } from './IItem';

/**
 * A meta-type potentially modifies an attribute's values.
 */
export type Metatype = IItem & {
    data: MetatypeDataContainer;
};

export interface MetatypeDataContainer extends IBaseItemDataContainer {
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
