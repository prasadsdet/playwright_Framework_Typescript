import { Page } from "playwright";
import { expect } from "@playwright/test";
import * as homePageLoc from "../locators/homePageLocators.json"
import BasePage from "./basePage.po";
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class HomePage extends BasePage {

    constructor(page: Page, log: ICreateAttachment) {
        super(page, log);
    }

    async validateHomePage() {
        await this.page.locator(homePageLoc.EditAccountInformation.locator).waitFor(homePageLoc.EditAccountInformation.actionOptions)
        expect(this.page.locator(homePageLoc.EditAccountInformation.locator)).toBeVisible();
        await this.Click_And_Enter(homePageLoc.EditAccountInformation);
    }

}