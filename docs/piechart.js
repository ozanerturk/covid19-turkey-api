'use-strict';

const pieOptions = {
    series: [],
    chart: {
        fontFamily: 'Quicksand, sans-serif',
        type: 'pie',
    },
    theme: {
        mode: 'dark',
        palette: 'palette1',
        monochrome: {
            enabled: false,
            color: 'black',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    title: {
        text: '',
        align: 'left',
        offsetX: 110
    },
    colors: ['#008FFB', '#00E396', '#FF0000'],
    labels: [setLanguage('currentCases', true), setLanguage('recovered', true), setLanguage('deaths', true)],
    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {
                    type: 'pie',
                    height:'200px'
                },
            }
                
        },
        {
            breakpoint: 1024,
            options: {
                chart: {
                    type: 'pie',
                    height:'300px'
                },
            }
                
        }]
};

function pieChart (element, res) {
    const values = Object.values(res);

    const last = values[values.length - 1];
    pieOptions.series.push(last.totalCases - last.totalRecovered - last.totalDeaths);
    pieOptions.series.push(+last.totalRecovered);
    pieOptions.series.push(+last.totalDeaths);
    const pieChart = new ApexCharts(element, pieOptions);
    pieChart.render();
}
