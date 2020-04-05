const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios')
var moment = require('moment-timezone')
var fs = require('fs')
const { Parser } = require('json2csv');
moment.updateLocale('tr', {
    months: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK']
});
moment.locale('tr');


var queries = {
    totalTests: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(1) > span:nth-child(2)',
    totalCases: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(2) > span:nth-child(2)',
    totalDeaths: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(3) > span:nth-child(2)',
    totalIntensiveCare: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(4) > span:nth-child(2)',
    totalIntubated: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(5) > span:nth-child(2)',
    totalRecovered: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(6) > span:nth-child(2)',
    tarih: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(2) > div > div > div',
    tests: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(1) > span.buyuk-bilgi-l-sayi',
    cases: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(2) > span:nth-child(2)',
    deaths: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(3) > span:nth-child(2)',
    recovered: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(4) > span:nth-child(2)'
}
function extractInfo (document, query) {
    var text = document.querySelector(query).textContent
    text = text.replace(/[\n]/g, '')
    text = text.replace(/[ ]+/g, ' ')
    text = text.replace(/\./g, '')
    text = text.trim()
    return text
}

try {
    axios.get('https://covid19.saglik.gov.tr/')
        .then(res => {
            const dom = new JSDOM(res.data, {
                includeNodeLocations: true,
            })
            var body = dom.window.document.body

            var timeline = {}
            timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'))

            var date = moment(extractInfo(body, queries.tarih), 'DD MMM YYYY').format('DD/MM/YYYY')

            timeline[date] = {}
            timeline[date].totalTests = extractInfo(body, queries.totalTests)
            timeline[date].totalCases = extractInfo(body, queries.totalCases)
            timeline[date].totalDeaths = extractInfo(body, queries.totalDeaths)
            timeline[date].totalIntensiveCare = extractInfo(body, queries.totalIntensiveCare)
            timeline[date].totalIntubated = extractInfo(body, queries.totalIntubated)
            timeline[date].totalRecovered = extractInfo(body, queries.totalRecovered)
            timeline[date].tests = extractInfo(body, queries.tests)
            timeline[date].cases = extractInfo(body, queries.cases)
            timeline[date].deaths = extractInfo(body, queries.deaths)
            timeline[date].recovered = extractInfo(body, queries.recovered)

            var dates = Object.keys(timeline)
            var values = Object.values(timeline).map((v, i) => { v.date = dates[i]; return v })
            var fields = [ 'date', 'totalTests', 'totalCases', 'totalDeaths', 'totalIntensiveCare', 'totalIntubated', 'totalRecovered', 'tests', 'cases', 'deaths', 'recovered' ]
            const parser = new Parser({fields:fields});
            const csv = parser.parse(values);
            fs.writeFileSync("dataset/timeline.csv",csv)
            fs.writeFileSync("dataset/timeline.json", JSON.stringify(timeline))

            //update last check
            fs.unlinkSync("dataset/lastcheck")
            fs.writeFileSync("dataset/lastcheck", `Last update ${moment().tz("Europe/Istanbul").format("DD/MM/YYYY HH:mm:ss:SSS")} GMT+3 Timezone "Europe/Istanbul"`)
        }).catch(e => {
            console.log(e)
        })

} catch (er) {
    console.log(er)
}


