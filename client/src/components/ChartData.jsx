import ReactApexChart from "react-apexcharts";

function ChartData({ allTasks }) {

    const getallAccuracy = (allTasks) => {
        const arrAccuracy = [];
        const arrTasks = []; // new array for storing task names

        allTasks.forEach(element => {
            if (element.Accuracy) {
                arrTasks.push(element.title); // push task name into new array
                arrAccuracy.push(element.Accuracy);
            }

        });
        console.log(arrAccuracy);
        return {arrAccuracy, arrTasks};
    }
    const {arrAccuracy, arrTasks} = getallAccuracy(allTasks);
    getallAccuracy(allTasks);
    const chartInfo = {
        series: [{
            name: 'Time estimation is wrong by',
            data: arrAccuracy
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: arrTasks,
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: 'Monthly Time estimation difference',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },

    };
    return (
        <ReactApexChart options={chartInfo.options} series={chartInfo.series} type="bar" width={600} height={350} />

    );
}

export default ChartData;
