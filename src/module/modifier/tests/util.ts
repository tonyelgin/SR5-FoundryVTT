const fs = require('fs');

export function loadTestData() {
    return JSON.parse(fs.readFileSync('testdata.json').toString());
}

export function hasFlags(object: any) {
    return object.hasOwnProperty('flags') && object['flags'].hasOwnProperty('shadowrun5e');
}

export function hasEmbeddedItems(object: any) {
    return hasFlags(object) && object['flags']['shadowrun5e'].hasOwnProperty('embeddedItems');
}

export function getEmbeddedItems(object: any) {
    if (!hasEmbeddedItems(object)) return null;
    return object['flags']['shadowrun5e']['embeddedItems'];
}

export function getName(object: any) {
    return object['name'];
}
