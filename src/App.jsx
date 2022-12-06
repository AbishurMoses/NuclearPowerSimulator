import "./App.css"
import * as React from 'react';
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Plant from "./components/Plant"
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Video from "./components/BackgroundVideo";
import RatingForm from "./components/RatingForm";
import GeneralInfo from "./components/GeneralInfo";
// import { SnackbarProvider } from 'notistack';


const App = () => {
  const [selectedValue, setSelectedValue] = useState('a');
  const [clicked, setClicked] = useState(false);
  const [totalMega, setTotalMega] = useState(0);
  const [loadingDisplay, setLoadingDisplay] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [explode, setExplode] = useState(false);

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
    console.log("calling F")
    alert("Temperature has been changed Fahrenheit")
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
    alert("Temperature has been changed to Celsius")
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

  const handleClickLogs = () => {
    GeneralInfo()
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const defaultData = {
    plant_name: "",
    reactors: [],
  }

  const [data, setData] = useState(defaultData)

  useEffect(() => {
    const getData = async () => {
      if (!isResetting) {
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

          const rawOutputData = await fetch(`https://nuclear.dacoder.io/reactors/output/${reactor.id}?apiKey=aff16bb6a30addb7`)
          const outputData = await rawOutputData.json()

          const rawSystemLogsData = await fetch(`https://nuclear.dacoder.io/reactors/logs/?apiKey=aff16bb6a30addb7`)
          const systemLogsData = await rawSystemLogsData.json()
          return {
            ...reactor,
            temperature: tempData.temperature,
            coolant: coolantData.coolant,
            fuelLevel: fuelLevelData.fuel,
            state: reactorStateData.state,
            rodState: rodsData.control_rods,
            output: outputData.output,
            logs: systemLogsData
          }
        }))

        let total = 0
        for (let reactor of jsonData.reactors) {
          total += reactor.output.amount
        }

        setTotalMega(total)

        setData(jsonData)
        // console.log(totalMega)
      }
    }

    const dataIntervalTimer = setInterval(async () => {
      await getData()
    }, 250)

    return () => {
      clearInterval(dataIntervalTimer)
    }

  }, [])

  const handleExplosion = () => {
    setExplode(!explode)
  }

  return (
    <div style={{
      height: "100%"
    }}>
      <div>
        {
          loadingDisplay ? (
            <Video />
          ) : (
            <div>
              <Navbar />
              <div>
                <Button variant="contained" onClick={handleClickReset}>Reset</Button>
                <Button variant="contained" onClick={handleClickF}>Fahrenheit</Button>
                <Button variant="contained" onClick={handleClickC}>Celsius</Button>
                <Button variant="contained" onClick={handleClickLogs}>Reactor Logs</Button>
                <Button variant="contained" onClick={handleExplosion}>Give Up</Button>
              </div>
              <h1 style={{
                textAlign: "center"
              }}>{data.plant_name}</h1>
              <div style={{
                display: "flex",
                justifyContent: "center",
              }}>
                <RatingForm />
              </div>
              <div className="plants-container">
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "25px",
                  justifyContent: "center"
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
                </div>
              </div>
              <div className="controlPanel">
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                  height: "75%",
                  gap: "20px"
                }}>
                  <div style={{
                    display: "flex",
                    borderRadius: "100%",
                    backgroundColor: "#FF6663",
                    alignItems: "center",
                    textAlign: "center",
                    width: "40%"
                  }}>
                    EMERGENCY SHUTDOWN
                  </div>
                  <div style={{
                    display: "flex",
                    borderRadius: "100%",
                    backgroundColor: "#6779B0",
                    alignItems: "center",
                    textAlign: "center",
                    width: "30%",
                    height: "90%"
                  }}>
                    Controlled Shutdown
                  </div>
                </div>
                <div>
                  <Button>
                    Global Maintenance
                  </Button>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <p style={{ textAlign: "center", paddingRight: "30px", color: "white" }}>Coolants All</p>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <p style={{ color: "white" }}>Disable</p>
                    <div>
                      <Radio
                        checked={selectedValue === 'disable'}
                        onChange={handleChange}
                        value="disable"
                        name="coolant-disable"
                        inputProps={{ 'aria-label': 'Disable' }}
                      />
                    </div>
                    <p style={{ color: "white" }}>Enable</p>
                    <div>
                    </div>
                    <Radio
                      checked={selectedValue === 'enable'}
                      onChange={handleChange}
                      value="enable"
                      name="coolant-enable"
                      inputProps={{ 'aria-label': 'Enable' }}
                    />
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}>
                  <div>
                    <Button variant="contained" onClick={handleClick}>System Logs</Button>
                  </div>
                  <div>
                    <Button variant="contained">Temperature Graph</Button>
                  </div>
                  <div>
                    <p style={{ color: "white" }}>Total Gigawatts: {(totalMega / 1000).toFixed(2)} GW</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div >
  )
}

export default App