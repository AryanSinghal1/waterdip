import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

function ColumnChart(props) {
    const [chartData, setChartData] = useState({      
        series: [{
        name: 'Number of Visitors per Country',
        data: []
      }],
        options: {
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
              return val;
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          xaxis: {
            categories: [...new Set(props.requiredChartData.map(item => item['country']))],
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
            text: 'Number of visitors per country',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
          }
    })

useEffect(()=>{
    const values = props.requiredChartData.map(item => item['country']); // Extract values for the specified key
    const uniqueValues = [...new Set(values)];
    const dataByCountry = uniqueValues.reduce((acc, currElem) => {
        const filteredData = props.requiredChartData.filter(x => x.country == currElem);
        acc.push(filteredData.length);
        return acc;
      }, []);
    setChartData({series:[
        {
            name: 'Number of people',
            data: dataByCountry
        },
    ], options:{...chartData.options, xaxis:{...chartData.options.xaxis, categories: uniqueValues}}})
},[props.requiredChartData])
    return (
        <Chart
              options={chartData.options}
              series={chartData.series}
              type='bar'
              height={350}
            />
  )
}

export default ColumnChart
