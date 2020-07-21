// SINGULAR FIELDS THAT ARE TOO SMALL FOR THEIR OWN FILE

export interface HasId {
    _id: string;
}

export interface HasSource {
    source: string;
}

export interface HasDescription {
    description: string;
    // TODO: What is 'chat'?
}

export interface HasAvailability {
    availability: string;
}

export interface HasRating {
    rating: number;
}

export interface CanSort {
    sort: number;
}

export interface HasImage {
    img: string;
}

export interface HasCost {
    cost: number;
}

export interface HasQuantity {
    quantity: number;
}
