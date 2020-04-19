'user-strict'

var language = navigator.language.substr(0, 2)
if (language != 'tr' && language != 'en')
    language = 'en';

var en = {
    cases: "cases",
    totalCases: "total cases",
    deaths: "deaths",
    totalDeaths: "total Deaths",
    recovered: "recovered",
    totalRecovered: "total Recovered",
    totalIntubated: "total Intubated",
    totalIntensiveCare: "total Intensive care",
    tests: "tests",
    totalTests: "total tests",
    date: "date",
    newCases: "new cases",
    currentCases: "current cases",
    covidTurkey: 'COVID-19 Turkey Current Status',
    logarithmicCaseIncrease: 'logarithmic case Increase',
    dailyCases: 'daily Cases',
    caseIncreasePercentage: 'case Increase percentage',
    source: 'source',
    today: 'today',
    lastUpdateLabel: 'last update',
};

var tr = {
    cases: "vaka",
    totalCases: "toplam vaka",
    deaths: "vefat",
    totalDeaths: "toplam vefat",
    recovered: "iyileşem",
    totalRecovered: "toplam iyileşen",
    totalIntubated: "toplan entübe",
    totalIntensiveCare: "toplam yoğun bakım",
    tests: "test sayısı",
    totalTests: "toplam test sayısı",
    date: "tarih",
    newCases: "yeni vaka",
    currentCases: "aktif vaka",
    covidTurkey: 'COVID-19 Türkiye Güncel Durum',
    logarithmicCaseIncrease: 'logaritmik vaka artışı',
    dailyCases: 'Günlük Vaka',
    caseIncreasePercentage: 'vaka artış yüzdesi',
    source: 'kaynak',
    today: 'bugün',
    lastUpdateLabel: 'son güncelleme',
};

function setLanguage (key, getUpper) {
    var text = eval(language + "." + key);
    if (getUpper != undefined && getUpper) {
        return capitalizeFirstLetter(text);
    }
    return text;
};

function capitalizeFirstLetter (s) {
    var temp = s.split(' ');
    if (temp.length - 1 > 0) {
        var result = '';
        temp.forEach(element => {
            result += element.charAt(0, 1).toUpperCase() + element.slice(1) + ' ';
        });
        return result.substr(0, result.length - 1);
    } else {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
};