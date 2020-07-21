import { BaseItem, BaseItemDataContainer } from '../BaseItem';
import { BaseActionData } from './BaseActionData';

export interface BaseAction extends BaseItem {
    type: 'action';
    data: BaseActionDataContainer;
}

export interface BaseActionDataContainer extends BaseItemDataContainer {
    action: BaseActionData;
}

let BaseActionTest = (0 as unknown) as BaseAction;
BaseActionTest.data.action;
