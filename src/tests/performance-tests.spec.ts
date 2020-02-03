import launchPuppeteer from '../utils/launchPuppeteer';
import { Browser, Page } from 'puppeteer';
import PupppeteerSet from "../support/pupppeteerSet";
import PuppeteerVerify from "../support/puppeteerVerify";
import selectors = require('../selectors/login.json');
import config = require('../config/config.json');
import loginSelectors = require('../config/login.json');
import { assert, should, expect  } from "chai";
const baseURL = config.baseURL;

describe('Test Delta website performance: ', () => {

    let browser: Browser;
    let page: Page;
    let _puppeteerSet: PupppeteerSet;
    let _puppeteerVerify: PuppeteerVerify;

    beforeEach(async () => {
        browser = await launchPuppeteer();
        page = await browser.newPage();
        _puppeteerSet = new PupppeteerSet(page);
        _puppeteerVerify = new PuppeteerVerify(page);
        await _puppeteerSet.loadPage(baseURL, 30000)
    });

    afterEach(async () => {
        await browser.close();
    });

    it('Should not get a page error message and performance should be normal, when not adding the injectable.js script', async () => {
        //Steps:
        //1. Go to URL delta home page.
        //2. Wait 3 seconds after the load event finished.
        
        //Verify:
        //1. Verify if there are any unexpected page errors.
        //2. Verify if there are any unexpcted website performance issues.

        let listOfErrors =   await _puppeteerVerify.verifyPageErrors();
        await _puppeteerVerify.verifyNoUnexpectedErrors(listOfErrors) 
        await _puppeteerVerify.verifyWebPagePerformance();
    });


    it('Should get page error message, "Error: CX Internals not found...", when adding the injectable.js script', async () => {
         //Steps:
         //1. Go to dela home page
         //2. Wait 3 seconds after the load event finished.
         //3. Add the the injectable.js script to the page
         
        //Verify:
        //1. Verify that you get the expected page error message that starts with Error: CX Internals not found.
        //2. Verify if there are any unexpcted website performance issues.

        await _puppeteerVerify.verifyPageErrors("Error: CX Internals not found");
        await _puppeteerSet.addScriptTpPage("./lib/files/injectable.js");
        await _puppeteerVerify.verifyWebPagePerformance();
    });

    it('Should not get a page error, when not adding the injectable.js script into the login page ', async () => {
        //Steps:
        //1. Go to dela home page
        //2. wait 5 seconds after the load event finished.

        //Verify:
        //1. Verify if there are any unexpected page errors.
        //2. Verify if there are any unexpcted website performance issues.


        await _puppeteerSet.loadPage(`${loginSelectors.URL}`, 5000);
        let listOfErrors =    await _puppeteerVerify.verifyPageErrors();
        await _puppeteerVerify.verifyNoUnexpectedErrors(listOfErrors) 
        await _puppeteerVerify.verifyWebPagePerformance();
    });

    it(`Should get page error message, "Error: CX Internals not found...", when adding the injectable.js script into the ${loginSelectors.URL}`, async () => {
        //Steps:
        //1. Go to dela login page
        //2. Wait 5 seconds after the load event finished.

        //Verify:
        //1. Verify that you get the expected page error message that starts with Error: CX Internals not found.
        //2. Verify if there are any unexpcted website performance issues.
        
        await _puppeteerSet.loadPage(loginSelectors.URL, 5000);
        await _puppeteerVerify.verifyPageErrors("Error: CX Internals not found");
        await _puppeteerSet.addScriptTpPage("./lib/files/injectable.js");
    });


    it('Should get an error message, when submiting incorrect username and password', async () => {
        //Steps:
        //1. Go to dela login page
        //2. Wait 5 seconds after the load event finished.
        //3. Type a none existing username in the username input field.
        //4. Type a none existing surename in the last name input field.
        //5. Type a a none existing password in the password input field.
        //6. Click on the submit button

        //Verify
        //1. Verify the expected error message is displayed. 


        await _puppeteerSet.loadPage(loginSelectors.URL, 5000);
         let listOfErrors =   await  _puppeteerVerify.verifyPageErrors();
         
        await _puppeteerSet.click(selectors.username);
        await _puppeteerSet.write(selectors.username, loginSelectors.wrongUsername);
        await _puppeteerSet.write(selectors.lastname, loginSelectors.wongSurename);
        await _puppeteerSet.write(selectors.password, loginSelectors.wrongPassword);
        await _puppeteerSet.click(selectors.submitButton);

        await _puppeteerVerify.verifyNoUnexpectedErrors(listOfErrors) 
        await _puppeteerVerify.verifyElementToDisappear(selectors.loadingSpinner);
        await _puppeteerVerify.verifyTextIsDisplayed(selectors.errMessage, loginSelectors.errorMessage)
    });


});