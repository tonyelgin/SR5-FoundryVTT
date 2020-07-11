import { SR5RollDialog } from './SR5RollDialog';
import { SR5Roll } from '../roll/SR5Roll';
export class SR5ActorRollDialog extends SR5RollDialog {
    constructor(options) {
        super(options);
        this.m_pushTheLimit = false;
        this.m_actor = options.actor;
    }
    get actor() {
        return this.m_actor;
    }
    get pushTheLimit() {
        return this.m_pushTheLimit;
    }
    getData(options) {
        const data = super.getData(options);
        data.actor = this.m_actor;
        data.enableEdgeOption = true;
        data.edge = this.m_actor.getEdge();
        return data;
    }
    getRoll() {
        return new SR5Roll(this.count, this.limit, this.pushTheLimit);
    }
    getTestName() {
        return 'Unknown Test';
    }
    getRollTemplateData() {
        const templateData = super.getRollTemplateData();
        templateData.header = {
            name: this.actor.name,
            img: this.actor.img,
        };
        templateData.testName = this.getTestName();
        templateData.actor = this.actor;
        return templateData;
    }
    activateListeners(html) {
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
