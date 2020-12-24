import React, { useEffect, useState } from 'react'
import PlotlyTest from './plotlytest'


function App() {
  const [stateData, setStateData] = useState([])
  const [chartData, setChartData] = useState([])
  const [latestTs, setLatestTs] = useState()
  const [latestReading, setLatestReading] = useState()

  async function getData() {
    const url = "http://localhost:3000/readings"
    const response =  await fetch(url)
    const data =  await response.json()
    // this.setState({latestData: data[0]})
    let dateString = await new Date(data[0]['ts']).toLocaleString('en-US', { timeZone: 'Asia/Singapore' })
    let numberReading = await data[0]['value']['$numberDecimal']
    setLatestTs(dateString)
    setLatestReading(numberReading)
    let tempArr = []
    data.forEach((entry, index) => {
      let tempDate = new Date(entry['ts'])
      let newDate  = new Date(tempDate.getTime() + 8 * 60 * 60 * 1000)
      let datetobepushed = newDate.toISOString()
      tempArr.push({x: datetobepushed, y: parseFloat(entry['value']['$numberDecimal'])})
    })
    setStateData(data)
    setChartData(tempArr)
  }

  useEffect(() => {
    const intervalID = setInterval(() => getData(), 10000)
    return () =>{
      console.log("Unmounting")
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
        <PlotlyTest data = {chartData.slice(0,400)}/>
      </div>
  )
}
export default App;
