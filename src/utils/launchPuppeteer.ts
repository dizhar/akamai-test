import * as puppeteer from 'puppeteer';

const defaultOptions = {
    headless: false,
    slowMo: 0,
    devtools:  false,
    defaultViewport:null,
    timeout: 10000,
    args: ['--start-maximized',
        '--no-sandbox',
        "--browser-test",
        '--disable-dev-shm-usage'
    ],
};

export default async (options = undefined) => {
    const puppeterOptions = (options === undefined) ? defaultOptions : options;
    return await puppeteer.launch(puppeterOptions);
};
