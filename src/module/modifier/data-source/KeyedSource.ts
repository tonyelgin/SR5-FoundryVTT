import { IDataSource } from './IDataSource';

export class KeyedSource implements IDataSource {
    private _source: object;
    private _key: string;

    constructor(source: object, key: string) {
        this._source = source;
        this._key = key;
    }

    getValue(): number {
        return this._source.hasOwnProperty(this._key) ? this._source[this._key] : 0;
    }
}
