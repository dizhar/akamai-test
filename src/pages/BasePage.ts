
const baseSelectors = require('../selectors/basePage.json');
export default class BasePage{
    public page: any;
    protected baseSelectors: any;

    constructor(page) {
        this.page = page;
        this.baseSelectors = baseSelectors;
    }

    public async getPageHeader() : Promise<String> {
        // The header is either an h2 or h3 element.
        try {
            return await this.page.$eval(this.baseSelectors.level2Header, e => e.textContent.trim());
        } catch (err) {
            return await this.page.$eval(this.baseSelectors.level3Header, e => e.textContent.trim());
        }
    }

    public getPageSubHeader() : Promise<String> {
        return this.page.$eval(this.baseSelectors.pageSubHeaderLocator, e => e.textContent.trim());
    }

    public getFooterText() : Promise<String> {
        return this.page.$eval(this.baseSelectors.footerTextLocator, e => e.textContent.trim());
    }

    public getPageMessage() : Promise<String> {
        const selector = this.baseSelectors.pageMessageLocator;
        return this.page.$eval(selector, e => e.innerText.replace(/[^a-zA-Z0-9! ]+/g, '').trim());
    }

    public async closePageMessage() : Promise<void> {
        await this.page.click(this.baseSelectors.closeButton);
        await this.page.waitForSelector(this.baseSelectors.closeButton, { hidden: true });
    }
}
