import { expect, assert } from 'chai';
import { getEmbeddedItems, getName, loadTestData } from './util';
import { ModifierBridge } from '../data-bridge/ModifierBridge';
import { KeyedSource } from '../data-source/KeyedSource';

describe('Data', () => {
    const actors: any[] = loadTestData();

    it('It should be an array', () => {
        expect(actors).to.be.a('array');
    });
    it('It should have at least 1 element', () => {
        expect(actors.length).to.be.greaterThan(0);
    });

    for (let i = 0; i < actors.length; i++) {
        // LuckyGirl only
        if (i !== 21) continue;
        const actor = actors[i];

        describe(`${getName(actor)} (${i})`, () => {
            it('They should have at least one item with embeddedItems', () => {
                const items: any[] = actor['items'];
                const item = items.find((i) => getEmbeddedItems(i) !== null);
                expect(item).to.not.equal(undefined);
            });

            const rootItem = actor['items'].find((i) => getEmbeddedItems(i) !== null);
            it('It should be named "Cyberimplanted HK Urban Combat"', () => {
                expect(rootItem['name']).to.equal('Cyberimplanted HK Urban Combat');
            });

            const embeds = getEmbeddedItems(rootItem);
            it('The bridge should report ap sum of -10 and damage sum of 0', () => {
                const key1 = 'ap';
                const key2 = 'damage';

                const bridge = new ModifierBridge();
                const objects = embeds.map((j) => j.data);

                bridge.addSource(key1, new KeyedSource(objects, key1));
                bridge.addSource(key2, new KeyedSource(objects, key2));

                expect(bridge.getValue(key1)).to.equal(-10);
                expect(bridge.getValue(key2)).to.equal(0);
                expect(bridge.getValue('hi')).to.equal(0);
            });
        });
    }
});
