import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { page } from "../../corelib/corelib.spec";
import HomePage from "../page_objects/homepage.po";
import { expect } from "playwright/test";

let homePage:HomePage;
Then('Logout should be successfull', async function()  {
    homePage = new HomePage(page,this.attach);
    await homePage.validateHomePage();
});

When('Dummy test to fail',async function()  {

    expect(1).toEqual(true);
});


