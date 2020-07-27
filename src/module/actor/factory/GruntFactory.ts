import BaseActorFactory from './BaseActorFactory';
import { IPreCreateActorData } from '../../common/Hooks';
import { ISR5GruntDataContainer } from '../SR5Grunt';
import { ActorFactoryData } from './AbstractActorFactory';

export default class GruntFactory extends BaseActorFactory {
    create(data: IPreCreateActorData): ActorFactoryData<ISR5GruntDataContainer> {
        return super.create(data);
    }
}
