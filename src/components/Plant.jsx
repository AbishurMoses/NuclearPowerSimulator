import Nuclear from "../assets/images/nuclear.jpg";
import * as React from 'react';
// import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress } from "@mui/material";


const Plant = ({ name, temperature, coolant, fuelLevel, state, rodState, output }) => {
    const [open, setOpen] = React.useState(false);
    const [countOfProgess, setCountOfProgess] = React.useState(0);
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const handleChange = () => {
        const changeCoolantData = fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=aff16bb6a30addb7`)
        const coolantData = changeCoolantData.json()
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div>
            <div style={{
                backgroundColor: "#E6E6E6",
                display: "flex",
                flexDirection: "column",
                borderRadius: "5%",
                border: "5px solid blue"
            }}>
                <h3 style={{
                    display: "flex",
                    justifyContent: "center"
                }}>{name}</h3>
                <img src={Nuclear} alt="Nuclear Power Plant" style={{
                    borderRadius: "5px",
                }} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "0px 15px 0px 15px",
                    // gap: "10px",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px",
                    }}>
                        <p>{temperature.amount.toFixed(2)} {temperature.unit}</p>
                        {
                            Number(temperature.amount.toFixed(2)) === 72 && temperature.unit === "fahrenheit" || Number(temperature.amount.toFixed(2)) === 22.22 && temperature.unit === "celsius" ? (
                                <div>
                                    <p>🥶</p>
                                </div>
                            ) : (
                                <p>😊</p>
                            )
                        }
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 15px 0px 15px",
                }}>
                    <p>Coolant: {coolant}</p>
                    <p>Reactor State: {state}</p>
                </div>
                <div className="progress" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 15px 0px 15px",
                    gap: "5px",
                }}>
                    <p>Fuel-Level:</p>
                    <LinearProgress variant="determinate" value={parseFloat(fuelLevel.percentage.toFixed(2))} style={{
                        height: "10px", width: "75%",
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 15px 0px 15px",
                }}>
                    <p>Rods in: {rodState.in}</p>
                    <p>Rods out: {rodState.out}</p>
                </div>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "-10px"}}>
                    <p >Temperature Status: {temperature.status}</p>
                    <p>{output.amount} {output.unit}</p>
                </div>
            </div>
        </div>

    )
}

export default Plant