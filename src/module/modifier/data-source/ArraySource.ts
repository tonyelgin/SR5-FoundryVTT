import { IDataSource } from './IDataSource';

export class ArraySource<TSource extends IDataSource> implements IDataSource {
    // make this a ref to the array
    // loop thru and create TSource objs
    private readonly _sources: IDataSource[];

    constructor(objects: Array<IDataSource>) {
        this._sources = objects;
    }

    getValue(): number {
        let n = 0;
        for (const source of this._sources) {
            n += source.getValue();
        }
        return n;
    }
}
