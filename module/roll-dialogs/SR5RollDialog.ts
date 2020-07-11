import KeyValuePair = Shadowrun.KeyValuePair;
import ModList = Shadowrun.ModList;
import { SR5Roll } from '../overhaul/SR5Roll';
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

    get extended() {
        return this.m_extended;
    }

    get limit(): number {
        return this.m_limit;
    }

    get parts(): Shadowrun.KeyValuePair[] {
        return this.m_parts;
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
        data.enableExtendedOption = true;
        data.extended = this.m_extended;
        data.parts = this.m_parts;
        data.limit = this.m_limit;
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
            .on('change', (event) => console.log(event));

        $(html)
            .find('[name="wounds"]')
            .on('change', (event) => console.log(event));

        $(html).find('[name="roll-test"]').on('click', this.rollTest.bind(this));
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
            parts: this.m_parts,
            testName: 'SR5.Roll',
        };
    }

    async rollTest(event) {
        console.log(event);
        console.log(this.count);
        event.preventDefault();
        const roll = this.getRoll();
        await roll.toMessage(this.getRollTemplateData());
        await this.close();
    }

    addPart(key: string, value: number): void {
        this.m_parts.push({
            key,
            value,
        });
    }

    get template(): string {
        return 'systems/shadowrun5e/templates/rolls/roll-dialog.html';
    }
}
