import dotenv from "dotenv";
var reporter = require('cucumber-html-reporter');
// Available: ['bootstrap', 'hierarchy', 'foundation', 'simple']
var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        columnLayout:[1],
        metadata: {
            "Browser":"",
            "Test Environment": "QA",
            "app_url":""
        },
        failedSummaryReport: true,
    };

    function generateHtml(){
        dotenv.config({
            path:`${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
        });
        let browserType =process.env.browser
        options.metadata.Browser=browserType!;
        options.metadata.app_url=process.env.app_url!;
        reporter.generate(options);
    }

    generateHtml()

    // npx cross-env browser=firefox environment=dev npm test
    //npx Test
    //npx cross-env npm test-----it will take default