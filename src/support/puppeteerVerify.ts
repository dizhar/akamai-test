import { assert, should, expect  } from "chai";
import { Page, CDPSession } from 'puppeteer';
import  puppeteerGet from "./puppeteerGet";

export default class PuppeteerVerify{
    page: Page;
    _puppeteerGet: puppeteerGet;
    constructor(page) {
        this.page = page;
        this._puppeteerGet = new puppeteerGet(page)
    }


    public async verifyPageErrors(message ?: string){ 
        const pageErrors = []; 
        this.page.on('pageerror', pageerr=> {
            if (message) { 
                expect(pageerr).to.not.be.undefined;
                expect(pageerr.message).to.include(message)
            } else {
                pageErrors.push(pageerr);
                expect(pageerr).to.be.undefined;
            }
        })

        
        return pageErrors
      }

      public async verifyNoUnexpectedErrors(listOfErrors: any[]){
        for (const e of listOfErrors) {
            if(e){
              assert.isOk(false)
            }
       }

      }


      public async verifyWebPagePerformance(){
        const firstMeaningfulPaint = await  this._puppeteerGet.getFirstMeaningfulPaint();
        const performance =  await this._puppeteerGet.getPerformance(); 

        assert.isBelow(firstMeaningfulPaint['FirstMeaningfulPaint'], 15000,  "First meaningfull piant took longer than 15 seconds to be displayed.");
        assert.isBelow(performance['domInteractive'], 15000, "It took the DOM longer than 15 seconds to be interactive.");
        assert.isBelow(performance['domLoading'], 15000, "It Tool longer than 15 seconds for the load event to finish processing.");   
        assert.isBelow(performance['domContentLoadedEventEnd'], 15000, "It took longer than 15 seconds for  the DOM content to load.");
        assert.isBelow(performance['loadEventEnd'], 15000, "It took more than 15 seconds for the load event to end");  

      }


   public async verifyElementToDisappear(selector: string){
       try {
          await this.page.waitForSelector(selector, {visible: false})
       } catch (error) {
           console.error(error)
       }
   }


    public async verifyTextIsDisplayed(selector: string,  expected: string){
        try {
            await this.page.waitForSelector(selector, {visible: true});
            const acctual = await this.page.$eval(selector, el => el.textContent);
            expect(acctual).to.eql(expected, "The submit error message was not as expected.");
        } catch (error) {
            console.error(error)
        }
    }
    

}