(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_NAME = void 0;
exports.SYSTEM_NAME = 'shadowrun5e';
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Setup_1 = require("./Setup");
Setup_1.default.run();
CONFIG.debug.hooks = true;
},{"./Setup":3}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SR5ActorProxy_1 = require("./actor/SR5ActorProxy");
const Constants_1 = require("./Constants");
const SR5BaseActorSheet_1 = require("./actor/sheet/SR5BaseActorSheet");
const SR5ItemProxy_1 = require("./item/SR5ItemProxy");
const SR5BaseItemSheet_1 = require("./item/sheet/SR5BaseItemSheet");
const SR5RunnerSheet_1 = require("./actor/sheet/SR5RunnerSheet");
const SR5GruntSheet_1 = require("./actor/sheet/SR5GruntSheet");
class Setup {
    static run() {
        Hooks.once('init', this.init);
        Hooks.once('setup', this.setup);
        Hooks.once('ready', this.ready);
    }
    // Tasks called on init
    static init() {
        // Register actor + sheets
        CONFIG.Actor.entityClass = SR5ActorProxy_1.default;
        Actors.unregisterSheet('core', ActorSheet);
        Actors.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseActorSheet_1.default, { makeDefault: true });
        Actors.registerSheet(Constants_1.SYSTEM_NAME, SR5RunnerSheet_1.default, { makeDefault: false });
        Actors.registerSheet(Constants_1.SYSTEM_NAME, SR5GruntSheet_1.default, { makeDefault: false });
        // Register item + sheets
        CONFIG.Item.entityClass = SR5ItemProxy_1.default;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseItemSheet_1.default, { makeDefault: true });
        // Register Handlebars Helpers
        // if equal
        Handlebars.registerHelper('ife', function (v1, v2, options) {
            console.warn(v1);
            console.warn(v2);
            if (v1 === v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if not equal
        Handlebars.registerHelper('ifne', function (v1, v2, options) {
            if (v1 !== v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if greater than
        Handlebars.registerHelper('ifgt', function (v1, v2, options) {
            if (v1 > v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if greater than equal to
        Handlebars.registerHelper('ifge', function (v1, v2, options) {
            if (v1 >= v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if less than
        Handlebars.registerHelper('iflt', function (v1, v2, options) {
            if (v1 < v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if less than equal to
        Handlebars.registerHelper('ifle', function (v1, v2, options) {
            if (v1 <= v2)
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // if includes
        Handlebars.registerHelper('ifin', function (val, arr, options) {
            if (arr.includes(val))
                return options.fn(this);
            else
                return options.inverse(this);
        });
        // Above code will run synchronously with Foundry
        // Async tasks can be done by returning a new Promise
        return Promise.resolve();
    }
    static setup() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static ready() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Setup;
},{"./Constants":1,"./actor/SR5ActorProxy":4,"./actor/sheet/SR5BaseActorSheet":12,"./actor/sheet/SR5GruntSheet":13,"./actor/sheet/SR5RunnerSheet":14,"./item/SR5ItemProxy":20,"./item/sheet/SR5BaseItemSheet":22}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SR5Runner_1 = require("./SR5Runner");
const SR5Grunt_1 = require("./SR5Grunt");
const ActorType_1 = require("./types/ActorType");
const RunnerFactory_1 = require("./factory/RunnerFactory");
const GruntFactory_1 = require("./factory/GruntFactory");
class SR5ActorProxy extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        switch (data.type) {
            case ActorType_1.ActorType.Runner:
                this._implementation = new SR5Runner_1.default(this, data, options);
                break;
            case ActorType_1.ActorType.Grunt:
                this._implementation = new SR5Grunt_1.default(this, data, options);
                break;
        }
    }
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods">
    static create(data, options) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // We use a factory for default data instead of the template. This allows
            // us to correctly syncronize our internal types - the data template is
            // instead used only to create containers in which the data will be stored
            // Handling this internally has a number of benefits. Mostly it allows strong
            // and more thorough typing of data where the JSON template does not.
            let factory;
            switch (data.type) {
                case ActorType_1.ActorType.Runner:
                    factory = new RunnerFactory_1.default();
                    break;
                case ActorType_1.ActorType.Grunt:
                    factory = new GruntFactory_1.default();
                    break;
            }
            // This will only compile if *every* actor type is handled
            const factoryData = factory.create(data);
            return _super.create.call(this, factoryData, options);
        });
    }
    /** @override */
    prepareData() {
        if (this._implementation !== undefined) {
            this._implementation.prepareData();
        }
        return super.prepareData();
    }
    /** @override */
    prepareEmbeddedEntities() {
        if (this._implementation !== undefined) {
            this._implementation.prepareEmbeddedEntities();
        }
        return super.prepareEmbeddedEntities();
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters">
    get Impl() {
        return this._implementation;
    }
}
exports.default = SR5ActorProxy;
},{"./SR5Grunt":6,"./SR5Runner":7,"./factory/GruntFactory":10,"./factory/RunnerFactory":11,"./types/ActorType":15}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActorOfType = void 0;
class SR5BaseActor extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(data, options);
        // TODO: Safer cast. Should be true atm.
        this.data = data;
        this.proxy = proxy;
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters">
    get sheet() {
        // TODO: Figure out safe cast.
        return this.proxy.sheet;
    }
}
exports.default = SR5BaseActor;
function isActorOfType(actor) {
    return true;
}
exports.isActorOfType = isActorOfType;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGrunt = void 0;
const SR5BaseActor_1 = require("./SR5BaseActor");
const ActorType_1 = require("./types/ActorType");
class SR5Grunt extends SR5BaseActor_1.default {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
    prepareData() {
        super.prepareData();
    }
    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
    }
}
exports.default = SR5Grunt;
function isGrunt(actor) {
    return actor.data.type === ActorType_1.ActorType.Grunt;
}
exports.isGrunt = isGrunt;
},{"./SR5BaseActor":5,"./types/ActorType":15}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRunner = void 0;
const SR5BaseActor_1 = require("./SR5BaseActor");
const ActorType_1 = require("./types/ActorType");
class SR5Runner extends SR5BaseActor_1.default {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(proxy, data, options);
        console.warn(this);
    }
}
exports.default = SR5Runner;
function isRunner(actor) {
    return actor.data.type === ActorType_1.ActorType.Runner;
}
exports.isRunner = isRunner;
},{"./SR5BaseActor":5,"./types/ActorType":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractActorFactory {
}
exports.default = AbstractActorFactory;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractActorFactory_1 = require("./AbstractActorFactory");
class BaseActorFactory extends AbstractActorFactory_1.default {
    create(data) {
        return {
            data: {},
            flags: {},
            img: '',
            name: data.name,
            type: data.type,
        };
    }
}
exports.default = BaseActorFactory;
},{"./AbstractActorFactory":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseActorFactory_1 = require("./BaseActorFactory");
class GruntFactory extends BaseActorFactory_1.default {
    create(data) {
        return super.create(data);
    }
}
exports.default = GruntFactory;
},{"./BaseActorFactory":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attribute_1 = require("../../common/Attribute");
const BaseActorFactory_1 = require("./BaseActorFactory");
const Skills_1 = require("../../common/Skills");
class RunnerFactory extends BaseActorFactory_1.default {
    create(data) {
        const superData = super.create(data);
        let attributes = {
            body: {
                name: Attribute_1.AttributeName.Body,
                value: 1,
            },
            agility: {
                name: Attribute_1.AttributeName.Agility,
                value: 1,
            },
            charisma: {
                name: Attribute_1.AttributeName.Charisma,
                value: 1,
            },
            intuition: {
                name: Attribute_1.AttributeName.Intuition,
                value: 1,
            },
            logic: {
                name: Attribute_1.AttributeName.Logic,
                value: 1,
            },
            reaction: {
                name: Attribute_1.AttributeName.Reaction,
                value: 1,
            },
            strength: {
                name: Attribute_1.AttributeName.Strength,
                value: 1,
            },
            willpower: {
                name: Attribute_1.AttributeName.Willpower,
                value: 1,
            },
            edge: {
                name: Attribute_1.AttributeName.Edge,
                value: 1,
            },
            essence: {
                name: Attribute_1.AttributeName.Essence,
                value: 6,
            },
            magic: {
                name: Attribute_1.AttributeName.Magic,
                value: 0,
            },
            resonance: {
                name: Attribute_1.AttributeName.Resonance,
                value: 0,
            },
            depth: {
                name: Attribute_1.AttributeName.Depth,
                value: 0,
            },
        };
        let skills = {
            archery: {
                name: Skills_1.ActiveSkillName.Archery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            automatics: {
                name: Skills_1.ActiveSkillName.Automatics,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            blades: {
                name: Skills_1.ActiveSkillName.Blades,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            clubs: {
                name: Skills_1.ActiveSkillName.Clubs,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            heavy_weapons: {
                name: Skills_1.ActiveSkillName.HeavyWeapons,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            longarms: {
                name: Skills_1.ActiveSkillName.Longarms,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            pistols: {
                name: Skills_1.ActiveSkillName.Pistols,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            throwing_weapons: {
                name: Skills_1.ActiveSkillName.ThrowingWeapons,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            unarmed_combat: {
                name: Skills_1.ActiveSkillName.UnarmedCombat,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            disguise: {
                name: Skills_1.ActiveSkillName.Disguise,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            diving: {
                name: Skills_1.ActiveSkillName.Diving,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Body,
            },
            escape_artist: {
                name: Skills_1.ActiveSkillName.EscapeArtist,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            flight: {
                name: Skills_1.ActiveSkillName.Flight,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            free_fall: {
                name: Skills_1.ActiveSkillName.FreeFall,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Body,
            },
            gymnastics: {
                name: Skills_1.ActiveSkillName.Gymnastics,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            palming: {
                name: Skills_1.ActiveSkillName.Palming,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            perception: {
                name: Skills_1.ActiveSkillName.Perception,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            running: {
                name: Skills_1.ActiveSkillName.Running,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Strength,
            },
            sneaking: {
                name: Skills_1.ActiveSkillName.Sneaking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            survival: {
                name: Skills_1.ActiveSkillName.Survival,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Willpower,
            },
            swimming: {
                name: Skills_1.ActiveSkillName.Swimming,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Strength,
            },
            tracking: {
                name: Skills_1.ActiveSkillName.Tracking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            con: {
                name: Skills_1.ActiveSkillName.Con,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            etiquette: {
                name: Skills_1.ActiveSkillName.Etiquette,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            impersonation: {
                name: Skills_1.ActiveSkillName.Impersonation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            instruction: {
                name: Skills_1.ActiveSkillName.Instruction,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            intimidation: {
                name: Skills_1.ActiveSkillName.Intimidation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            leadership: {
                name: Skills_1.ActiveSkillName.Leadership,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            negotiation: {
                name: Skills_1.ActiveSkillName.Negotiation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            performance: {
                name: Skills_1.ActiveSkillName.Performance,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            alchemy: {
                name: Skills_1.ActiveSkillName.Alchemy,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            arcana: {
                name: Skills_1.ActiveSkillName.Arcana,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            artificing: {
                name: Skills_1.ActiveSkillName.Artificing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            assensing: {
                name: Skills_1.ActiveSkillName.Assensing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            astral_combat: {
                name: Skills_1.ActiveSkillName.AstralCombat,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Willpower,
            },
            banishing: {
                name: Skills_1.ActiveSkillName.Banishing,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            binding: {
                name: Skills_1.ActiveSkillName.Binding,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            counterspelling: {
                name: Skills_1.ActiveSkillName.Counterspelling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            disenchanting: {
                name: Skills_1.ActiveSkillName.Disenchanting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            ritual_spellcasting: {
                name: Skills_1.ActiveSkillName.RitualSpellcasting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            spellcasting: {
                name: Skills_1.ActiveSkillName.Spellcasting,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            summoning: {
                name: Skills_1.ActiveSkillName.Summoning,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Magic,
            },
            compiling: {
                name: Skills_1.ActiveSkillName.Compiling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Resonance,
            },
            decompiling: {
                name: Skills_1.ActiveSkillName.Decompiling,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Resonance,
            },
            registering: {
                name: Skills_1.ActiveSkillName.Registering,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Resonance,
            },
            aeronautics_mechanic: {
                name: Skills_1.ActiveSkillName.AeronauticsMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            automotive_mechanic: {
                name: Skills_1.ActiveSkillName.AutomotiveMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            industrial_mechanic: {
                name: Skills_1.ActiveSkillName.IndustrialMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            nautical_mechanic: {
                name: Skills_1.ActiveSkillName.NauticalMechanic,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            animal_handling: {
                name: Skills_1.ActiveSkillName.AnimalHandling,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Charisma,
            },
            armorer: {
                name: Skills_1.ActiveSkillName.Armorer,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            artisan: {
                name: Skills_1.ActiveSkillName.Artisan,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            biotechnology: {
                name: Skills_1.ActiveSkillName.Biotechnology,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            chemistry: {
                name: Skills_1.ActiveSkillName.Chemistry,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            computer: {
                name: Skills_1.ActiveSkillName.Computer,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            cybercombat: {
                name: Skills_1.ActiveSkillName.Cybercombat,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            cybertechnology: {
                name: Skills_1.ActiveSkillName.Cybertechnology,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            demolitions: {
                name: Skills_1.ActiveSkillName.Demolitions,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            electronic_warfare: {
                name: Skills_1.ActiveSkillName.ElectronicWarfare,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            first_aid: {
                name: Skills_1.ActiveSkillName.FirstAid,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            forgery: {
                name: Skills_1.ActiveSkillName.Forgery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            hacking: {
                name: Skills_1.ActiveSkillName.Hacking,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            hardware: {
                name: Skills_1.ActiveSkillName.Hardware,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            locksmith: {
                name: Skills_1.ActiveSkillName.Locksmith,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            medicine: {
                name: Skills_1.ActiveSkillName.Medicine,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            navigation: {
                name: Skills_1.ActiveSkillName.Navigation,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Intuition,
            },
            software: {
                name: Skills_1.ActiveSkillName.Software,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Logic,
            },
            gunnery: {
                name: Skills_1.ActiveSkillName.Gunnery,
                value: 0,
                canDefault: true,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Agility,
            },
            pilot_aerospace: {
                name: Skills_1.ActiveSkillName.PilotAerospace,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Reaction,
            },
            pilot_aircraft: {
                name: Skills_1.ActiveSkillName.PilotAircraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Reaction,
            },
            pilot_walker: {
                name: Skills_1.ActiveSkillName.PilotWalker,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Reaction,
            },
            pilot_ground_craft: {
                name: Skills_1.ActiveSkillName.PilotGroundCraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Reaction,
            },
            pilot_water_craft: {
                name: Skills_1.ActiveSkillName.PilotWaterCraft,
                value: 0,
                canDefault: false,
                specializations: [],
                defaultAttribute: Attribute_1.AttributeName.Reaction,
            },
        };
        return Object.assign(Object.assign({}, superData), { data: {
                attributes,
                skills: {
                    active: skills,
                    knowledge: {},
                },
            } });
    }
}
exports.default = RunnerFactory;
},{"../../common/Attribute":16,"../../common/Skills":17,"./BaseActorFactory":9}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActorType_1 = require("../types/ActorType");
class SR5BaseActorSheet extends ActorSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(...args) {
        super(...args);
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters">
    get actor() {
        // TODO: Figure out how to more safely cast this.
        return super.actor.Impl;
    }
    get id() {
        return `actor-${this.actor.id}`;
    }
    // </editor-fold>
    // <editor-fold desc="Instance Methods">
    getData() {
        const data = super.getData();
        data['CONST'] = {
            ActorType: ActorType_1.ActorType,
        };
        console.warn(`Sheet is of type ${this.constructor.name}`);
        console.warn(data);
        console.warn(super.actor);
        return data;
    }
    activateListeners(html) {
        console.warn(html);
        super.activateListeners(html);
    }
    close() {
        console.warn(this.form);
        return super.close();
    }
}
exports.default = SR5BaseActorSheet;
},{"../types/ActorType":15}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActorSheet_1 = require("./SR5BaseActorSheet");
class SR5GruntSheet extends SR5BaseActorSheet_1.default {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(...args) {
        super(...args);
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters">
    get template() {
        return `systems/shadowrun5e/dist/templates/test/grunt.html`;
    }
}
exports.default = SR5GruntSheet;
},{"./SR5BaseActorSheet":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActorSheet_1 = require("./SR5BaseActorSheet");
class SR5RunnerSheet extends SR5BaseActorSheet_1.default {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters">
    get template() {
        return `systems/shadowrun5e/dist/templates/test/runner.html`;
    }
    // </editor-fold>
    // <editor-fold desc="Instance Methods">
    getData() {
        const data = super.getData();
        return data;
    }
}
exports.default = SR5RunnerSheet;
},{"./SR5BaseActorSheet":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorType = void 0;
var ActorType;
(function (ActorType) {
    ActorType["Runner"] = "Runner";
    ActorType["Grunt"] = "Grunt";
    // Contact = 'Contact',
    // Spirit = 'Spirit',
    // Sprite = 'Sprite',
    // Vehicle = 'Vehicle',
    // Critter = 'Critter',
    // Host = 'Host',
    // IC = 'IC',
})(ActorType = exports.ActorType || (exports.ActorType = {}));
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerAttributeName = exports.AttributeName = exports.MatrixAttributeName = exports.SpecialAttributeName = exports.MentalAttributeName = exports.PhysicalAttributeName = void 0;
var PhysicalAttributeName;
(function (PhysicalAttributeName) {
    PhysicalAttributeName["Body"] = "body";
    PhysicalAttributeName["Agility"] = "agility";
    PhysicalAttributeName["Reaction"] = "reaction";
    PhysicalAttributeName["Strength"] = "strength";
})(PhysicalAttributeName = exports.PhysicalAttributeName || (exports.PhysicalAttributeName = {}));
var MentalAttributeName;
(function (MentalAttributeName) {
    MentalAttributeName["Logic"] = "logic";
    MentalAttributeName["Intuition"] = "intuition";
    MentalAttributeName["Charisma"] = "charisma";
    MentalAttributeName["Willpower"] = "willpower";
})(MentalAttributeName = exports.MentalAttributeName || (exports.MentalAttributeName = {}));
var SpecialAttributeName;
(function (SpecialAttributeName) {
    SpecialAttributeName["Edge"] = "edge";
    SpecialAttributeName["Essence"] = "essence";
    SpecialAttributeName["Magic"] = "magic";
    SpecialAttributeName["Resonance"] = "resonance";
    SpecialAttributeName["Depth"] = "depth";
})(SpecialAttributeName = exports.SpecialAttributeName || (exports.SpecialAttributeName = {}));
var MatrixAttributeName;
(function (MatrixAttributeName) {
    MatrixAttributeName["Attack"] = "attack";
    MatrixAttributeName["Sleaze"] = "sleaze";
    MatrixAttributeName["DataProcessing"] = "data_processing";
    MatrixAttributeName["Firewall"] = "firewall";
})(MatrixAttributeName = exports.MatrixAttributeName || (exports.MatrixAttributeName = {}));
exports.AttributeName = Object.assign(Object.assign(Object.assign(Object.assign({}, PhysicalAttributeName), MentalAttributeName), SpecialAttributeName), MatrixAttributeName);
exports.RunnerAttributeName = Object.assign(Object.assign(Object.assign({}, PhysicalAttributeName), MentalAttributeName), SpecialAttributeName);
// export type AttributeField = BaseValuePair<number> &
//     CanHideFiled &
//     ModifiableValue &
//     LabelField & {
//     limit?: string;
// };
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeSkillType = exports.SkillGroupName = exports.ActiveSkillName = exports.VehicleSkillName = exports.TechnicalSkillName = exports.SocialSkillName = exports.ResonanceSkillName = exports.PhysicalSkillName = exports.MagicalSkillName = exports.CombatSkillName = void 0;
var CombatSkillName;
(function (CombatSkillName) {
    CombatSkillName["Archery"] = "archery";
    CombatSkillName["Automatics"] = "automatics";
    CombatSkillName["Blades"] = "blades";
    CombatSkillName["Clubs"] = "clubs";
    // TODO: ExoticMeleeWeapon = 'exotic_melee_weapon',
    // TODO: ExoticRangedWeapon = 'exotic_ranged_weapon',
    CombatSkillName["HeavyWeapons"] = "heavy_weapons";
    CombatSkillName["Longarms"] = "longarms";
    CombatSkillName["Pistols"] = "pistols";
    CombatSkillName["ThrowingWeapons"] = "throwing_weapons";
    CombatSkillName["UnarmedCombat"] = "unarmed_combat";
})(CombatSkillName = exports.CombatSkillName || (exports.CombatSkillName = {}));
var MagicalSkillName;
(function (MagicalSkillName) {
    MagicalSkillName["Alchemy"] = "alchemy";
    MagicalSkillName["Arcana"] = "arcana";
    MagicalSkillName["Artificing"] = "artificing";
    MagicalSkillName["Assensing"] = "assensing";
    MagicalSkillName["AstralCombat"] = "astral_combat";
    MagicalSkillName["Banishing"] = "banishing";
    MagicalSkillName["Binding"] = "binding";
    MagicalSkillName["Counterspelling"] = "counterspelling";
    MagicalSkillName["Disenchanting"] = "disenchanting";
    MagicalSkillName["RitualSpellcasting"] = "ritual_spellcasting";
    MagicalSkillName["Spellcasting"] = "spellcasting";
    MagicalSkillName["Summoning"] = "summoning";
})(MagicalSkillName = exports.MagicalSkillName || (exports.MagicalSkillName = {}));
var PhysicalSkillName;
(function (PhysicalSkillName) {
    PhysicalSkillName["AnimalHandling"] = "animal_handling";
    PhysicalSkillName["Disguise"] = "disguise";
    PhysicalSkillName["Diving"] = "diving";
    PhysicalSkillName["EscapeArtist"] = "escape_artist";
    PhysicalSkillName["Flight"] = "flight";
    PhysicalSkillName["FreeFall"] = "free_fall";
    PhysicalSkillName["Gymnastics"] = "gymnastics";
    PhysicalSkillName["Palming"] = "palming";
    PhysicalSkillName["Perception"] = "perception";
    PhysicalSkillName["Running"] = "running";
    PhysicalSkillName["Sneaking"] = "sneaking";
    PhysicalSkillName["Survival"] = "survival";
    PhysicalSkillName["Swimming"] = "swimming";
    PhysicalSkillName["Tracking"] = "tracking";
})(PhysicalSkillName = exports.PhysicalSkillName || (exports.PhysicalSkillName = {}));
var ResonanceSkillName;
(function (ResonanceSkillName) {
    ResonanceSkillName["Compiling"] = "compiling";
    ResonanceSkillName["Decompiling"] = "decompiling";
    ResonanceSkillName["Registering"] = "registering";
})(ResonanceSkillName = exports.ResonanceSkillName || (exports.ResonanceSkillName = {}));
var SocialSkillName;
(function (SocialSkillName) {
    SocialSkillName["Con"] = "con";
    SocialSkillName["Etiquette"] = "etiquette";
    SocialSkillName["Impersonation"] = "impersonation";
    SocialSkillName["Instruction"] = "instruction";
    SocialSkillName["Intimidation"] = "intimidation";
    SocialSkillName["Leadership"] = "leadership";
    SocialSkillName["Negotiation"] = "negotiation";
    SocialSkillName["Performance"] = "performance";
})(SocialSkillName = exports.SocialSkillName || (exports.SocialSkillName = {}));
var TechnicalSkillName;
(function (TechnicalSkillName) {
    TechnicalSkillName["AeronauticsMechanic"] = "aeronautics_mechanic";
    TechnicalSkillName["Armorer"] = "armorer";
    TechnicalSkillName["Artisan"] = "artisan";
    TechnicalSkillName["AutomotiveMechanic"] = "automotive_mechanic";
    TechnicalSkillName["Biotechnology"] = "biotechnology";
    TechnicalSkillName["Chemistry"] = "chemistry";
    TechnicalSkillName["Computer"] = "computer";
    TechnicalSkillName["Cybercombat"] = "cybercombat";
    TechnicalSkillName["Cybertechnology"] = "cybertechnology";
    TechnicalSkillName["Demolitions"] = "demolitions";
    TechnicalSkillName["ElectronicWarfare"] = "electronic_warfare";
    TechnicalSkillName["FirstAid"] = "first_aid";
    TechnicalSkillName["Forgery"] = "forgery";
    TechnicalSkillName["Hacking"] = "hacking";
    TechnicalSkillName["Hardware"] = "hardware";
    TechnicalSkillName["IndustrialMechanic"] = "industrial_mechanic";
    TechnicalSkillName["Locksmith"] = "locksmith";
    TechnicalSkillName["Medicine"] = "medicine";
    TechnicalSkillName["NauticalMechanic"] = "nautical_mechanic";
    TechnicalSkillName["Navigation"] = "navigation";
    TechnicalSkillName["Software"] = "software";
})(TechnicalSkillName = exports.TechnicalSkillName || (exports.TechnicalSkillName = {}));
var VehicleSkillName;
(function (VehicleSkillName) {
    VehicleSkillName["Gunnery"] = "gunnery";
    VehicleSkillName["PilotAerospace"] = "pilot_aerospace";
    VehicleSkillName["PilotAircraft"] = "pilot_aircraft";
    // TODO: PilotExoticVehicle = 'pilot_exotic_vehicle',
    VehicleSkillName["PilotGroundCraft"] = "pilot_ground_craft";
    VehicleSkillName["PilotWalker"] = "pilot_walker";
    VehicleSkillName["PilotWaterCraft"] = "pilot_water_craft";
})(VehicleSkillName = exports.VehicleSkillName || (exports.VehicleSkillName = {}));
exports.ActiveSkillName = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, CombatSkillName), MagicalSkillName), PhysicalSkillName), ResonanceSkillName), SocialSkillName), TechnicalSkillName), VehicleSkillName);
var SkillGroupName;
(function (SkillGroupName) {
    SkillGroupName["Acting"] = "acting";
    SkillGroupName["Athletics"] = "athletics";
    SkillGroupName["Biotech"] = "biotech";
    SkillGroupName["CloseCombat"] = "close_combat";
    SkillGroupName["Conjuring"] = "conjuring";
    SkillGroupName["Cracking"] = "cracking";
    SkillGroupName["Electronics"] = "electronics";
    SkillGroupName["Enchanting"] = "enchanting";
    SkillGroupName["Firearms"] = "firearms";
    SkillGroupName["Influence"] = "influence";
    SkillGroupName["Engineering"] = "engineering";
    SkillGroupName["Outdoors"] = "outdoors";
    SkillGroupName["Sorcery"] = "sorcery";
    SkillGroupName["Stealth"] = "stealth";
    SkillGroupName["Tasking"] = "tasking";
})(SkillGroupName = exports.SkillGroupName || (exports.SkillGroupName = {}));
var KnowledgeSkillType;
(function (KnowledgeSkillType) {
    KnowledgeSkillType["Street"] = "street";
    KnowledgeSkillType["Academic"] = "academic";
    KnowledgeSkillType["Interest"] = "interest";
    KnowledgeSkillType["Language"] = "language";
})(KnowledgeSkillType = exports.KnowledgeSkillType || (exports.KnowledgeSkillType = {}));
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5Armor extends SR5BaseItem_1.default {
}
exports.default = SR5Armor;
},{"./SR5BaseItem":19}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItem extends Item {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        console.warn(`Created a new ${this.constructor.name}`);
    }
}
exports.default = SR5BaseItem;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemType_1 = require("./types/ItemType");
const SR5Weapon_1 = require("./SR5Weapon");
const SR5Armor_1 = require("./SR5Armor");
class SR5ItemProxy extends Item {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        switch (data.type) {
            case ItemType_1.ItemType.Weapon:
                this._implementation = new SR5Weapon_1.default(data, options);
                break;
            case ItemType_1.ItemType.Armor:
                this._implementation = new SR5Armor_1.default(data, options);
                break;
            case ItemType_1.ItemType.Device:
                break;
            case ItemType_1.ItemType.Program:
                break;
            case ItemType_1.ItemType.Ammunition:
                break;
        }
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">
    /** @override */
    update(data, options) {
        return this._implementation.update(data, options);
    }
}
exports.default = SR5ItemProxy;
},{"./SR5Armor":18,"./SR5Weapon":21,"./types/ItemType":23}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5Weapon extends SR5BaseItem_1.default {
}
exports.default = SR5Weapon;
},{"./SR5BaseItem":19}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItemSheet extends ItemSheet {
}
exports.default = SR5BaseItemSheet;
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = void 0;
var ItemType;
(function (ItemType) {
    ItemType["Weapon"] = "Weapon";
    ItemType["Armor"] = "Armor";
    ItemType["Device"] = "Device";
    ItemType["Program"] = "Program";
    ItemType["Ammunition"] = "Ammunition";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
