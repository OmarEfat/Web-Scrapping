/*
    Scrabbling the real value of the currency rate between two currencies, and it can be used as a free API
    -------------------------------------------------------------------------------------------------------
                    How to use this code for extracting the currency rate between two currencies?
    *******************************************************************************************************
    - Use this built function APIresult and enter into the parameters
    * First parameter :Enter the first Currency that you need to be converted
    * Second parameter : Enter the second Currency that your first currency will be converted into
    * Amount : Enter the amount value you wants your code to convert into - Default amount is 1
   ********************************************************************************************************
   Examples :
   APIresult('CAD','USD','5') : Expected output is 6.35 (~~According to the current rate June 2022)
   **************************************************************************************************

   !!-- The website used for scrapping the rate is xe.com

   !!!! Please make sure to use the correct capitalized format for the currency like
   -USD
   -CAD
   -EGP
   -EUR
   *** You can find the list of all currency codes in this website
   - https://www.iban.com/currency-codes

 */

const puppeteer = require('puppeteer');

async function scrapePrice(url,amount){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    const [el] = await page.$x('//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/form/div[2]/div[1]/p[2]/text()[1]')
    const text = await el.getProperty('textContent')
    const rawTxt = (await text).jsonValue();


    rawTxt.then(value => {
        fs.writeFileSync('C:\\Users\\omare\\WebstormProjects\\MyPortfolio\\file.txt',value);
        let val = parseFloat(value)
        console.log(val)
        let result = val*amount;
        console.log(result)

    }).catch(err=>{
        console.log(err)
    })
    const fs = require('fs');
        await browser.close();
}

function APIresult(firstCurrency , secondCurrency , amount)
{
    if(amount==null)
        amount = 1;
    scrapePrice('https://www.xe.com/currencyconverter/convert/?Amount=1&From='+firstCurrency+'&To='+secondCurrency,amount);

}
// How to use the result of my
APIresult('USD','CAD','5')

