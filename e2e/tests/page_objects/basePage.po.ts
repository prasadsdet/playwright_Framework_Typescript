import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Page } from "playwright";

export default class BasePage {

    protected page: Page;
    protected log:ICreateAttachment;
    
    constructor(page: Page,log:ICreateAttachment) {
        this.page = page;
        this.log=log;
    }

    async Click_And_Fill(object:any,data:string,roleFlag=false){
        if(!roleFlag){
            await this.getLocator(object).fill(data,object["actionOptions"])
        }else{
            await this.getLocatorByRole(object).click(object["actionOptions"])
        }
        
        this.log(`Captured Value ${data} for ${object["description"]}`)
    }

    async Click_And_Enter(object:any){
        await this.getLocator(object).click(object["actionOptions"])
        this.log(`Clicked on ${object["description"]}`)
    }

    getLocator(object:any){
        return this.page.locator(object["locator"],object["locatorOptions"]);
    }

    getLocatorByRole(object:any){
        const element= object["locator"] as "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem"
        return this.page.getByRole(element,object["locatorOptions"])
    }

}