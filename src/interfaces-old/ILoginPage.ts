import SecuredPage from '../pages/SecuredPage';
import { ElementHandle } from 'puppeteer';

export default interface ILoginPage {
    username :  Promise<ElementHandle>;
    password : Promise<ElementHandle>;
    submitButton : Promise<ElementHandle>;
    enterUsername(username:string) : Promise<void>;
    enterPassword(username:string) : Promise<void>;
    submitLoginForm() : Promise<SecuredPage>;
    enterLoginInformation(usernameValue : string, passwordValue : string) :Promise<void>;
    login(usernameValue : string, passwordValue : string) : Promise<SecuredPage>;
    loginWithIncorrectInput(usernameValue : string, passwordValue : string) : Promise<void>;
}
