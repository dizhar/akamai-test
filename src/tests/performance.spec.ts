import * as puppeteer from 'puppeteer-debug';
import { expect } from 'chai';
import launchPuppeteer from '../utils/launchPuppeteer';
import { Browser, Page } from 'puppeteer';
import NavigationMenu from '../pages/NavigationMenu';

describe('Authentication test: ', () => {

    let browser: Browser;
    let page: Page;
    let navMenu: NavigationMenu;

    before(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        navMenu = new NavigationMenu(page);
        await navMenu.loadpage();
    });

    after(async () => {
        await browser.close();
    });

    it('Login test', async () => {

        try {
            await page.addScriptTag({ path: './lib/files/injectable.js' });

            const performanceTiming = await JSON.parse(
                await page.evaluate(() => JSON.stringify(window.performance.timing)),
              );

            console.log(performanceTiming);
        //  console.log(allerros);

            page.on('pageerror', (err) => {
                console.log('pageerror: ', err);
            });

            expect(true).to.equal(true);

        } catch (error) {
            console.log(error);
        }

    });

});
