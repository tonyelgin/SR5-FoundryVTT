import BaseActorFactory from './BaseActorFactory';
import { ISR5GruntDataContainer } from '../SR5Grunt';
import { ActorFactoryData, IPreCreateActorData } from './AbstractActorFactory';
import { ActorType } from '../types/ActorType';

export default class GruntFactory extends BaseActorFactory {
    create(data: IPreCreateActorData): ActorFactoryData<ISR5GruntDataContainer> {
        return {
            ...super.create(data),
            type: ActorType.Grunt,
        };
    }
}
