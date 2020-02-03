 
 import { Page, ElementHandle } from 'puppeteer';

 export default class PuppeteerSet {
    page: Page;

    constructor(page) {
        this.page = page;
    }

    public async addScriptTpPage(text: string){
        await this.page.addScriptTag({path: text});
    }

    public async wait(count: number){
        await this.page.waitFor(count);
    }

    public async loadPage(URL: string, milliseconds ?: number){
        await this.page.goto(URL, {
            waitUntil: ['load'],
        });
        if (milliseconds) {
            this.page.waitFor(milliseconds);
        }
       
    }


    public async enter(element: Promise<ElementHandle<Element>>,  text: string){
         const el = await element;
         el.type(text)
    }

    public async click(page: Page, selector: string){
        try {
            await page.waitForSelector(selector);
            await page.focus(selector);
            await page.click(selector);
        } catch (error) {
           throw new Error (`Could not click on selector ${selector}`)
        }
    }

    public async write(page: Page, selector: string, text: string){
        try {
            await page.waitForSelector(selector);
            await page.focus(selector);
            await page.type(selector, text);
        } catch (error) {
            throw new Error (`Could  not type in the ${selector}`)
        }

    }





}