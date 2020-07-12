import { IDataBridge } from './IDataBridge';
import { IDataSource } from '../data-source/IDataSource';

export class ModifierBridge implements IDataBridge {
    private _map: Map<string, IDataSource>;

    constructor() {
        this._map = new Map();
    }

    setSource(key: string, source: IDataSource): void {
        if (this._map.has(key)) {
            throw new Error(`Source map already has key ${key}`);
        }
        this._map.set(key, source);
    }

    public getValue(key: string): number {
        const source = this._map.get(key);
        if (source === undefined) return 0;
        return source.getValue();
    }
}
