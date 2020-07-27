import { IPreCreateActorData } from '../../common/Hooks';
import { ISR5BaseActorDataContainer } from '../SR5BaseActor';

type ExcludedKeys = 'token';
type OptionalKeys = 'img' | 'flags';

// prettier-ignore
type RequiredData<T extends ISR5BaseActorDataContainer> = Omit<
    T, ExcludedKeys | OptionalKeys
>;

// prettier-ignore
type OptionalData<T extends ISR5BaseActorDataContainer> = Partial<
    Pick<T, OptionalKeys>
>;

export type ActorFactoryData<T extends ISR5BaseActorDataContainer> = RequiredData<T> & OptionalData<T>;

export default abstract class AbstractActorFactory<T extends ISR5BaseActorDataContainer> {
    public abstract create(data: IPreCreateActorData): ActorFactoryData<T>;
}
