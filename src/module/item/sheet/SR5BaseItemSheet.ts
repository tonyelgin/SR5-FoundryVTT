export default class SR5BaseItemSheet extends ItemSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">

    getData(): ItemSheetData {
        const data = super.getData();

        console.warn(`SR5BaseItemSheet data for ${this.item.name}`);
        console.warn(data);

        return data;
    }

    // </editor-fold>
}
