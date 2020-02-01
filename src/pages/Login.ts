import BasePage from './BasePage';
import SecuredPage from './SecuredPage';
import { ElementHandle } from 'puppeteer';
const selectors = require('../selectors/login.json');
const presenceLocators = require('../selectors/screenPresenceLocators.json');

export default class Login extends BasePage {
    private loginSelectors: any;
    private presenceLocators: any;
    constructor(page) {
        super(page);
        this.loginSelectors = selectors;
        this.presenceLocators = presenceLocators;
    }

    public get username() : Promise<ElementHandle> {
        return this.page.$(this.loginSelectors.username);
    }

    public get password() : Promise<ElementHandle> {
        return this.page.$(this.loginSelectors.password);
    }

    public get submitButton() : Promise<ElementHandle> {
        return this.page.$(this.loginSelectors.loginButton);
    }

    public async enterUsername(username:string) : Promise<void> {
        const un = await this.username;
        await un.focus();
        await un.type(username);
    }

    public async enterPassword(password:string) : Promise<void> {
        const passwordElement = await this.password;
        await passwordElement.focus();
        await passwordElement.type(password);
    }

    public async submitLoginForm() : Promise<SecuredPage> {
        await this.submitButton.then(e => e.click());
        await this.page.waitForSelector(this.presenceLocators.securedPage, { visible: true });
        return new SecuredPage(this.page);
    }

    public async enterLoginInformation(username:string, password:string) : Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    public async login(username:string, password:string) : Promise<SecuredPage> {
        await this.enterLoginInformation(username, password);
        return await this.submitLoginForm();
    }

    public async loginWithIncorrectInput(username:string, password:string) : Promise<void> {
        await this.enterLoginInformation(username, password);
        await this.submitButton.then(e => e.click());
        await this.page.waitForSelector(this.baseSelectors.pageMessageLocator, { visible: true });
    }
}
