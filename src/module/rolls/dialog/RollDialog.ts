import { DialogField } from '../field/base/DialogField';
import { SR5Actor } from '../../actor/SR5Actor';

export type SR5RollDialogOptions = ApplicationOptions;

export type RollData = {
    [key: string]: number | boolean;
};

export abstract class RollDialog extends Application {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.baseApplication = 'SR5RollDialog';
        options.classes = ['sr5', 'roll-dialog'];
        options.width = 400;
        options.height = 'auto';

        // TODO: I18n
        options.title = 'Simple Roll';
        return options;
    }

    /**
     * Path to the template used for the dialog application.
     */
    public get template(): string {
        return 'systems/shadowrun5e/dist/templates/roll/dialog/basic-roll.html';
    }

    protected readonly _fields: DialogField<any>[];
    protected readonly _actor: SR5Actor | undefined;

    protected constructor(actor?: SR5Actor, options?: SR5RollDialogOptions) {
        super(options);

        this._fields = [];
        this._actor = actor;
    }

    protected activateListeners(html: JQuery<HTMLElement> | HTMLElement): void {
        super.activateListeners(html);

        const form = $(this.element).find('form');
        for (const field of this._fields) {
            form.prepend(field);
        }

        $(html).find('#roll').on('click', this.onRollClicked.bind(this));
    }

    protected onRollClicked(event: Event) {
        event.preventDefault();

        let data: RollData = {};
        for (const field of this._fields) {
            field.collect(this._actor, data);
        }

        console.warn('Data-Post-Collection');
        console.warn(data);
        // TODO: Roll the dice.
    }
}
