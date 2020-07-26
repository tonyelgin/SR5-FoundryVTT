(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_NAME = void 0;
exports.SYSTEM_NAME = 'shadowrun5e';
},{}],2:[function(require,module,exports){
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
const SR5BaseItem_1 = require("./item/SR5BaseItem");
const Constants_1 = require("./Constants");
const SR5BaseActorSheet_1 = require("./actor/SR5BaseActorSheet");
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
        CONFIG.Item.entityClass = SR5BaseItem_1.default;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseItem_1.default, { makeDefault: true });
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
},{"./Constants":1,"./actor/SR5ActorProxy":3,"./actor/SR5BaseActorSheet":5,"./item/SR5BaseItem":9}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5Runner_1 = require("./SR5Runner");
const SR5Grunt_1 = require("./SR5Grunt");
const ActorType_1 = require("./types/ActorType");
class SR5ActorProxy extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        switch (this.data.type) {
            case ActorType_1.ActorType.Runner:
                this._implementation = new SR5Runner_1.default(this, data, options);
                break;
            case ActorType_1.ActorType.Grunt:
                this._implementation = new SR5Grunt_1.default(this, data, options);
                break;
            case ActorType_1.ActorType.Spirit:
                break;
            case ActorType_1.ActorType.Sprite:
                break;
            case ActorType_1.ActorType.Vehicle:
                break;
            case ActorType_1.ActorType.Host:
                break;
            case ActorType_1.ActorType.IC:
                break;
        }
    }
    /** @override */
    get itemTypes() {
        return this._implementation.itemTypes;
    }
    // /** @override */
    // prepareData(): void {
    //     return this._implementation.prepareData();
    // }
    //
    // /** @override */
    // prepareEmbeddedEntities(): void {
    //     return this._implementation.prepareEmbeddedEntities();
    // }
    /** @override */
    get img() {
        return this._implementation.img;
    }
    /** @override */
    get isPC() {
        return this._implementation.isPC;
    }
    /** @override */
    get isToken() {
        return this._implementation.isToken;
    }
    /** @override */
    getActiveTokens(linked) {
        return this._implementation.getActiveTokens(linked);
    }
    /** @override */
    getTokenImages() {
        return this._implementation.getTokenImages();
    }
    /** @override */
    modifyTokenAttributes(attribute, value, isDelta, isBar) {
        return this._implementation.modifyTokenAttributes(attribute, value, isDelta, isBar);
    }
    /** @override */
    update(data, options) {
        return this._implementation.update(data, options);
    }
    /** @override */
    delete(options) {
        return this._implementation.delete(options);
    }
    /** @override */
    createEmbeddedEntity(embeddedName, createData, options) {
        return this._implementation.createEmbeddedEntity(embeddedName, createData, options);
    }
    /** @override */
    updateEmbeddedEntity(embeddedName, updateData, options) {
        return this._implementation.updateEmbeddedEntity(embeddedName, updateData, options);
    }
    /** @override */
    deleteEmbeddedEntity(embeddedName, childId, options) {
        return this._implementation.deleteEmbeddedEntity(embeddedName, childId, options);
    }
    /** @override */
    importItemFromCollection(collection, entryId) {
        return this._implementation.importItemFromCollection(collection, entryId);
    }
    /** @override */
    getOwnedItem(itemId) {
        return this._implementation.getOwnedItem(itemId);
    }
    /** @override */
    createOwnedItem(itemData, options) {
        return this._implementation.createOwnedItem(itemData, options);
    }
    /** @override */
    updateOwnedItem(itemData, options) {
        return this._implementation.updateOwnedItem(itemData, options);
    }
    /** @override */
    updateManyOwnedItems(data, options) {
        return this._implementation.updateManyOwnedItems(data, options);
    }
    /** @override */
    deleteOwnedItem(itemId, options) {
        return this._implementation.deleteOwnedItem(itemId, options);
    }
}
exports.default = SR5ActorProxy;
},{"./SR5Grunt":6,"./SR5Runner":7,"./types/ActorType":8}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseActor extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(data, options);
        this.data = data;
        this.proxy = proxy;
        console.warn(`Created a new ${this.constructor.name}`);
        console.warn(this);
    }
    prepareData() {
        super.prepareData();
        console.warn(this.data);
        console.warn(`${this.constructor.name} prepareData`);
    }
    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
        console.warn(this.data);
        console.warn(`${this.constructor.name} prepareEmbeddedEntities`);
    }
}
exports.default = SR5BaseActor;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
class SR5Grunt extends SR5BaseActor_1.default {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
    prepareData() {
        super.prepareData();
        this.data.data.professionalRating = this.name.length;
    }
}
exports.default = SR5Grunt;
},{"./SR5BaseActor":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
class SR5Runner extends SR5BaseActor_1.default {
}
exports.default = SR5Runner;
},{"./SR5BaseActor":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorType = void 0;
var ActorType;
(function (ActorType) {
    ActorType["Runner"] = "Runner";
    ActorType["Grunt"] = "Grunt";
    ActorType["Spirit"] = "Spirit";
    ActorType["Sprite"] = "Sprite";
    ActorType["Vehicle"] = "Vehicle";
    ActorType["Host"] = "Host";
    ActorType["IC"] = "IC";
})(ActorType = exports.ActorType || (exports.ActorType = {}));
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItem extends Item {
}
exports.default = SR5BaseItem;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Setup_1 = require("./Setup");
Setup_1.default.run();
},{"./Setup":2}]},{},[10])

//# sourceMappingURL=bundle.js.map
