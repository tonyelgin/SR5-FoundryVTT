import { ActorType } from '../actor/types/ActorType';

export interface IPreCreateActorOptions {
    renderSheet: boolean;
    temporary?: boolean;
}
export interface IPreCreateActorData {
    folder: string;
    name: string;
    type: ActorType;
    [key: string]: any;
}
