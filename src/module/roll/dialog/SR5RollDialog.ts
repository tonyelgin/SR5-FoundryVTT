export class SR5RollDialog extends Application {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.baseApplication = 'SR5RollDialog';

        options.classes = ['sr5', 'roll-dialog'];

        options.width = 400;
        options.height = 'auto';

        return options;
    }
}
