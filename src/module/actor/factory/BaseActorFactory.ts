import AbstractActorFactory, { ActorFactoryData } from './AbstractActorFactory';
import { ISR5BaseActorDataContainer } from '../SR5BaseActor';
import { IPreCreateActorData } from '../../common/Hooks';

export default abstract class BaseActorFactory extends AbstractActorFactory<ISR5BaseActorDataContainer> {
    public create(data: IPreCreateActorData): ActorFactoryData<ISR5BaseActorDataContainer> {
        return {
            data: {},
            flags: {},
            img: '',
            name: data.name,
            type: data.type,
        };
    }
}
