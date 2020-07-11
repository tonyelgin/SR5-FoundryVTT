import KeyValuePair = Shadowrun.KeyValuePair;
import ModList = Shadowrun.ModList;
import { SR5Roll } from './SR5Roll';

export type SR5RollDialogOptions = {
    parts?: ModList<number>;
    extended?: boolean;
    limit?: number;
};

export class SR5RollDialog extends Application {
    // handle extended tests
    protected m_extended: boolean = false;
    protected m_parts: KeyValuePair[] = [];
    protected m_limit: number = 0;

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

        $(html).find('.roll-test').on('click', this.rollTest.bind(this));
    }

    getRoll(): SR5Roll {
        const total = this.m_parts.reverse().reduce((total, current) => {
            return total + current.value;
        }, 0);
        return new SR5Roll(total, this.m_limit);
    }

    async rollTest(event) {
        event.preventDefault();
        const roll = this.getRoll();
        await roll.toMessage({
            header: {
                name: 'Test',
                img: '',
            },
            testName: 'Test',
        });
        await this.close();
    }

    get template(): string {
        return 'systems/shadowrun5e/templates/rolls/roll-dialog.html';
    }
}
