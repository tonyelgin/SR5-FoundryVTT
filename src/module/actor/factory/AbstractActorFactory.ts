import { IPreCreateActorData } from '../../common/Hooks';
import { ISR5BaseActorData } from '../SR5BaseActor';

export default abstract class AbstractActorFactory<T extends ISR5BaseActorData> {
    public abstract create(data: IPreCreateActorData): T;
}
