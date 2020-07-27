import BaseActorFactory from './BaseActorFactory';
import { IPreCreateActorData } from '../../common/Hooks';
import { ISR5GruntData } from '../SR5Grunt';

export default class GruntFactory extends BaseActorFactory {
    create(data: IPreCreateActorData): ISR5GruntData {
        return super.create(data);
    }
}
