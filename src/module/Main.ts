import Setup from './Setup';
import SR5BaseActor from './actor/SR5BaseActor';
import SR5Runner from './actor/SR5Runner';
import SR5Grunt from './actor/SR5Grunt';
import { ActorType } from './actor/types/ActorType';

Setup.run();

CONFIG.debug.hooks = true;