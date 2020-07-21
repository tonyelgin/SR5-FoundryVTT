// Considered common because lots of things have damage tracks
// Players, vehicles, devices, etc...
import { DamageType } from '../Damage';

export interface DamageTrack<Name extends DamageType> {
    track_name: Name;
    track_current: number;
    track_maximum: number;
}
