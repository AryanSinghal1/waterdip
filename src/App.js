import './App.css';
import SparklineAdult from './charts/SparklineAdult';
import SparklineChildren from './charts/SparklineChildren';
import data from './data/data.json'
import { useEffect, useState } from 'react';
import TimeSeries from './charts/TimeSeries';
import ColumnChart from './charts/ColumnChart';

function App() {
  const [formData, setFormData] = useState({startDate:'2015-01-01',endDate:'2015-12-31'});
  const [requiredChartData, setRequiredChartData] = useState([]);
  const getDatesInRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start)
    while (currentDate <= end) {
        const totalValue = data.filter(x => {
            let elemDate = new Date(`${x.arrival_date_year} ${x.arrival_date_month} ${x.arrival_date_day_of_month}`)
            return elemDate.toLocaleDateString() == currentDate.toLocaleDateString()
          });
            dateArray.push(...totalValue);
            currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
};

useEffect(()=>{
    const currentChartData = getDatesInRange(new Date(formData.startDate), new Date(formData.endDate));
    setRequiredChartData(currentChartData);
},[formData])

  return (
    <div className='outerDivContainer'>
    <div className='outerDiv'>
    <div className='formContainer'>
    <form onChange={(e)=>{setFormData({...formData, [e.target.name]: e.target.value});}}>
        <label>Select Range:</label>
        <input type='date' value={formData.startDate} name='startDate'></input>
        <input type='date' value={formData.endDate} name='endDate'></input>
    </form>
    </div>
    <div className='chartsContainer'>
      <div className='charts'>
    <TimeSeries requiredChartData={requiredChartData} formData={formData}/>
    </div>
      <div className='charts'>
    <ColumnChart requiredChartData={requiredChartData}/>
    </div>
      <div className='charts'>
    <SparklineAdult requiredChartData={requiredChartData} formData={formData}/>
    </div>
      <div className='charts'>
    <SparklineChildren requiredChartData={requiredChartData} formData={formData}/>
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
