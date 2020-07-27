// SINGULAR FIELDS THAT ARE TOO SMALL FOR THEIR OWN FILE

export interface IId {
    id: string;
}

export interface ISource {
    source: string;
}

/**
 * TypeGuard: Does the object contain a description?
 * @param o
 */
export function HasDescription(o: any): o is IDescription {
    return o.hasOwnProperty('description');
}
export interface IDescription {
    description: string;
    // TODO: What is 'chat'?
}

/**
 * TypeGuard: Does the object contain an availability?
 * @param o
 */
export function HasAvailability(o: any): o is IAvailability {
    return o.hasOwnProperty('availability');
}
export interface IAvailability {
    availability: string;
}

export interface IConcealability {
    concealability: number;
}

export interface ISort {
    sort: number;
}

export interface IImage {
    img: string;
}
