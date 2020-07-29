export default class SR5BaseItemSheet extends ItemSheet {
    // <editor-fold desc="Static Properties">

    static get defaultOptions() {
        const options = super.defaultOptions;

        options.classes?.push('sr5', 'item');

        return options;
    }

    // </editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">

    protected _onDragStart(event: DragEvent) {
        super._onDragStart(event);
    }

    getData(): ItemSheetData {
        const data = super.getData();

        return data;
    }

    // </editor-fold>
}
