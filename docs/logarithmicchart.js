'use-strict';

const logarithmicOptions = {
    series: [],
    chart: {
        fontFamily: 'Quicksand, sans-serif',
        height: 350,
        type: 'line',
        zoom: {
            enabled: true
        }
    },
    theme: {
        mode: 'dark',
        palette: 'palette9',
        monochrome: {
            enabled: false,
            color: 'black',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0
    },
    markers: {
        size: 2,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 1,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 1,
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
            }
        }
    },
    colors: ['#008FFB'],
    yaxis: {
        tickAmount: 7,
        type: 'numeric',
        logarithmic: true,
        title: {
            text: setLanguage('newCases', true),
            style: {
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
            return `<div class='arrow_box'>
                <div>
                    <b>${setLanguage('date', true)}: ${w.config.series[0].data[dataPointIndex][3]}</b>
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
                </div>`;
        }
    }
};

function logarithmicChart (element, res) {
    const values = Object.values(res);
    const matchedList = values.map(t => [Math.log10(+t.totalCases), Math.log10(+t.cases),
        Math.round(+t.cases * 100 / +t.totalCases) + '%', t.date]);

    matchedList.splice(0, 4);

    logarithmicOptions.series = [{
        name: setLanguage('cases'),
        data: matchedList
    }];

    const logarithmicChart = new ApexCharts(element, logarithmicOptions);
    logarithmicChart.render();
}
