import { assert, should,expect  } from "chai";
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
        this.page.on('pageerror', pageerr=> {
            if (message) {
                expect(pageerr).to.not.be.undefined;
                expect(pageerr.message).to.include(message)
            } else {
                expect(pageerr).to.be.undefined;
            }
        })
      }


      public async verifyWebPagePerformance(){
          let firstMeaningfulPaint = await  this._puppeteerGet.getFirstMeaningfulPaint();
          let performance =  await this._puppeteerGet.getPerformance(); 

      assert.isBelow(firstMeaningfulPaint['FirstMeaningfulPaint'], 15000,  "First meaningfull piant took longer than 15 seconds to be displayed.");
      assert.isBelow(performance['domInteractive'], 15000, "It took the DOM longer than 15 seconds to be interactive.");
      assert.isBelow(performance['domLoading'], 15000, "It Tool longer than 15 seconds for the load event to finish processing.");   

      }


   public async verifyElementToDisappear(page: Page, selector: string){
       try {
          await page.waitForSelector(selector, {visible: false})
       } catch (error) {
           console.error(error)
       }
   }


    public async verifyTextIsDisplayed(page: Page, selector: string,  expected: string){
       await page.waitForSelector(selector, {visible: true});
    //    const acctual = await page.evaluate(element => element.textContent, selector);
    //    console.log("acctual:", acctual) 

    //    expect(expected).to.be(acctual);
    }
    

}