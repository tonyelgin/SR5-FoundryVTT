/**
 * An error that occurs during the rolling of dice.
 */
import { createChatData, TemplateData } from '../chat';

export class DiceError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/**
 * A six-sided Shadowrun die.
 */
export class SR5Die extends Die {
    constructor() {
        super(6);
    }
}

export class SR5Roll extends Roll {
    /**
     * Build a formula for a Shadowrun dice roll.
     * Assumes roll will be valid (e.g. you pass a positive count).
     * @param count The number of dice to roll.
     * @param limit A limit, if any. Negative for no limit.
     * @param explode If the dice should explode on sixes.
     */
    public static ToFormula(count: number, limit: number = -1, explode: boolean = false): string {
        let formula = `${count}d6`;
        if (explode) {
            formula += 'x6';
        }
        if (limit > 0) {
            formula += `kh${limit}`;
        }

        return `${formula}cs>=5`;
    }

    /**
     * Helper method to construct a roll, roll the dice, then return the results.
     * @param count The number of dice to roll.
     * @param limit The limit of the roll. Pass a negative number for no limit. No limit by default.
     * @param explode If the dice should explode or not, defaults to false.
     */
    public static Roll(count: number, limit: number = -1, explode: boolean = false): SR5Roll {
        if (count <= 0) {
            //TODO: I18n.
            throw new DiceError('Must request least one die be rolled.');
        }

        return new SR5Roll(count, limit, explode).roll();
    }

    /**
     * The number of dice in this roll.
     */
    protected _count: number;

    /**
     * The limit of this roll
     */
    protected _limit: number;

    /**
     * If the roll should explode or not
     */
    protected _explode: boolean;

    public templateData: TemplateData | undefined;

    constructor(count: number, limit: number = -1, explode: boolean = false) {
        if (count <= 0) {
            throw new DiceError('Must request least one die be rolled.');
        }

        super(SR5Roll.ToFormula(count, limit, explode));
        this._count = count;
        this._limit = limit;
        this._explode = explode;
    }

    roll(): SR5Roll {
        const result = super.roll();
        // This *works* but something bugs me about it...
        // I have a vague nagging in the back of my head that it may leak.
        Object.assign(this, result);
        return this;
    }

    reroll(): SR5Roll {
        return new SR5Roll(this._count, this._limit, this._explode).roll();
    }

    // Override type...
    get dice(): SR5Die[] {
        return super.dice;
    }

    /**
     * The number of hits rolled.
     */
    get hits(): number {
        // Could also return undefined, null, 0, etc...
        if (!this._rolled) return Number.NaN;
        return this.total;
    }

    /**
     * The number of glitches rolled.
     */
    get glitches(): number {
        // Could also return undefined, null, 0, etc...
        if (!this._rolled) return Number.NaN;
        return this.dice[0].rolls.filter((die) => die.roll === 1).length;
    }

    /**
     * Is this roll a regular (non-critical) glitch?
     */
    get isGlitch(): boolean {
        return this.glitches > this.dice.length / 2;
    }

    /**
     * Is this roll a critical glitch?
     */
    get isCriticalGlitch(): boolean {
        return this.isGlitch && this.hits === 0;
    }

    // Override to define how it looks, what template renders, etc...
    async toMessage(templateData: TemplateData, { rollMode, create }: { rollMode?: string; create?: boolean } = { create: true }): Promise<ChatMessage | any> {
        // if we haven't rolled, roll
        if (!this._rolled) this.roll();
        // check game settings and call super function if they want the default roll cards
        if (game.settings.get('shadowrun5e', 'displayDefaultRollCard')) {
            await super.toMessage(templateData, { rollMode, create });
        }

        // create custom roll template
        this.templateData = templateData;
        if (create) {
            const chatData = await createChatData(templateData, { roll: this, rollMode });
            return ChatMessage.create(chatData, { displaySheet: false });
        }

        return undefined;
    }

    toJSON(): any {
        const data = super.toJSON();
        // Required for Dice-So-Nice support
        data.class = 'Roll';
        return data;
    }

    // Override to define how it looks, what template renders, etc...
    getTooltip(): Promise<JQuery | HTMLElement> {
        return super.getTooltip();
    }

    // Override to define how it looks, what template renders, etc...
    render(chatOptions?: object): Promise<JQuery | HTMLElement> {
        return super.render(chatOptions);
    }
}
