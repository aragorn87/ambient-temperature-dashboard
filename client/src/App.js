import React, { useEffect, useState } from 'react'
import PlotlyChart from './PlotlyChart'

function App() {
  console.log(process.env.PORT)
  const [chartData, setChartData] = useState([])
  const [latestTs, setLatestTs] = useState()
  const [latestReading, setLatestReading] = useState()

  async function getData() {
    let datestring, numberReading
    let tempArr = []
    const url = `http://localhost:3000/readings?limit=100`
    const response =  await fetch(url)
    const data =  await response.json()
    data.forEach((entry, index) => {
      datestring  = (new Date((new Date(entry['ts'])).getTime() + 8 * 60 * 60 * 1000)).toISOString() //converting to SG local time, toLocaleString messes up with Plotly formatting strings
      numberReading = parseFloat(entry['value']['$numberDecimal'])
      tempArr.push({x: datestring, y:numberReading})
    })
    
    setLatestTs(tempArr[0]['x'])
    setLatestReading(tempArr[0]['y'])
    setChartData(tempArr)
  }

  useEffect(() => {
    const intervalID = setInterval(() => getData(), 10000) //refresh page every 10 seconds for new data
    return () =>{
      clearInterval(intervalID)}
  })

  return (
      <div className="bg-gray-300 h-screen flex flex-col justify-center items-center">
        <div className="flex justify-center items-center objects-center">
        <h1 className="text-xl font-extrabold text-gray-700 block p-8">Ambient room temperature</h1> {latestReading? 
        <div className="flex flex-col items-center">
        <p className="font-extrabold text-5xl block">{latestReading}</p> 
        <p className="italic"> updated at {latestTs}</p> </div>
        :"Waiting for reading"}
        </div>
        <PlotlyChart data = {chartData.slice(0,100)}/>
      </div>
  )
}
export default App;
