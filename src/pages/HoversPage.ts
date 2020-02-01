import BasePage from './BasePage';
import { ElementHandle } from 'puppeteer';

const hoverSelectors = require('../selectors/hoversPage.json');
const presenceLocators = require('../selectors/screenPresenceLocators.json');
const config = require('../config/config.json');

const { baseURL } = config;

export default class HoversPage extends BasePage {
    private hoverSelectors:any;
    private presenceLocators:any;
    constructor(page) {
        super(page);
        this.hoverSelectors = hoverSelectors;
        this.presenceLocators = presenceLocators;
    }

    get captionLinks() : Promise<Array<ElementHandle>> {
        return this.page.$$(this.hoverSelectors.captionsLinks);
    }

    get captionUsernames() : Promise<Array<ElementHandle>> {
        return this.page.$$(this.hoverSelectors.captionsUsername);
    }

    get figures() : Promise<Array<ElementHandle>> {
        return this.page.$$(this.hoverSelectors.figureLocator);
    }

    async hoverOverImage(position) : Promise<void> {
        const figure = await this.figures.then(e => e[position]);
        /*
        Per https://github.com/GoogleChrome/puppeteer/issues/1168, "page.click() scroll to the element
        before performing their action". See ebidel comment from Oct 26, 2017 for more info.
        Works with this method because clicking the image does not load any new page/window.
        TODO: Find a better way.
        */
        await figure.click();
    }

    async returnToHoversPage() : Promise<void> {
        const url = `${baseURL}${config.hovers}`;
        await this.page.goto(url);
    }

    async clickViewProfile(position) : Promise<void> {
        const captionLink = await this.captionLinks.then(e => e[position]);
        await captionLink.click();
    }

    async getUserName(position) : Promise<string> {
        // The below returns undefined. In order to get the you have to pass the ElementHandle object to page.evaluate.
        // return this.captionUsernames.then(e => e[position].textContent.trim().replace('name: ', ''));

        // Returns an array of element handles
        const captionUsernames = await this.captionUsernames;

        // To get text use page.evaluate with one element from the captionUsernames array.
        return this.page.evaluate(e => e.textContent.trim().replace('name: ', ''), captionUsernames[position]);
    }
}
