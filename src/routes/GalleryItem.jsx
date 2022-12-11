import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import * as React from "react";
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from "notistack";
import { Chart } from 'chart.js/auto';
import Plant from "../components/Plant";

const GalleryItem = () => {
    const { id } = useParams()
    const display = true
    const { enqueueSnackbar } = useSnackbar()


    const defaultData = {
        plant_name: "",
        reactors: []
    }
    const [data, setData] = useState(defaultData)
    // const [temp, setTemp] = useState([0])
    const temp = [1, 2, 3, 4, 5]

    const getData = async () => {
        const raw = await fetch("https://nuclear.dacoder.io/reactors?apiKey=aff16bb6a30addb7")
        const jsonData = await raw.json()

        jsonData.reactors = await Promise.all(jsonData.reactors.filter(reactor => reactor.id === id).map(async reactor => {
            // console.log(reactor.id, "---", id)
            const rawTempData = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${id}?apiKey=aff16bb6a30addb7`)
            const tempData = await rawTempData.json()

            const rawCoolantData = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apiKey=aff16bb6a30addb7`)
            const coolantData = await rawCoolantData.json()

            const rawFuelLevelData = await fetch(`https://nuclear.dacoder.io/reactors/fuel-level/${id}?apiKey=aff16bb6a30addb7`)
            const fuelLevelData = await rawFuelLevelData.json()

            const rawReactorStateData = await fetch(`https://nuclear.dacoder.io/reactors/reactor-state/${id}?apiKey=aff16bb6a30addb7`)
            const reactorStateData = await rawReactorStateData.json()

            const rawRodsData = await fetch(`https://nuclear.dacoder.io/reactors/rod-state/${id}?apiKey=aff16bb6a30addb7`)
            const rodsData = await rawRodsData.json()

            const rawOutputData = await fetch(`https://nuclear.dacoder.io/reactors/output/${id}?apiKey=aff16bb6a30addb7`)
            const outputData = await rawOutputData.json()

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
        console.log(jsonData)
        setData(jsonData)
    }

    useEffect(() => {
        const dataIntervalTimer = setInterval(getData, 250)

        return () => {
            clearInterval(dataIntervalTimer)
        }
    }, [])
    // console.log(data.reactors[0])

    const tempGraph = (temp) => {
        console.log("calling tempgraph")
        const canvasRef = useRef(null)

        useEffect(() => {
            console.log("Calling useEffect")
            const ctx = canvasRef.current

            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [...new Array(300)].map((_, index) => index),
                    datasets: [{
                        label: "Temperature",
                        data: [1, 2, 3, 4, 5],
                        borderWidth: 1,
                        fill: true,
                    }]
                },
                options: {
                    responsive: false,
                    animation: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })

            return () => {
                myChart.destroy()
            }
        }, [temp])
    }

    const enableCoolant = () => {
        for (let reactor of data.reactors) {
            if (data.reactors[0].coolant === "on") {
                console.log("Ignore")
            } else {
                fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apiKey=aff16bb6a30addb7`, {
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

    const disableCoolant = () => {
        for (let reactor of data.reactors) {
            if (data.reactors[0].coolant === "off") {
                console.log("Ignore")
            } else {
                fetch(`https://nuclear.dacoder.io/reactors/coolant/${id}?apiKey=aff16bb6a30addb7`, {
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

    const handleChangeName = () => {
        const newName = prompt('Please pick a name')
        console.log("running")
        fetch(`https://nuclear.dacoder.io/reactors/set-reactor-name?apiKey=aff16bb6a30addb7`, {
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
            { autoHideDuration: 5000 },
        )
    }

    const dropRods = () => {
        for (var i = 0; i < 50; i++) {
            fetch(`https://nuclear.dacoder.io/reactors/drop-rod/${id}?apiKey=aff16bb6a30addb7`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
        }
    }

    const raiseRods = () => {
        for (var i = 0; i < 50; i++) {
            fetch(`https://nuclear.dacoder.io/reactors/raise-rod/${id}?apiKey=aff16bb6a30addb7`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
        }
    }

    return (
        <div>
            <div>
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
            {/* <div>
                <canvas className="canvas" ref={canvasRef}></canvas>
            </div> */}
            <div className="controlPanel">
                {/* <div style={{
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
                </div> */}
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
                        <Button onClick={disableCoolant}>Disable</Button>
                        <Button onClick={enableCoolant}>Enable</Button>
                    </div>
                    <div>
                        <Button onClick={dropRods}>Drop rods</Button>
                        <Button onClick={raiseRods}>Raise rods</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GalleryItem