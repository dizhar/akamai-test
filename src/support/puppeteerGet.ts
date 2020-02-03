import { Page, CDPSession } from 'puppeteer';
import {Helpers} from "./helpers";
import { promises } from 'dns';
import { assert  } from "chai";


export default class PuppeterrGet {
    page: Page;
    helpers: Helpers;

    
    constructor(page) {
        this.page = page;
        this.helpers = new Helpers();
  
    }

public async getPagePerformanceMeterics(): Promise<Object>{
    let performanceTiming = await JSON.parse(
        await this.page.evaluate(() => JSON.stringify(window.performance.timing)),
      ); 

      return await performanceTiming;
}



public  async getPageErrors(){ 
  this.page.on('pageerror', pageerr=> {
            console.log("dan:", pageerr)
      })
}


public async getAllErrors(): Promise<Error>{
  let result: Error
    this.page.on('error', err=> {
      result = err;
        console.log("all errors", err);
    })
   return result;
}



public async  getPerformance(){
    const performanceTiming = JSON.parse(
      await this.page.evaluate(() => JSON.stringify(window.performance.timing))
    );
  
    return this.helpers.extractTiming(
      performanceTiming,
      'responseEnd',
      'domInteractive',
      'domContentLoadedEventEnd',
      'loadEventEnd',
      'domLoading'
    );
  }

 public async getFirstMeaningfulPaint(): Promise<Object>{
    const client = await this.page.target().createCDPSession();
    await client.send('Performance.enable');

   
    let firstMeaningfulPaint = 0;
    let performanceMetrics: Object
    while (firstMeaningfulPaint === 0) {
      await this.page.waitFor(3000);
      performanceMetrics = await client.send('Performance.getMetrics');
      return   this.helpers.extractDataFromPerformanceMetrics(
        performanceMetrics,
        'FirstMeaningfulPaint'
      )
    }
  }



}