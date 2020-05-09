'use-strict';

const percentageRaceChartOptions = {
    series: [],
    chart: {
        fontFamily: 'Quicksand, sans-serif',
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
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
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: setLanguage('percentageRace', true),
        align: 'left'
    },
    xaxis: {
        categories: []
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return Number(value * 100).toFixed(2) + "%";
            }
        },
    },
    colors: ['#008FFB', '#FF0000', '#00E396'],
    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {
                    toolbar: false
                },
                xaxis: {
                    labels: {
                        rotate: -30,
                        offsetY: 10,
                    },
                },
            },
        }]
};

function percentageRaceChart(element, res) {
    const dates = Object.keys(res).map(x => moment(x, 'DD/MM/YYYY').format('DD MMM'));
    const values = Object.values(res);

    percentageRaceChartOptions.series.push({
        name: setLanguage('cases'),
        type: 'line',
        data: values.map(x => (+x.totalCases - (+x.totalDeaths) - (+x.totalRecovered)) / x.totalCases)
    });
    percentageRaceChartOptions.series.push({
        name: setLanguage('deaths'),
        type: 'line',
        data: values.map(x => (x.totalDeaths / x.totalCases))
    });
    percentageRaceChartOptions.series.push({
        name: setLanguage('recovered'),
        type: 'line',
        data: values.map(x => (+x.totalRecovered / x.totalCases))
    });
    percentageRaceChartOptions.xaxis.categories = dates;
    const percentageRaceChart = new ApexCharts(element, percentageRaceChartOptions);
    percentageRaceChart.render();
}
