const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        devtools: true
    });
    const page = await browser.newPage();
    await page.goto('https://foreupsoftware.com/index.php/booking/19765/2431#/teetimes');

    try {
        await page.evaluate(async () => {
            let btns = Array.from(document.getElementsByTagName('button'));
            let el = btns.find(el => el.innerText === 'Non Resident');
            el.click();
        });
    } catch(err) {
        console.log(err);
        debugger
    }

    await page.waitForSelector('#date-menu');
    console.log('wait for next page...')

    await page.evaluate(async () => {
        let dates = document.getElementById('date-menu');
        let opts = Array.from(dates.options);

        dates.value = opts[opts.length - 1].value;

        let fourPlayerButton = document.querySelector("[data-value='4']");
        fourPlayerButton.click();

        let times = Array.from(document.getElementById('times').getElementsByTagName('li'));

        if (times.length === 1 && times[0].classList.contains('empty')) {
            console.log('nooooooooooo');
        } else {
            times[0].click();
        }
    })

    // await browser.close();
})();