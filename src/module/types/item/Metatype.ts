import { AttributeName, PhysicalAttributeName } from '../common/Attribute';
import { IBaseItem, IBaseItemDataContainer } from './IBaseItem';

/**
 * A meta-type potentially modifies an attribute's values.
 */
export type Metatype = IBaseItem & {
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
