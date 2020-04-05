const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios')
var moment = require('moment-timezone')
var fs = require('fs')
moment.updateLocale('tr', {
    months: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK']
});
moment.locale('tr');


var queries = {
    toplamTestSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(1) > span:nth-child(2)',
    toplamVakaSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(2) > span:nth-child(2)',
    toplamVefatSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(3) > span:nth-child(2)',
    toplamYogunBakimHastaSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(4) > span:nth-child(2)',
    toplamEntubeHastaSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(5) > span:nth-child(2)',
    toplamIyilesenHastaSayisi: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(1) > div > ul > li:nth-child(6) > span:nth-child(2)',
    tarih: '#bg-logo > div.row > div:nth-child(1) > div.row > div:nth-child(2) > div > div > div',
    testSayisi: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(1) > span.buyuk-bilgi-l-sayi',
    vakaSayisi: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(2) > span:nth-child(2)',
    vefatSayisi: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(3) > span:nth-child(2)',
    iyilesenHastaSayisi: '#bg-logo > div.row > div:nth-child(2) > div > ul > li:nth-child(4) > span:nth-child(2)'
}
function extractInfo (document, query) {
    var text = document.querySelector(query).textContent
    text = text.replace(/[\n]/g, '')
    text = text.replace(/[ ]+/g, ' ')
    text = text.replace(/\./g, '')
    text = text.trim()
    return text
}

function updateDataset (json) {
    var timeline = {}
    try{
        timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'))
    }catch(er){
        
    }
    timeline[json.date] = {}
    timeline[json.date].totalTests = json.totalTests
    timeline[json.date].totalCases = json.totalCases
    timeline[json.date].totalDeaths = json.totalDeaths
    timeline[json.date].totalIntensiveCare = json.totalIntensiveCare
    timeline[json.date].totalIntubated = json.totalIntubated
    timeline[json.date].totalRecovered = json.totalRecovered
    timeline[json.date].tests = json.tests
    timeline[json.date].cases = json.cases
    timeline[json.date].deaths = json.deaths
    timeline[json.date].recovered = json.iyilesenHastaSayisi

    fs.writeFileSync("dataset/timeline.json", JSON.stringify(timeline))

    //update last check
    fs.unlinkSync("dataset/lastcheck")
    fs.writeFileSync("dataset/lastcheck", `Last update ${moment().tz("Europe/Istanbul").format("DD/MM/YYYY HH:mm:ss:SSS")} GMT+3 Timezone "Europe/Istanbul"`)
}

axios.get('https://covid19.saglik.gov.tr/')
    .then(res => {
        const dom = new JSDOM(res.data, {
            includeNodeLocations: true,
        })
        var body = dom.window.document.body
        var obj = {
            totalTests: extractInfo(body, queries.toplamTestSayisi),
            totalCases: extractInfo(body, queries.toplamVakaSayisi),
            totalDeaths: extractInfo(body, queries.toplamVefatSayisi),
            totalIntensiveCare: extractInfo(body, queries.toplamYogunBakimHastaSayisi),
            totalIntubated: extractInfo(body, queries.toplamEntubeHastaSayisi),
            totalRecovered: extractInfo(body, queries.toplamIyilesenHastaSayisi),
            date: moment(extractInfo(body, queries.tarih), 'DD MMM YYYY').format('DD/MM/YYYY'),
            tests: extractInfo(body, queries.testSayisi),
            cases: extractInfo(body, queries.vakaSayisi),
            deaths: extractInfo(body, queries.vefatSayisi),
            iyilesenHastaSayisi: extractInfo(body, queries.iyilesenHastaSayisi)
        }
        updateDataset(obj)
    })

