/*
    Scrabbling the total number of COVID cases by country or globally
    ------------------------------------------------------------------
        - Use this built function APIresult and enter into the parameters
        * Enter the country you want to get the total number of covid cases in

    -------------------------------------------------------------------
    How to enter the country name
    -------------------------------------------------------------------
    * For united states of America, please just enter US
    * If the country contains more than one name, please put - between every name for example :
       south-korea
    ------------------------------------------------------------------
    Examples of using APIresult in main function:
    APIresult('canada')
    APIresult('us')
    APIresult() => this will lead into the total number of cases globally
    
    --------------------------------------------------------------------
    Source of this API is worldmeter

 */
const puppeteer = require('puppeteer');

async function scrapeCases(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    const [el] = await page.$x('//*[@id="maincounter-wrap"]/div/span')
    const text = await el.getProperty('textContent')
    const rawTxt = (await text).jsonValue();


    rawTxt.then(value => {
        console.log(value)

    }).catch(err=>{
        console.log(err)
    })
    const fs = require('fs');
    await browser.close();
}

function APIresult(country)
{
    if(country!=null)
    scrapeCases('https://www.worldometers.info/coronavirus/country/'+country);
    else
        scrapeCases('https://www.worldometers.info/coronavirus/')

}
function main()
{
    // This function will return a total number of covid cases at the moment since the beginning of the pandemic in Canada 
    APIresult('canada')
}

main()

