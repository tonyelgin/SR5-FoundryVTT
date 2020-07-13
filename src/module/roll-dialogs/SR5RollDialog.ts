import ModList = Shadowrun.ModList;
import { SR5Roll } from '../roll/SR5Roll';
import { TemplateData } from '../chat';
import { SR5RollParts } from '../roll/SR5RollParts';

export type SR5RollDialogOptions = {
    parts?: ModList<number>;
    extended?: boolean;
    limit?: number;
};

export class SR5RollDialog extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            baseApplication: 'SR5RollDialog',
            width: 400,
            height: 'auto',
            minimizable: false,
            resizable: false,
            classes: ['sr5', 'roll-dialog'],
        });
    }

    protected readonly parts: SR5RollParts;

    protected extended: boolean = false;

    protected limit: number = 0;
    protected situational: number = 0;

    constructor(options?: SR5RollDialogOptions) {
        super();

        // add parts from options
        if (options?.parts) {
            // map ModList to new config method
            this.parts = new SR5RollParts(duplicate(options.parts));
        } else {
            this.parts = new SR5RollParts();
        }

        // add extended from options
        if (options?.extended) {
            this.extended = options.extended;
        }
    }

    get template(): string {
        return 'systems/shadowrun5e/dist/templates/rolls/roll-dialog.html';
    }

    /**
     * @Override
     * @param options
     */
    getData(options?: any): any {
        const data = super.getData(options);
        data.enableExtendedOption = true;
        data.extended = this.extended;
        data.parts = this.parts.pairs();
        data.limit = this.limit;
        data.dicePool = this.parts.sum();
        if (this.situational) data.situational = this.situational;

        data.config = CONFIG.SR5;
        return data;
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
                    this.parts.set('SR5.SituationalModifier', num);
                }
                this.render();
            });
        $(html).find('[name="test-roll"]').on('click', this.rollTest.bind(this));
    }

    getRoll(): SR5Roll {
        return new SR5Roll(this.parts.sum(), this.limit);
    }

    getRollTemplateData(): TemplateData {
        return {
            header: {
                name: 'SR5.Roll',
                img: '',
            },
            parts: this.parts.pairs(),
            testName: 'SR5.Roll',
            limit: {
                base: this.limit,
                value: this.limit,
                label: 'SR5.Limit',
            },
        };
    }

    incrementExtended() {
        this.parts.increment('SR5.ExtendedTest', -1);
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
}
