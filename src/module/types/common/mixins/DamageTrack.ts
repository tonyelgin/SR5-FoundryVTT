// Considered common because lots of things have damage tracks
// Players, vehicles, devices, etc...
import { DamageType } from '../Damage';

export interface DamageTrack<Name extends DamageType> {
    name: Name;
    value: number;
    max: number;
}
