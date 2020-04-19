'use-strict'
 //Logarithmic for new patients
 const logarithmicNewPatOptions = {
    series: [],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    markers: {
        size: 4,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 1,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
            size: undefined,
            sizeOffset: 3
        }
    },
    dataLabels: {
        enabled: false
    },
    title: {
        text: setLanguage('caseIncreasePercentage', true),
        align: 'left'
    },
    xaxis: {
        type: 'numeric',
        tickAmount: 'dataPoints',

        labels: {
            formatter: function (value) {
                return Math.round(Math.pow(10, +value));
            }
        },
        title: {
            text: setLanguage('totalCases', true),
            style: {
                color: '#000'
            }
        },
    },
    colors: ['#008FFB'],
    yaxis: {
        tickAmount: 7,
        type: 'numeric',
        logarithmic: true,
        title: {
            text: setLanguage('newCases', true),
            style: {
                color: '#000'
            }
        },
        labels: {
            formatter: function (value) {
                return Math.round(Math.pow(10, +value))
            }
        }
    },
    tooltip: {
        enabled: true,
        custom: function ({
            series,
            seriesIndex,
            dataPointIndex,
            w
        }) {
            return '<div class="arrow_box">' +
                `<div>
                    <b> ${setLanguage('date', true)}: ${w.config.series[0].data[dataPointIndex][3]}</b>
                </div> 
                <div>
                   ${setLanguage('caseIncreasePercentage', true)}: ${w.config.series[0].data[dataPointIndex][2]} 
                </div>
                <div>
                    ${setLanguage('cases', true)}: ${Math.round(Math.pow(10, w.config.series[0].data[dataPointIndex][1]))}
                </div>
                <div>
                    ${setLanguage('totalCases', true)}: ${Math.round(Math.pow(10, w.config.series[0].data[dataPointIndex][0]))}
                </div>
                </div>`
        }
    }
};

function logarithmicChart (element) {
    fetch('https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json')
        .then(res => res.json())
        .then(res => {
            const dates = Object.keys(res).map(x => moment(x, 'DD/MM/YYYY').format('DD MMM'));
            const values = Object.values(res);
            var matchedList = values.map(t => {
                return [Math.log10(+t.totalCases), Math.log10(+t.cases), Math.round(
                    parseInt(t.cases) * 100 / parseInt(t.totalCases)) + "%", t.date]
            });

            matchedList.splice(0, 4);

            logarithmicNewPatOptions.series = [{
                name: setLanguage('cases'),
                data: matchedList
            }];

            const logarithmicNewPatChart = new ApexCharts(element, logarithmicNewPatOptions);
            logarithmicNewPatChart.render();
        }).catch(e => {
            console.log('unable to load logarithmic chart')
        })
} 