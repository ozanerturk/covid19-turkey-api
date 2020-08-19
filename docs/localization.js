'use-strict';

let language = navigator.language.substr(0, 2);
if (language !== 'tr' && language !== 'en') {
    language = 'en';
}

const allWords = {
    en: {
        cases: 'cases',
        totalCases: 'total cases',
        deaths: 'deaths',
        totalDeaths: 'total deaths',
        recovered: 'recovered',
        totalRecovered: 'total recovered',
        totalIntubated: 'total intubated',
        totalIntensiveCare: 'total intensive care',
        tests: 'tests',
        totalTests: 'total tests',
        date: 'date',
        newCases: 'new cases',
        currentCases: 'active cases',
        covidTurkey: 'COVID-19 Turkey Current Status',
        logarithmicCaseIncrease: 'logarithmic case increase',
        dailyCases: 'daily cases',
        caseIncreasePercentage: 'case increase percentage',
        source: 'source',
        today: 'today',
        lastUpdateLabel: 'last update',
        percentageRace:'Case/Recovery/Death percentage',
        pneumoniaPercent:'pneumonie percentage',
        critical:'critical cases'
    },
    tr: {
        cases: 'vaka',
        totalCases: 'toplam vaka',
        deaths: 'vefat',
        totalDeaths: 'toplam vefat',
        recovered: 'iyileşen',
        totalRecovered: 'toplam iyileşen',
        totalIntubated: 'toplan entübe',
        totalIntensiveCare: 'toplam yoğun bakım',
        tests: 'test sayısı',
        totalTests: 'toplam test sayısı',
        date: 'tarih',
        newCases: 'yeni vaka',
        currentCases: 'aktif vaka',
        covidTurkey: 'COVID-19 Türkiye Güncel Durum',
        logarithmicCaseIncrease: 'logaritmik vaka artışı',
        dailyCases: 'günlük vaka',
        caseIncreasePercentage: 'vaka artış yüzdesi',
        source: 'kaynak',
        today: 'bugün',
        lastUpdateLabel: 'son güncelleme',
        percentageRace:'Vaka/İyileşen/Vefat yüzdesel',
        pneumoniaPercent:'zatürre olasılığı',
        critical:'ağır hasta'
    }
};

function setLanguage (key, isUpperCase) {
    const text = allWords[language][key];
    if (!isUpperCase) {
        return text;
    }
    const newTextParts = [];
    for (const textPart of text.split(' ')) {
        newTextParts.push(textPart.charAt(0).toUpperCase() + textPart.slice(1));
    }
    return newTextParts.join(' ');
}
