import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

function TimeSeries(props) {
    const [chartData, setChartData] = useState({      
        series: [
            {
                name: 'Number of people',
                data: []
            },
        ],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Number of Daily Visitors',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return (val).toFixed(0);
                    },
                },
                title: {
                    text: 'Number of Visitors'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return (val).toFixed(0)
                    }
                }
            }
        }
    })

const getDatesInRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start)
    while (currentDate <= end) {
        const totalValue = props.requiredChartData.reduce((acc, x) => {
            let elemDate = new Date(`${x.arrival_date_year} ${x.arrival_date_month} ${x.arrival_date_day_of_month}`)
            if( elemDate.toLocaleDateString() == currentDate.toLocaleDateString()){
              return acc + x.adults + x.children + x.babies;
            }
            return acc;
          }, 0);
            dateArray.push([new Date(currentDate).getTime(), totalValue]);
            currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
};

useEffect(()=>{
    const requiredChartData = getDatesInRange(new Date(props.formData.startDate), new Date(props.formData.endDate));
    setChartData({...chartData, series:[
        {
            name: 'Number of people',
            data: requiredChartData
        },
    ]})
},[props.requiredChartData])
    return (
        <div>
        <Chart
              options={chartData.options}
              series={chartData.series}
              type='area'
              height={350}
            />
    </div>
  )
}

export default TimeSeries
