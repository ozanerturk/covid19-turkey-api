
const axios = require("axios")
var DomParser = require('dom-parser');
var domParser = new DomParser();
var esprima = require('esprima');
var moment = require('moment')
var fs = require("fs")
moment.updateLocale('tr', {
    months: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK']
});
moment.locale('tr');

String.prototype.regexIndexOf = function (regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

function formatDate (dateString) {
    console.log(dateString)
    return moment(dateString, 'DD MMM YYYY').format('DD/MM/YYYY')
}

function updateGithubDataset (json) {
    fs.writeFileSync("dataset\timeseries.json", JSON.stringify(json))
}
var main = async () => {
    try {
        var document = await axios.get("https://covid19.saglik.gov.tr/")
        var root = domParser.parseFromString(document.data)
        var scripts = root.getElementsByTagName("script")
        var script = scripts[scripts.length - 1]
        var code = script.innerHTML;
        parsedCode = esprima.parseScript(code)

        var config = parsedCode.body
            .filter(x => x.type == 'VariableDeclaration')
            .flatMap(x => x.declarations)
            .find(x => x.id.name == 'config')

        var dates = config
            .init.properties.find(x => x.key.name == 'data')
            .value.properties.find(x => x.key.name == 'labelsTooltip')
            .value.elements.map(x => formatDate(x.value))
        console.log(dates)

        var datasets = config
            .init.properties.find(x => x.key.name == 'data')
            .value.properties.find(x => x.key.name == 'datasets')
            .value

        //console.log(datasets)

        var cases = datasets.
            elements[0].properties
            .find(x => x.key.name == "data")
            .value.elements.map(x => x.value)
        //console.log(vaka)

        var deaths = datasets.
            elements[1].properties
            .find(x => x.key.name == "data")
            .value.elements.map(x => x.value)

        // console.log(vefat)

        var jsonTimeSeries = {}

        for (var i = 0; i < dates.length - 2; i++) { // last 2 days are empty
            jsonTimeSeries[dates[i]] = {
                cases: cases[i],
                deaths: deaths[i]
            }
        }
        updateGithubDataset(jsonTimeSeries)
        console.log(jsonTimeSeries)
    } catch (er) {
    }
}

main()