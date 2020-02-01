import Login from './Login';
import Checkboxes from './Checkboxes';
import HoversPage from './HoversPage';
import JavaScriptAlerts from './JavaScriptAlerts';
import KeyPresses from './KeyPresses';
import { Page } from 'puppeteer';

const config = require('../config/config.json');
const selectors = require('../selectors/navMenu.json');

const baseURL = config.baseURL;

export default class NavigationMenu {
    page: Page;
    constructor(page) {
        this.page = page;
    }

    public async  loadpage() {

        await this.page.goto(baseURL, {
            waitUntil: ['load'],
        });

        await this.page.waitFor(3000);
    }

    private async gotoPage(path) {
        await this.page.goto(`${baseURL}${path}`);
    }

    public async loadNavigationMenu() : Promise<void> {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    public loadFormAuthenticationPage() : Promise<Login> {
        return this.gotoPage(config.login).then(() => new Login(this.page));
    }

    public async getNumberOfLinks() : Promise<number> {
        /*
        Do not chain the commands togther, otherwise an empty set will be returned,
        e.g. await this.page.$$(selectors.navLinks).length returns [0]
        while the below code returns an integer greater than zero.
        */
        return await this.page.$$(selectors.navLinks).then(e => e.length);
    }

    public loadCheckboxesPage() : Promise<Checkboxes> {
        return this.gotoPage(config.checkboxes).then(() => new Checkboxes(this.page));
    }

    public loadHoversPage() : Promise<HoversPage> {
        return this.gotoPage(config.hovers).then(() => new HoversPage(this.page));
    }

    public loadJavaScriptAlertsPage() {
        return this.gotoPage(config.javaScriptAlerts).then(() => new JavaScriptAlerts(this.page));
    }

    public loadKeyPressesPage() {
        return this.gotoPage(config.keyPresses).then(() => new KeyPresses(this.page));
    }
}
