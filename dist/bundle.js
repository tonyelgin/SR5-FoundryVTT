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
        // Register item + sheets
        CONFIG.Item.entityClass = SR5ItemProxy_1.default;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseItemSheet_1.default, { makeDefault: true });
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
},{"./Constants":1,"./actor/SR5ActorProxy":4,"./actor/sheet/SR5BaseActorSheet":8,"./item/SR5ItemProxy":13,"./item/sheet/SR5BaseItemSheet":15}],4:[function(require,module,exports){
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
            // NOTE: This should be only 'leaf node' classes. The 'onPreCreate' methods
            //  should then chain the call upward with super calls if needed.
            const CLASSES = [SR5Runner_1.default, SR5Grunt_1.default];
            const CLASS = CLASSES.find((CLASS) => CLASS.TYPE === data.type);
            if (CLASS) {
                // Default values are over-written with provided ones.
                const defaultValues = CLASS.getDefaultValues();
                console.warn(`merged defaultValues`);
                console.warn(defaultValues);
                data = {
                    name: data.name,
                    folder: data.folder,
                    type: data.type,
                    data: defaultValues,
                };
            }
            else {
                console.warn(`Unable to find default values for type ${data.type}.`);
            }
            return _super.create.call(this, data, options);
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
}
exports.default = SR5ActorProxy;
},{"./SR5Grunt":6,"./SR5Runner":7,"./types/ActorType":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseActor extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(data, options);
        this.data = data;
        this.proxy = proxy;
    }
    // <editor-fold desc="Static Properties">
    /**
     * When creating actors, the type is checked against this array. If a matching type is found
     *  {@see onPreCreate} is called to initialize type-specific default data. Must be inherited.
     */
    static get TYPE() {
        throw new Error('ACTOR_TYPE must be implemented.');
    }
    // </editor-fold>
    // <editor-fold desc="Static Methods">
    /**
     * Initializes type-specific default data before the actor is sent to the server.
     */
    static getDefaultValues() {
        console.warn(`SR5BaseActor getDefaultValues`);
        return {
            name: 'Hello!',
        };
    }
}
exports.default = SR5BaseActor;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
const ActorType_1 = require("./types/ActorType");
class SR5Grunt extends SR5BaseActor_1.default {
    // <editor-fold desc="Static Properties">
    static get TYPE() {
        return ActorType_1.ActorType.Grunt;
    }
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
},{"./SR5BaseActor":5,"./types/ActorType":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
const Attribute_1 = require("../common/Attribute");
const ActorType_1 = require("./types/ActorType");
class SR5Runner extends SR5BaseActor_1.default {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(proxy, data, options);
        console.warn(this);
    }
    // <editor-fold desc="Static Properties">
    static get TYPE() {
        return ActorType_1.ActorType.Runner;
    }
    // </editor-fold>
    // <editor-fold desc="Static Methods">
    static getDefaultValues() {
        console.warn(`SR5Runner getDefaultValues`);
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
            depth: {
                name: Attribute_1.AttributeName.Depth,
                value: 1,
            },
            edge: {
                name: Attribute_1.AttributeName.Edge,
                value: 1,
            },
            essence: {
                name: Attribute_1.AttributeName.Essence,
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
            magic: {
                name: Attribute_1.AttributeName.Magic,
                value: 1,
            },
            reaction: {
                name: Attribute_1.AttributeName.Reaction,
                value: 1,
            },
            resonance: {
                name: Attribute_1.AttributeName.Resonance,
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
        };
        return Object.assign(Object.assign({}, super.getDefaultValues()), { attributes });
    }
}
exports.default = SR5Runner;
},{"../common/Attribute":10,"./SR5BaseActor":5,"./types/ActorType":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseActorSheet extends ActorSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(...args) {
        super(...args);
    }
}
exports.default = SR5BaseActorSheet;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5Armor extends SR5BaseItem_1.default {
}
exports.default = SR5Armor;
},{"./SR5BaseItem":12}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{"./SR5Armor":11,"./SR5Weapon":14,"./types/ItemType":16}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5Weapon extends SR5BaseItem_1.default {
}
exports.default = SR5Weapon;
},{"./SR5BaseItem":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItemSheet extends ItemSheet {
}
exports.default = SR5BaseItemSheet;
},{}],16:[function(require,module,exports){
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
