import KeyValuePair = Shadowrun.KeyValuePair;

/**
 * Utility class for managing parts of dice pools.
 */
export class SR5RollParts {
    private readonly _parts: Record<string, number>;

    constructor(parts?: Record<string, number>) {
        if (parts === undefined) {
            parts = {};
        }

        this._parts = parts;
    }

    /**
     * Merge another parts list into this list.
     * @param other
     */
    public merge(other: SR5RollParts): SR5RollParts {
        for (const key of Object.keys(other)) {
            this._parts[key] = other[key];
        }
        return this;
    }

    /**
     * All keys of this object.
     */
    public keys(): Array<string> {
        return Object.keys(this._parts);
    }

    /**
     * Returns true if the parts list has the specified key.
     * @param key
     */
    public has(key: string): boolean {
        return this._parts.hasOwnProperty(key);
    }

    /**
     * Get a part by its key. Throws if the key does not exist.
     * @param key
     */
    public get(key: string): number {
        if (this._parts.hasOwnProperty(key)) {
            return this._parts[key];
        }
        //TODO: I18n.
        throw new Error(`${key} does not exist in parts list.`);
    }

    /**
     * Tries to get a part, returns {@param except} if it is not found.
     * @param key
     * @param except
     */
    public tryGet(key: string, except: number = 0): number {
        try {
            return this.get(key);
        } catch (error) {
            return except;
        }
    }

    /**
     * Sets the key and value in this list, overwrites existing values.
     * @param key
     * @param value
     */
    public set(key: string, value: number): void {
        this._parts[key] = value;
    }

    /**
     * Remove a specified part. Returns true if a part was removed.
     * @param key
     */
    public remove(key: string): boolean {
        if (this.has(key)) {
            delete this._parts[key];
            return true;
        }
        return false;
    }

    /**
     * Try to add the key and value to this list. Returns true if it is inserted, or false if it already exists.
     * @param key
     * @param value
     */
    public add(key: string, value: number): boolean {
        if (this._parts.hasOwnProperty(key)) {
            return false;
        }
        this._parts[key] = value;
        return true;
    }

    /**
     * Increments a part by an amount. If the part does not exist, this functions as {@see set}.
     * @param key
     * @param amount
     */
    public increment(key: string, amount: number): void {
        if (this.has(key)) {
            amount = this.get(key) + amount;
        }
        this.set(key, amount);
    }

    /**
     * Get the total of this parts list.
     */
    public sum(): number {
        let sum = 0;
        for (const key of this.keys()) {
            sum += this._parts[key];
        }
        return sum;
    }

    /**
     * Return all parts in this parts list as {key, value} pairs.
     */
    public asObjectPairs(): KeyValuePair[] {
        const array: KeyValuePair[] = [];
        for (const [key, value] of Object.entries(this._parts)) {
            array.push({
                key,
                value,
            });
        }
        console.warn(array);
        return array;
    }

    /**
     * Return all parts in this parts list as [key, value] pairs.
     */
    public asArrayPairs(): [string, number][] {
        return Object.entries(this._parts);
    }
}
