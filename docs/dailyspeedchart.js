'use-strict'
const speedOptions = {
    series: [],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: setLanguage('dailyCases', true) + ' / ' + setLanguage('deaths', true),
        align: 'left'
    },
    xaxis: {
        categories: []
    },
    colors: ['#008FFB', '#FF0000'],
    yaxis: [{
        seriesName: setLanguage('cases'),
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: '#008FFB'
        },
        labels: {
            style: {
                colors: '#008FFB'
            }
        },
        title: {
            text: setLanguage('cases', true),
            style: {
                color: '#008FFB'
            }
        },
        tooltip: {
            enabled: true
        }
    },
    {
        seriesName: setLanguage('deaths'),
        opposite: true,
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: '#FF0000'
        },
        labels: {
            style: {
                colors: '#FF0000'
            }
        },
        title: {
            text: setLanguage('deaths', true),
            style: {
                color: '#FF0000'
            }
        }
    }
    ]
};


function dailySpeedChart (element) {
    fetch('https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json')
        .then(res => res.json())
        .then(res => {
            const dates = Object.keys(res).map(x => moment(x, 'DD/MM/YYYY').format('DD MMM'));
            const values = Object.values(res);



            //speed
            speedOptions.series.push({
                name: setLanguage('cases'),
                type: 'line',
                data: values.map(x => x.cases)
            });
            speedOptions.series.push({
                name: setLanguage('deaths'),
                type: 'line',
                data: values.map(x => x.deaths)
            });
            speedOptions.xaxis.categories = dates;
            const speedChart = new ApexCharts(element, speedOptions);
            speedChart.render();
        }).catch(e => {
            console.log('unable to load dailySpeed chart')
        })
}