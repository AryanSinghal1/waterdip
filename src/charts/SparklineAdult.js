import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

function SparklineAdult(props) {
    const [chartData, setChartData] = useState({      
        series: [{
            data: []
          }],
        options: {
            chart: {
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'straight'
          },
          fill: {
            opacity: 0.5,
          },
          yaxis: {
            min: 0
          },
          xaxis: {
            type: 'datetime',
        },
          title: {
            text: '',
            offsetX: 0,
            style: {
              fontSize: '24px',
            }
          },
          subtitle: {
            text: 'Adults',
            offsetX: 0,
            style: {
              fontSize: '14px',
            }
          }
          }})
          const getNumberOfAdults = (start, end) => {
            const dateArray = [];
            let currentDate = new Date(start)
            let adultCount = 0;
            while (currentDate <= end) {
                const totalValue = props.requiredChartData.reduce((acc, x) => {
                    let elemDate = new Date(`${x.arrival_date_year} ${x.arrival_date_month} ${x.arrival_date_day_of_month}`)
                    if( elemDate.toLocaleDateString() == currentDate.toLocaleDateString()){
                      return acc + x.adults;
                    }
                    return acc;
                  }, 0);
                  adultCount+=totalValue;
                    dateArray.push([new Date(currentDate).getTime(), totalValue]);
                    currentDate.setDate(currentDate.getDate() + 1);
            }
            return {dateArray, adultCount};
        };
useEffect(()=>{
    const requiredChartData = getNumberOfAdults(new Date(props.formData.startDate), new Date(props.formData.endDate));
    setChartData({series:[
        {
            name: 'Number of people',
            data: requiredChartData.dateArray
        }
    ], options:{...chartData.options, title:{...chartData.options.title, text: requiredChartData.adultCount}}})
},[props.requiredChartData])
    return (
        <div>
        <Chart
              options={chartData.options}
              series={chartData.series}
              type='line'
              height={350}
            />
    </div>
  )
}

export default SparklineAdult
