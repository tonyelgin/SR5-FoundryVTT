import KeyValuePair = Shadowrun.KeyValuePair;
import ModList = Shadowrun.ModList;
import { SR5Roll } from '../roll/SR5Roll';
import { TemplateData } from '../chat';

export type SR5RollDialogOptions = {
    parts?: ModList<number>;
    extended?: boolean;
    limit?: number;
};

export class SR5RollDialog extends Application {
    // handle extended tests
    protected extended: boolean = false;
    protected parts: KeyValuePair[] = [];
    protected limit: number = 0;
    protected situational: number = 0;

    get count(): number {
        return this.parts.reduce((total, current) => {
            return total + current.value;
        }, 0);
    }

    /**
     * @Override
     * @param options
     */
    getData(options?: any): any {
        const data = super.getData(options);
        data.enableExtendedOption = true;
        data.extended = this.extended;
        data.parts = this.parts;
        data.limit = this.limit;
        data.dicePool = this.count;
        if (this.situational) data.situational = this.situational;

        data.config = CONFIG.SR5;
        return data;
    }

    constructor(options?: SR5RollDialogOptions) {
        super();
        // add parts from options
        if (options?.parts) {
            // map ModList to new config method
            this.parts = Object.entries(options.parts).map(([key, value]) => {
                return {
                    key,
                    value,
                };
            });
        }

        // add extended from options
        if (options?.extended) {
            this.extended = options.extended;
        }
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
    activateListeners(html: JQuery | HTMLElement) {
        super.activateListeners(html);
        $(html)
            .find('[name=extended]')
            .on('change', (event: any) => {
                this.extended = event.currentTarget.checked;
                this.render();
            });

        $(html)
            .find('[name="situational"]')
            .on('change', (event: any) => {
                const value = event.currentTarget.value;
                const evaluated = eval(value);
                const num = Number(evaluated);
                if (num) {
                    this.situational = num;
                    this.addUniquePart('SR5.SituationalModifier', num);
                }
                this.render();
            });
        $(html).find('[name="test-roll"]').on('click', this.rollTest.bind(this));
    }

    getRoll(): SR5Roll {
        return new SR5Roll(this.count, this.limit);
    }

    getRollTemplateData(): TemplateData {
        return {
            header: {
                name: 'SR5.Roll',
                img: '',
            },
            parts: this.parts,
            testName: 'SR5.Roll',
            limit: {
                base: this.limit,
                value: this.limit,
                label: 'SR5.Limit',
            },
        };
    }

    incrementExtended() {
        if (this.hasPartKey('SR5.ExtendedTest')) {
            const extendedPart = this.parts.find((part) => part.key === 'SR5.ExtendedTest') ?? { key: 'SR5.ExtendedTest', value: 0 };
            extendedPart.value -= 1;
            this.updatePart('SR5.ExtendedTest', extendedPart.value);
        } else {
            this.addPart('SR5.ExtendedTest', -1);
        }
    }

    async rollTest(event) {
        event.preventDefault();
        const roll = this.getRoll();
        const templateData = this.getRollTemplateData();
        await roll.toMessage(templateData);
        // if an extended test, don't close and keep around the -1 modifiers
        if (this.extended) {
            this.incrementExtended();
        } else {
            await this.close();
        }
    }

    hasPartKey(key: string): boolean {
        return this.parts.reduce((running, current) => running || current.key === key, false);
    }

    addPart(key: string, value: number): void {
        this.parts.push({
            key,
            value,
        });
        this.render();
    }

    addUniquePart(key: string, value: number): void {
        if (this.hasPartKey(key)) {
            this.updatePart(key, value);
        } else {
            this.addPart(key, value);
        }
    }

    updatePart(key: string, value: number) {
        const index = this.parts.findIndex((part) => part.key === key);
        if (index >= 0) this.parts[index].value = value;
        this.render();
    }

    removePart(key: string) {
        this.parts = this.parts.filter((p) => p.key !== key);
        this.render();
    }

    togglePart(key: string, value: number) {
        if (this.hasPartKey(key)) {
            this.removePart(key);
        } else {
            this.addPart(key, value);
        }
    }

    get template(): string {
        return 'systems/shadowrun5e/dist/templates/rolls/roll-dialog.html';
    }
}
