import { expect } from 'chai';
import NavigationMenu from '../pages/NavigationMenu';
import launchPuppeteer from '../utils/launchPuppeteer';

require('it-each')();
require('it-each')({ testPerIteration: true });

// Valid keys found here https://w3c.github.io/webdriver/#keyboard-actions.
const keys = ['F5', 'a', '1', 'b', 'Alt', 'Shift'];

describe('Key presses test', () => {
    let browser;
    let page;
    let navMenu;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        navMenu = new NavigationMenu(page);
    });

    after(async () => {
        await browser.close();
    });

    // @ts-ignore: Property 'each' does not exist on type 'ITestDefinition'.
    // it-each does not have a typing file as of July 2018.
    it.each(keys, 'Press %s key, scrape result', ['element'], async (key, next) => {
        const keyPressesPage = await navMenu.loadKeyPressesPage();
        await keyPressesPage.pressKey(key);
        const res = await keyPressesPage.getResultText();
        expect(res.indexOf(key.toUpperCase())).to.be.above(-1);
        next();
    });
});
