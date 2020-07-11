var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { SR5Roll } from '../overhaul/SR5Roll';
export class SR5RollDialog extends Application {
    constructor(options) {
        super();
        // handle extended tests
        this.m_extended = false;
        this.m_parts = [];
        this.m_limit = 0;
        // add parts from options
        if (options === null || options === void 0 ? void 0 : options.parts) {
            // map ModList to new config method
            this.m_parts = Object.entries(options.parts).map(([key, value]) => {
                return {
                    key,
                    value,
                };
            });
        }
        // add extended from options
        if (options === null || options === void 0 ? void 0 : options.extended) {
            this.m_extended = options.extended;
        }
    }
    get extended() {
        return this.m_extended;
    }
    get limit() {
        return this.m_limit;
    }
    get parts() {
        return this.m_parts;
    }
    get count() {
        return this.parts.reduce((total, current) => {
            return total + current.value;
        }, 0);
    }
    /**
     * @Override
     * @param options
     */
    getData(options) {
        const data = super.getData(options);
        data.enableExtendedOption = true;
        data.extended = this.m_extended;
        data.parts = this.m_parts;
        data.limit = this.m_limit;
        return data;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            baseApplication: 'SR5RollDialog',
            width: 400,
            height: 300,
            minimizable: false,
            resizable: false,
            classes: ['sr5', 'roll-dialog'],
        });
    }
    /**
     * @Override
     * @param html
     */
    activateListeners(html) {
        super.activateListeners(html);
        $(html)
            .find('[name=extended]')
            .on('change', (event) => console.log(event));
        $(html)
            .find('[name="wounds"]')
            .on('change', (event) => console.log(event));
        $(html).find('[name="roll-test"]').on('click', this.rollTest.bind(this));
    }
    getRoll() {
        return new SR5Roll(this.count, this.limit);
    }
    getRollTemplateData() {
        return {
            header: {
                name: 'SR5.Roll',
                img: '',
            },
            parts: this.m_parts,
            testName: 'SR5.Roll',
        };
    }
    rollTest(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(event);
            console.log(this.count);
            event.preventDefault();
            const roll = this.getRoll();
            yield roll.toMessage(this.getRollTemplateData());
            yield this.close();
        });
    }
    addPart(key, value) {
        this.m_parts.push({
            key,
            value,
        });
    }
    get template() {
        return 'systems/shadowrun5e/templates/rolls/roll-dialog.html';
    }
}
