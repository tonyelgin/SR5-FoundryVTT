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
    private m_extended: boolean = false;
    private m_parts: KeyValuePair[] = [];
    private m_limit: number = 0;
    private m_situational: number = 0;

    get extended() {
        return this.m_extended;
    }

    get limit(): number {
        return this.m_limit;
    }

    get parts(): Shadowrun.KeyValuePair[] {
        return this.m_parts;
    }

    get situational(): number {
        return this.m_situational;
    }

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
        data.enableExtended = true;
        data.extended = this.m_extended;
        data.parts = this.m_parts;
        data.limit = this.m_limit;
        data.dicePool = this.count;
        if (this.situational) data.situational = this.situational;
        return data;
    }

    constructor(options?: SR5RollDialogOptions) {
        super();
        // add parts from options
        if (options?.parts) {
            // map ModList to new config method
            this.m_parts = Object.entries(options.parts).map(([key, value]) => {
                return {
                    key,
                    value,
                };
            });
        }

        // add extended from options
        if (options?.extended) {
            this.m_extended = options.extended;
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
                this.m_extended = event.currentTarget.checked;
                this.render();
            });

        $(html)
            .find('[name="situational"]')
            .on('change', (event: any) => {
                const value = event.currentTarget.value;
                const evaluated = eval(value);
                const num = Number(evaluated);
                if (num) {
                    this.m_situational = num;
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
                base: this.m_limit,
                value: this.m_limit,
                label: 'SR5.Limit',
            },
        };
    }

    incrementExtended() {
        if (this.hasPartKey('SR5.ExtendedTest')) {
            const extendedPart = this.m_parts.find((part) => part.key === 'SR5.ExtendedTest') ?? { key: 'SR5.ExtendedTest', value: 0 };
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
        if (this.m_extended) {
            this.incrementExtended();
        } else {
            await this.close();
        }
    }

    hasPartKey(key: string): boolean {
        return this.m_parts.reduce((running, current) => running || current.key === key, false);
    }

    addPart(key: string, value: number): void {
        this.m_parts.push({
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
        const index = this.m_parts.findIndex((part) => part.key === key);
        if (index >= 0) this.m_parts[index].value = value;
        this.render();
    }

    removePart(key: string) {
        this.m_parts = this.parts.filter((p) => p.key !== key);
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
