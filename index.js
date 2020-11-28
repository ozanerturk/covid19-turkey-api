const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { Parser } = require('json2csv');
const { JSDOM } = require('jsdom');
moment.updateLocale('tr');
moment.locale('tr');

async function update() {
    try {

        const dom = await JSDOM.fromURL('https://covid19.saglik.gov.tr/?lang=tr-TR', {
            includeNodeLocations: true,
            runScripts: "dangerously"
        });
        // We need to delay one extra turn because we are the first DOMContentLoaded listener,
        // but we want to execute this code only after the second DOMContentLoaded listener
        // (added by external.js) fires.


        const data = dom.window.sondurumjson[0]
        const date = moment(data.tarih, 'DD.MM.YYYY').format('DD/MM/YYYY');

        const timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'));
        const DOT_REGEX = /\./gi;
        let dayData = {
            date: date,
            totalTests: data.toplam_test.replace(DOT_REGEX, ''),
            totalPatients: data.toplam_hasta.replace(DOT_REGEX, ''),
            totalDeaths: data.toplam_vefat.replace(DOT_REGEX, ''),
            totalIntensiveCare: data.toplam_yogun_bakim.replace(DOT_REGEX, ''),
            totalIntubated: data.toplam_entube.replace(DOT_REGEX, ''),
            totalRecovered: data.toplam_iyilesen.replace(DOT_REGEX, ''),
            tests: data.gunluk_test.replace(DOT_REGEX, ''),
            cases: data.gunluk_vaka.replace(DOT_REGEX, ''),
            patients: data.gunluk_hasta.replace(DOT_REGEX, ''),
            critical: data.agir_hasta_sayisi.replace(DOT_REGEX, ''),
            pneumoniaPercent: `%${data.hastalarda_zaturre_oran.replace(DOT_REGEX, ',')}`,
            deaths: data.gunluk_vefat.replace(DOT_REGEX, ''),
            recovered: data.gunluk_iyilesen.replace(DOT_REGEX, '')
        }
        if (Object.keys(timeline).indexOf(date) == -1) {
            sendTelegram(dayData)
        }
        timeline[date] = dayData

        console.log(dayData)
        const csv = new Parser(Object.keys(dayData)).parse(Object.values(timeline));
        const json = JSON.stringify(timeline, null, 4);
        fs.writeFileSync('dataset/timeline.csv', csv);
        fs.writeFileSync('dataset/timeline.json', json);
    } catch (e) {
        console.log(e);
    }
}

function sendTelegram(data) {
    const lines = []
    for (key of Object.keys(data)) {
        lines.push(`\t\t${key.trim()}:\t\t${data[key].trim()}`)
    }
    const message = `
*REPORT_${data.date}*

\`\`\`
${lines.join('\n')}
\`\`\`
please visit https://ozanerturk.github.io/covid19-turkey-api/
for overall data and charts
Official source: https://covid19.saglik.gov.tr/
        `
    axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true
    }).then(() => {

    }).catch(e => {
        console.log(e)
    });
}

update();
