import { ElementHandle } from 'puppeteer';

export default interface IHoversPage {
    readonly captionLinks : Promise<Array<ElementHandle>>;
    readonly captionUsernames : Promise<Array<ElementHandle>>;
    readonly figures : Promise<Array<ElementHandle>>;
    hoverOverImage(position) : Promise<void>;
    returnToHoversPage() : Promise<void>;
    clickViewProfile(position) : Promise<void>;
    getUserName(position) : Promise<string>;
}
