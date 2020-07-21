import { IItem, IBaseItemDataContainer } from '../IItem';
import { BaseActionData } from './BaseActionData';

export interface BaseAction extends IItem {
    type: 'action';
    data: BaseActionDataContainer;
}

export interface BaseActionDataContainer extends IBaseItemDataContainer {
    action: BaseActionData;
}

let BaseActionTest = (0 as unknown) as BaseAction;
BaseActionTest.data.action;
