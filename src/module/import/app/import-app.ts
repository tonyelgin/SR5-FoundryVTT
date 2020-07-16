import { SR5Actor } from '../../actor/SR5Actor';
import supports = CSS.supports;
import SR5ActorData = Shadowrun.SR5ActorData;

export class ImportApp extends Application {
    static get defaultOptions() {
        const data = super.defaultOptions;
        // TODO: I18n.
        data.title = 'Chummer Actor Import';
        data.template = 'systems/shadowrun5e/dist/templates/import/import-app.html';
        data.width = '600';
        data.height = 'auto';
        return data;
    }

    protected _actor: SR5Actor;

    constructor(actor: SR5Actor, options?: ApplicationOptions) {
        super(options);

        this._actor = actor;
    }

    protected activateListeners(html: JQuery<HTMLElement> | HTMLElement): void {
        super.activateListeners(html);

        $(html).find('#submit').on('click', this.submit.bind(this));
    }

    public submit() {
        // TODO: I18n.
        // let dialog = new Dialog({
        //     title: 'Confirm Import',
        //     content: "<h2 style='color: red'>THIS WILL OVERWRITE ANY CHANGES YOU HAVE MADE SINCE YOUR LAST IMPORT.</h2>",
        //     buttons: {
        //         import: {
        //             icon: '<i class="fas fa-check"></i>',
        //             label: "I'm sure!",
        //             callback: () => {
        //                 this.import($(this.element).find('#source').text());
        //             },
        //         },
        //         cancel: {
        //             icon: '<i class="fas fa-times"></i>',
        //             label: 'Wait a second...',
        //         },
        //     },
        //     default: 'cancel',
        // }).render(true);

        // TODO: Enable confirmation after development.
        this.import($(this.element).find('#source').text());
    }

    public import(json: string) {
        console.warn(JSON.parse(json));

        const updateData: SR5ActorData = this._actor.data as SR5ActorData;

        console.warn(updateData);
    }
}
