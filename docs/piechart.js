'use-strict'
const pieOptions = {
    series: [],
    chart: {
        type: 'pie'
    },
    title: {
        text: '',
        align: 'left',
        offsetX: 110
    },
    colors: ['#008FFB', '#00E396', '#FF0000'],
    labels: [setLanguage('currentCases', true), setLanguage('recovered', true), setLanguage('deaths', true)]
};


function pieChart (element) {
    fetch('https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json')
        .then(res => res.json())
        .then(res => {
            const dates = Object.keys(res).map(x => moment(x, 'DD/MM/YYYY').format('DD MMM'));
            const values = Object.values(res);
            //pie
            const last = values[values.length - 1];
            pieOptions.series.push(last.totalCases - last.totalRecovered - last.totalDeaths);
            pieOptions.series.push(+last.totalRecovered);
            pieOptions.series.push(+last.totalDeaths);
            const pieChart = new ApexCharts(element, pieOptions);
            pieChart.render();
        }).catch(e => {
            console.log('unable to load pie chart')
        })
}