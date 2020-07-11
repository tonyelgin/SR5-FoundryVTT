import { SR5RollDialog, SR5RollDialogOptions } from './SR5RollDialog';
import { SR5Actor } from '../actor/SR5Actor';
import { SR5Roll } from '../roll/SR5Roll';
import { TemplateData } from '../chat';

export type SR5ActorRollDialogOptions = SR5RollDialogOptions & {
    actor: SR5Actor;
};

export class SR5ActorRollDialog extends SR5RollDialog {
    private m_actor: SR5Actor;
    private m_pushTheLimit: boolean = false;

    get actor() {
        return this.m_actor;
    }

    get pushTheLimit() {
        return this.m_pushTheLimit;
    }

    constructor(options: SR5ActorRollDialogOptions) {
        super(options);
        this.m_actor = options.actor;
    }

    getData(options?: any): any {
        const data = super.getData(options);
        data.actor = this.m_actor;
        data.enableEdgeOption = true;
        data.edge = this.m_actor.getEdge();
        return data;
    }

    getRoll(): SR5Roll {
        return new SR5Roll(this.count, this.limit, this.pushTheLimit);
    }

    getTestName(): string {
        return 'Unknown Test';
    }

    getRollTemplateData(): TemplateData {
        const templateData = super.getRollTemplateData();
        templateData.header = {
            name: this.actor.name,
            img: this.actor.img,
        };
        templateData.testName = this.getTestName();
        templateData.actor = this.actor;
        return templateData;
    }

    activateListeners(html: JQuery | HTMLElement) {
        super.activateListeners(html);
        $(html)
            .find('[name="push-the-limit"]')
            .on('click', (event) => {
                this.m_pushTheLimit = true;
                // add push the limit to parts list
                this.addPart('SR5.PushTheLimit', this.actor.getEdge().max);
                return this.rollTest(event);
            });
    }
}
