'use-strict';

const options = {
    series: [],
    chart: {
        fontFamily: 'Quicksand, sans-serif',
        height: 350,
        type: 'line',
        stacked: false,
        foreColor: '#fff'
    },
    theme: {
        mode: 'light',
        palette: 'palette9',
        monochrome: {
            enabled: false,
            color: 'black',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [2, 2, 2]
    },
    title: {
        text: setLanguage('covidTurkey'),
        align: 'left',
        offsetX: 110,
        color: '#fff'
    },
    xaxis: {
        categories: []
    },
    colors: ['#008FFB', '#FF0000', '#00E396', '#BBBBBB'],
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
            },
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
    },
    {
        seriesName: setLanguage('recovered'),
        opposite: true,
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: '#00E396'
        },
        labels: {
            style: {
                colors: '#00E396'
            }
        },
        title: {
            text: setLanguage('recovered', true),
            style: {
                color: '#00E396'
            }
        }
    },
    {
        seriesName: setLanguage('tests'),
        opposite: true,
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: '#FEB019'
        },
        labels: {
            style: {
                colors: '#FEB019'
            }
        },
        title: {
            text: setLanguage('tests', true),
            style: {
                color: '#FEB019'
            }
        }
    }],
    tooltip: {
        fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
        }
    },
    legend: {
        horizontalAlign: 'left',
        offsetX: 40,
        color: '#fff'
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                yaxis: [],
                chart: {
                    toolbar: false
                },
                xaxis: {
                    tickAmount: 10,
                },
                title: {
                    text: setLanguage('covidTurkey'),
                    align: 'left',
                    offsetX: 0
                },
                xaxis: {
                    labels: {
                        rotate: -30,
                        offsetY: 5,
                    },
                },
            },
        }]
};

function mainChart(element, res) {
    const dates = Object.keys(res).map(x => moment(x, 'DD/MM/YYYY').format('DD MMM'));
    const values = Object.values(res);

    options.series.push({
        name: setLanguage('cases'),
        type: 'line',
        data: values.map(x => x.totalCases)
    });
    options.series.push({
        name: setLanguage('deaths'),
        type: 'line',
        data: values.map(x => x.totalDeaths)
    });
    options.series.push({
        name: setLanguage('recovered'),
        type: 'line',
        data: values.map(x => x.totalRecovered)
    });
    options.series.push({
        name: setLanguage('tests'),
        type: 'column',
        data: values.map(x => x.tests)
    });
    options.xaxis.categories = dates;
    const chart = new ApexCharts(element, options);
    chart.render();
}
