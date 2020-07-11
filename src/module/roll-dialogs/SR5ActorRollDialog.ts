import { SR5RollDialog, SR5RollDialogOptions } from './SR5RollDialog';
import { SR5Actor } from '../actor/SR5Actor';
import { SR5Roll } from '../roll/SR5Roll';
import { TemplateData } from '../chat';

export type SR5ActorRollDialogOptions = SR5RollDialogOptions & {
    actor: SR5Actor;
    wound?: boolean
};

export class SR5ActorRollDialog extends SR5RollDialog {
    private readonly m_actor: SR5Actor;
    private m_pushTheLimit: boolean = false;
    private m_wound: boolean = true;

    get actor() {
        return this.m_actor;
    }

    get pushTheLimit() {
        return this.m_pushTheLimit;
    }

    get wound() {
        return this.m_wound;
    }

    constructor(options: SR5ActorRollDialogOptions) {
        super(options);
        this.m_actor = options.actor;
        this.m_wound = options.wound ?? true;
        if (this.wound && this.m_actor.getWoundModifier() !== 0) {
            this.addUniquePart('SR5.WoundModifier', this.m_actor.getWoundModifier());
        }
    }

    getData(options?: any): any {
        const data = super.getData(options);
        // actor
        data.actor = this.actor;

        // edge
        data.enableEdge = true;
        data.edge = this.actor.getEdge();
        data.enablePushTheLimit = true;
        data.pushTheLimit = this.pushTheLimit;

        // wounds
        data.enableWound = true;
        data.woundValue = this.actor.getWoundModifier();
        data.wound = this.wound;

        return data;
    }

    getRoll(): SR5Roll {
        // add push the limit to parts list
        if (this.m_pushTheLimit && !this.hasPartKey('SR5.PushTheLimit')) {
            this.addPart('SR5.PushTheLimit', this.actor.getEdge().max);
        }

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
            .on('change', (event: any) => {
                this.m_pushTheLimit = event.currentTarget.checked;
                if (this.m_pushTheLimit) {
                    this.addUniquePart('SR5.PushTheLimit', this.actor.getEdge().max);
                } else {
                    this.removePart('SR5.PushTheLimit');
                }
            });
        $(html)
            .find('[name="wound"]')
            .on('change', (event: any) => {
                this.m_wound = event.currentTarget.checked;
                if (this.m_wound) {
                    this.addUniquePart('SR5.WoundModifier', this.actor.getWoundModifier());
                } else {
                    this.removePart('SR5.WoundModifier');
                }
            });
    }
}
