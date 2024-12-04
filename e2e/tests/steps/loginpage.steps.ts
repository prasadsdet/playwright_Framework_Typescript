import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { page } from "../../corelib/corelib.spec";
import LoginPage from "../page_objects/loginpage.po";

let loginPage:LoginPage;
Given('User on Home page', async function () {
    loginPage= new LoginPage(page,this.attach);
    await loginPage.goToLoginPage();
});

When('User enter Login details', async () => {
    await loginPage.loginToApplication();
});

Then('Home page should be displayed', async () => {
    await loginPage.clickOnContinue();
    await loginPage.logoutFromApp();
});