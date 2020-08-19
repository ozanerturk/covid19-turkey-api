const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { JSDOM } = require('jsdom');
const { Parser } = require('json2csv');

moment.updateLocale('tr', {
    months: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK']
});
moment.locale('tr');

const fields = ['date', 'totalTests', 'totalCases', 'totalDeaths', 'totalIntensiveCare', 'totalIntubated', 'totalRecovered', 'tests', 'cases', 'critical', 'pneumoniaPercent', 'deaths', 'recovered'];

const queries = {
    totalTests: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(1) > span:nth-child(2)',
    totalCases: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(2) > span:nth-child(2)',
    totalDeaths: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(3) > span:nth-child(2)',
    pneumoniaPercent: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(4) > span:nth-child(2)',
    critical: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(5) > span:nth-child(2)',
    totalRecovered: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(6) > span:nth-child(2)',
    date: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(2) > div > div > div',
    tests: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(1) > span.buyuk-bilgi-l-sayi',
    cases: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(2) > span:nth-child(2)',
    deaths: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(3) > span:nth-child(2)',
    recovered: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(4) > span:nth-child(2)'
};

/*
 * The function now returns an empty string if there's no query for a given field.
 * This is done to accomodate new data fields without playing with the code too much.
 * As we experienced, the data fields may have added and/or removed during the lifetime
 * of the data stream.
 */
function extractInfo (document, query) {
    return document.querySelector(query).textContent
        .replace(/[\n]/g, '')
        .replace(/[ ]+/g, ' ')
        .replace(/\./g, '')
        .trim();
}

async function update () {
    try {
        const res = await axios.get('https://covid19.saglik.gov.tr/?lang=tr-TR');

        const dom = new JSDOM(res.data, {
            includeNodeLocations: true
        });
        const body = dom.window.document.body;

        const timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'));

        /*
         * Following code block traverses whole JSON data and adds the missing fields if any.
         * Normally, the block will be left disabled for performance reasons but, may be
         * enabled when there's a data format change.
         */
        /*
        for (day in timeline){

            for (field in fields){
                if (!(fields[field] in timeline[day])){
                    console.log(day + " doesn't have the " + fields[field] + " field.");
                    timeline[day][fields[field]] = '';
                }
            }
        }
        */

        const date = moment(extractInfo(body, queries.date), 'DD MMM YYYY').format('DD/MM/YYYY');

        timeline[date] = {};
        for (const field of fields) {
            if(field in queries){
            timeline[date][field] = extractInfo(body, queries[field]);
            }
            else{
            timeline[date][field] = '';
            }
        }
        timeline[date].date = date;

        const csv = new Parser({ fields }).parse(Object.values(timeline));
        const json = JSON.stringify(timeline, null, 4);
        fs.writeFileSync('dataset/timeline.csv', csv);
        fs.writeFileSync('dataset/timeline.json', json);
    } catch (e) {
        console.log(e);
    }
}

update();
