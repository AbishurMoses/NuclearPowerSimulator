import "./App.css"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Plant from "./components/Plant"
// import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const App = () => {
  const [data, setData] = useState({
    plant_name: "",
    reactors: [],
  })
  const [formData, setFormData] = useState({
    search: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  } 

    useEffect(() => {
      const getData = async () => {
        const raw = await fetch("https://nuclear.dacoder.io/reactors?apiKey=aff16bb6a30addb7")
        const jsonData = await raw.json()
        jsonData.reactors = await Promise.all(jsonData.reactors.map(async reactor => {
          const rawTempData = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const tempData = await rawTempData.json()

          const rawCoolantData = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const coolantData = await rawCoolantData.json()

          const rawFuelLevelData = await fetch(`https://nuclear.dacoder.io/reactors/fuel-level/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const fuelLevelData = await rawFuelLevelData.json()

          const rawReactorStateData = await fetch(`https://nuclear.dacoder.io/reactors/reactor-state/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const reactorStateData = await rawReactorStateData.json()

          const rawRodsData = await fetch(`https://nuclear.dacoder.io/reactors/rod-state/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const rodsData = await rawRodsData.json()

          const rawOutputData= await fetch(`https://nuclear.dacoder.io/reactors/output/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const outputData = await rawOutputData.json()
    
          return {
            ...reactor,
            temperature: tempData.temperature,
            coolant: coolantData.coolant,
            fuelLevel: fuelLevelData.fuel,
            state: reactorStateData.state,
            rodState: rodsData.control_rods,
            output: outputData.output
          }

        }))
        console.log(jsonData)
        setData(jsonData)
      }

      const dataIntervalTimer = setInterval(async () => {
        await getData()
      }, 250)

      return () => {
        clearInterval(dataIntervalTimer)
      }
    }, [])

    useEffect(() => {
      console.log(data)
    })

    return (
      <div>
        <Navbar />
        <h1 style={{textAlign: "center"}}>⭐{data.plant_name}⭐</h1>
        <div className="plants-container" style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: "25px",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "25px",
          }}>
            {
              data.reactors.map(reactor => {
                return (
                  <Plant
                    key={reactor.id}
                    name={reactor.name}
                    temperature={reactor.temperature}
                    coolant={reactor.coolant}
                    fuelLevel={reactor.fuelLevel}
                    state={reactor.state}
                    rodState={reactor.rodState}
                    output={reactor.output}
        
                  />
                )
              })
            }
            {/* <Line
            data={{
              // x-axis label values
              labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              datasets: [
                {
                  label: "# of Calories Lost",
                  // y-axis data plotting values
                  data: [200, 300, 1300, 520, 2000, 350, 150],
                  fill: false,
                  borderWidth: 4,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: 'green',
                  responsive: true
                },
              ],
            }}
          /> */}
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "97.5%",
          backgroundColor: "blue",
          margin: "auto",
          marginTop: "20px",
          height: "150px",
        }}>
          <p>Hello</p>
        </div>
      </div >
    )
  }
  export default App