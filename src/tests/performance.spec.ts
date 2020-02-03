import { expect, assert } from 'chai';
import launchPuppeteer from '../utils/launchPuppeteer';
import { Browser, Page } from 'puppeteer';
import PuppeterrGet from "../support/puppeteerGet";
import PupppeteerSet  from "../support/pupppeteerSet";
import { Helpers } from "../support/helpers";
import PuppeteerVerify from "../support/puppeteerVerify";
import selectors = require('../selectors/login.json');
import config = require('../config/config.json');
import login = require('../config/login.json');
const baseURL = config.baseURL;

describe('Authentication test: ', () => {

    let browser: Browser;
    let page: Page;
    let _puppeterrGet: PuppeterrGet;
    let _puppeteerSet: PupppeteerSet;
    let _puppeteerVerify: PuppeteerVerify;

    beforeEach(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        _puppeterrGet = new PuppeterrGet(page)
        _puppeteerSet = new PupppeteerSet(page);
        _puppeteerVerify = new PuppeteerVerify(page);
       await _puppeteerSet.loadPage(baseURL, 30000)
    });

    afterEach(async () => {
        await browser.close();
    });

     it('Should not get a page error message, when not adding the injectable.js script', async() => {
         await _puppeteerVerify.verifyPageErrors();
         await _puppeteerVerify.verifyWebPagePerformance();
    });


    it('Should get page error message, "Error: CX Internals not found...", when adding the injectable.js script', async() => {
       await  _puppeteerVerify.verifyPageErrors("Error: CX Internals not found");
       await  _puppeteerSet.addScriptTpPage("./lib/files/injectable.js");
   });

   it('Should not get a page error, when not adding the injectable.js script into the login page ', async() => {
    await  _puppeteerSet.loadPage("https://www.delta.com/login/loginPage", 5000);    
    await _puppeteerVerify.verifyPageErrors();
    await _puppeteerVerify.verifyWebPagePerformance();
});

it('Should get page error message, "Error: CX Internals not found...", when adding the injectable.js script into the https://www.delta.com/login/loginPage', async() => {
    await  _puppeteerSet.loadPage("https://www.delta.com/login/loginPage", 5000);    
    await  _puppeteerVerify.verifyPageErrors("Error: CX Internals not found");
    await  _puppeteerSet.addScriptTpPage("./lib/files/injectable.js");
});


it('Should get an error message, when submiting incorrect username and password', async() => {
    await  _puppeteerSet.loadPage("https://www.delta.com/login/loginPage", 5000);
    await  _puppeteerSet.click(page, selectors.username);
    await  _puppeteerSet.write(page, selectors.username, login.wrongUsername);
    await  _puppeteerSet.write(page, selectors.lastname, login.wongSurename);
    await  _puppeteerSet.write(page, selectors.password, login.wrongPassword);
    await  _puppeteerSet.click(page, selectors.submitButton);
    await  _puppeteerVerify.verifyElementToDisappear(page, selectors.loadingSpinner);
    await  _puppeteerVerify.verifyTextIsDisplayed(page, selectors.errMessage, login.errorMessage)
});





});