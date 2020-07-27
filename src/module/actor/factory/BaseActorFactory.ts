import AbstractActorFactory from './AbstractActorFactory';
import { ISR5BaseActorData } from '../SR5BaseActor';
import { IPreCreateActorData } from '../../common/Hooks';

export default abstract class BaseActorFactory extends AbstractActorFactory<ISR5BaseActorData> {
    public create(data: IPreCreateActorData): ISR5BaseActorData {
        return {};
    }
}
