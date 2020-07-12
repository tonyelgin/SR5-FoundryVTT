import { IDataSource } from '../data-source/IDataSource';

export interface IDataBridge {
    getValue(key: string): number;
    setSource(key: string, value: IDataSource): void;
}
