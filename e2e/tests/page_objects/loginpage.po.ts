import { Page } from "playwright";
import * as loginPgeLoc from "../locators/loginPageLocators.json"
import BasePage from "./basePage.po";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class LoginPage extends BasePage {

    constructor(page: Page, log: ICreateAttachment) {
        super(page, log);
    }
    async goToLoginPage() {
        await this.Click_And_Enter(loginPgeLoc.loginlink)
    }
    async loginToApplication() {
        await this.Click_And_Fill(loginPgeLoc.emailInput, process.env.user_name!);
        await this.Click_And_Fill(loginPgeLoc.passwordInput, process.env.password!);
        await this.Click_And_Enter(loginPgeLoc.loginButton);
    }

    async clickOnContinue() {
        await this.page.locator(loginPgeLoc.loginButton.locator).waitFor({ timeout: 1000 })
        await this.Click_And_Enter(loginPgeLoc.loginButton);
    }
    async logoutFromApp() {
        await this.Click_And_Enter(loginPgeLoc.logoutButton);
    }
}
