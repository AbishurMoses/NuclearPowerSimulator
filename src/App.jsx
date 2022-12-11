import "./App.css"
import * as React from 'react';
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Plant from "./components/Plant"
import Button from '@mui/material/Button';
import Video from "./components/BackgroundVideo";
import DrawerRight from "./components/Drawer";
import {SnackbarProvider, useSnackbar } from "notistack";

const App = () => {
  // const APIKEY = aff16bb6a30addb7
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [clicked, setClicked] = useState(false);
  const [avgTemp, setAvgTemp] = useState(0);
  const [totalMega, setTotalMega] = useState(0);
  const [loadingDisplay, setLoadingDisplay] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [totalLogs, setTotalLogs] = useState([])
  const defaultData = {
    plant_name: "",
    reactors: [],
  }
  const [data, setData] = useState(defaultData);
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setTimeout(() => {
      setLoadingDisplay(!loadingDisplay);
    }, 3000);
  }, []);

  // Shows System Logs. TODO
  const handleClick = () => {
    setClicked(!clicked)
    return clicked
  }
  // Reset Reactors
  const handleClickReset = async () => {
    setIsResetting(true)
    alert("Your reactors are being reset!")
    await fetch("https://nuclear.dacoder.io/reactors/reset?apiKey=aff16bb6a30addb7", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
    })
    setData(defaultData)
    setIsResetting(false)
  }
  // Change Temperature
  const handleClickF = () => {
    fetch("https://nuclear.dacoder.io/reactors/temperature?apiKey=aff16bb6a30addb7", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "unit": "fahrenheit"
      }),
      method: "POST",
    })
  }
  const handleClickC = () => {
    fetch("https://nuclear.dacoder.io/reactors/temperature?apiKey=aff16bb6a30addb7", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "unit": "celsius"
      }),
      method: "POST",
    })
  }

  useEffect(() => {
    const getData = async () => {
      if (!isResetting) {
        const raw = await fetch("https://nuclear.dacoder.io/reactors?apiKey=aff16bb6a30addb7")
        const jsonData = await raw.json()
        // console.log(jsonData)
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

          const rawOutputData = await fetch(`https://nuclear.dacoder.io/reactors/output/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const outputData = await rawOutputData.json()

          const rawSystemLogsData = await fetch(`https://nuclear.dacoder.io/reactors/logs/?apiKey=aff16bb6a30addb7`)
          const systemLogsData = await rawSystemLogsData.json()

          const flattened = systemLogsData.flatMap(num => num);
          setTotalLogs(flattened)
          console.log(totalLogs)
          // console.log(outputData.output.amount)


          return {
            ...reactor,
            temperature: tempData.temperature,
            coolant: coolantData.coolant,
            fuelLevel: fuelLevelData.fuel,
            state: reactorStateData.state,
            rodState: rodsData.control_rods,
            output: outputData.output,

          }
        }))
        setData(jsonData)
        
        let totalMega = 0
        let totalTemp = 0

        for (let reactor of jsonData.reactors) {
          totalMega += reactor.output.amount
          totalTemp += reactor.temperature.amount
        }
        setTotalMega(totalMega)
        setAvgTemp(totalTemp / jsonData.reactors.length)
      }
    }

    const dataIntervalTimer = setInterval(async () => {
      await getData()
    }, 250)

    return () => {
      clearInterval(dataIntervalTimer)
    }

  }, [])

  const disableAll = () => {
    for (let reactor of data.reactors) {
      // console.log(reactor.id)
      if (reactor.coolant === "off") {
        console.log("Ignore")
      }
      else {
        fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=aff16bb6a30addb7`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "coolant": "off"
          }),
          method: "POST",
        })
      }
    }
  }

  const enableAll = () => {
    for (let reactor of data.reactors) {
      console.log(reactor.id)
      if (reactor.coolant === "on") {
        console.log("Ignore")
      }
      else {
        fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=aff16bb6a30addb7`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "coolant": "on"
          }),
          method: "POST",
        })
      }
    }
  }

  const handleControlledShutdown = () => {
    for (let reactor of data.reactors) {
      fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${reactor.id}?apiKey=aff16bb6a30addb7`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
      })
    }
  }

  const handleEmergencyShutdown = () => {
    for (let reactor of data.reactors) {
      fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${reactor.id}?apiKey=aff16bb6a30addb7`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
      })
    }
  }

  const handleExplosion = () => {
    alert("You wish")
  }

  const handleChangeName = () => {
    const newName = prompt('Please pick a name')
    console.log("running")
    fetch(`https://nuclear.dacoder.io/reactors/plant-name?apiKey=aff16bb6a30addb7`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${newName}`
      }),
      method: "PUT",
    })
    const message = `Your name has been changed to ${newName}`
    enqueueSnackbar(message, 
      {autoHideDuration: 5000 }, 
      )
  }

  return (
    <div className="mainContainer">
      {
        loadingDisplay ? (
          <Video />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <Navbar />
              <div>
                <Button variant="contained" onClick={handleClickReset}>Reset</Button>
                <Button variant="contained" onClick={handleClickF}>Fahrenheit</Button>
                <Button variant="contained" onClick={handleClickC}>Celsius</Button>
                <Button variant="contained" onClick={handleExplosion}>Give Up</Button>
              </div>
            </div>
            <div>
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
              }}>
                <h1 onClick={handleChangeName}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}>{data.plant_name}</h1>
                <div>
                  <h2 style={{ color: "white" }}>Output: {(totalMega / 1000).toFixed(2)} GW</h2>
                </div>
              </div>
              <div className="main-plants-container">
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
                        id={reactor.id}
                      />
                    )
                  })
                }
              </div>
            </div>
            <div>
              <div className="controlPanel">
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                  height: "75%",
                  gap: "20px"
                }}>
                  <button className="controlled-button" onClick={handleControlledShutdown}>Controlled Shutdown</button>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                  height: "75%",
                  gap: "20px"
                }}>
                  <button className="emergency-button" onClick={handleEmergencyShutdown}>Emergency Shutdown</button>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                  
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <p style={{ textAlign: "center", paddingRight: "5px", color: "white" }}>Coolants All: </p>
                    <Button onClick={disableAll}>Disable</Button>
                    <Button onClick={enableAll}>Enable</Button>
                    <DrawerRight
                    temp={avgTemp}
                    logs={totalLogs}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App