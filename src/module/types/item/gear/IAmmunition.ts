import { IBaseItemDataContainer, IBaseItem } from '../IBaseItem';
import { DamageElement, DamageType } from '../../common/Damage';
import { NoneType } from '../../../common/Constants';

export interface IAmmunition extends IBaseItem {
    data: IAmmunitionDataContainer;
}

export interface IAmmunitionDataContainer extends IBaseItemDataContainer {
    damageValue: number; // Additive
    armorPenetration: number; // Additive

    damageType: DamageType | NoneType; // Overwrite only
    damageElement: DamageElement | NoneType; // Overwrite only

    // TODO: blast ...
    //  Explosive ammunition (e.g. mini grenades) may be easier to implement as 'sub-weapons'
    //  That way we can have embedded items that we just roll as is for them, maybe simpler?
}

let IAmmunitionTest = (0 as unknown) as IAmmunition;
IAmmunitionTest.data;
