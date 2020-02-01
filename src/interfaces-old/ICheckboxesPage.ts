import { ElementHandle } from 'puppeteer';

export default interface ICheckboxesPage {
    readonly checkboxes : Promise<Array<ElementHandle>>;
    checkboxOne() : Promise<ElementHandle>;
    checkboxTwo() : Promise<ElementHandle>;
}
