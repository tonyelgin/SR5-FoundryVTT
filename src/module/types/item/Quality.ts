import { BaseItem } from './BaseItem';
import { BaseActionDataContainer } from './action/BaseAction';

export interface Quality extends BaseItem {
    data: QualityDataContainer;
}

export enum QualityType {
    Positive = 'positive',
    Negative = 'negative',
}

export interface QualityDataContainer extends BaseActionDataContainer {
    type: QualityType;
}

let QualityTest = (0 as unknown) as Quality;
QualityTest.data.action