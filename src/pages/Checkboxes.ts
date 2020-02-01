import BasePage from './BasePage';
import { ElementHandle } from 'puppeteer';

const selectors = require('../selectors/checkboxes.json');
const presenceLocators = require('../selectors/screenPresenceLocators.json');

export default class Checkboxes extends BasePage{
    private checkBoxSelectors:any;
    private presenceLocators:any;

    constructor(page) {
        super(page);
        this.checkBoxSelectors = selectors;
        this.presenceLocators = presenceLocators;
    }

    public get checkboxes() : Promise<Array<ElementHandle>> {
        return this.page.$$(this.checkBoxSelectors.checkboxes);
    }

    public checkboxOne() : Promise<ElementHandle> {
        return this.checkboxes.then(e => e[0]);
    }

    public checkboxTwo() : Promise<ElementHandle> {
        return this.checkboxes.then(e => e[1]);
    }
}
