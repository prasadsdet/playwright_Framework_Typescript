import { Given, When, Then, setDefaultTimeout, Before, After, BeforeAll, AfterAll, Status, BeforeStep, AfterStep } from "@cucumber/cucumber"
import { Browser, BrowserContext, Page, chromium, firefox } from "playwright";
import dotenv from "dotenv";
setDefaultTimeout(1000 * 60 * 2)
let browser: Browser;
let browserContext: BrowserContext;
let page: Page;

BeforeAll(async function () {

    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
    });

    let browserType = process.env.browser ?? "chrome";
    
    switch (browserType) {
        case 'chrome':
        case 'gc':
            browser = await chromium.launch({ headless: false, channel: "chrome", args: ['--start-maximized'] });
            break;
        case 'firefox':
        case 'ff':
            browser = await firefox.launch({ headless: false, args: ['--start-maximized'] });
            break;
        case 'edge':
        case 'msedge':
            browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
        default:
            throw new Error(`Invalid Browser Type ${browserType} is passed..!.Please Choose Correct Browser`);

    }

});

Before(async function (scenario) {
    browserContext = await browser.newContext({ viewport: null, javaScriptEnabled: true });
    page = await browserContext.newPage();
    this.attach(`.........${scenario.pickle.name} Is Started...........`)
    await page.goto(process.env.app_url!)
})

BeforeStep(async function (scenario) {
    this.attach(`.........${scenario.pickleStep.text} Is Started...........`)
})

After(async function (scenario) {
    this.attach(`.........${scenario.pickle.name} Is Ended...........`)
    this.attach(`>>>>>> SCENARIO STATUS IS >>>>>> ${scenario.result?.status} >>>>>>`)
    if(scenario.result?.status==Status.FAILED){
        const img = await page.screenshot({
            path:`./reports/${scenario.pickle.name}.png`
        });
        this.attach(img,"image/png");
    }   
    await page.close();
    await browserContext.close();
})

AfterStep(async function (scenario) {
    this.attach(`.........${scenario.pickleStep.text} Is Ended...........`)
})

AfterAll(async function () {
    await browser.close();
})


export { page };