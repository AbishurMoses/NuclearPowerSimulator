import Nuclear from "./nuclear.jpg";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress } from "@mui/material";


const Plant = ({ name, temperature, coolant, fuelLevel, state, rodState, output }) => {
    const [open, setOpen] = React.useState(false);

    const handleChange = () => {
        console.log("calling")
        const changeCoolantData = fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=aff16bb6a30addb7`)
        const coolantData = changeCoolantData.json()
        console.log(coolantData)
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };


    return (
        <div style={{
            backgroundColor: "#E6E6E6",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5%",
            // flexBasis: "33.33%",
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
                        Number(temperature.amount.toFixed(2)) === 22.22 ? (
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
                {
                    Number(fuelLevel.percentage.toFixed(2)) === 0 ? (
                        <div>
                            <p>Fuel-Level: Empty</p>
                            <Snackbar open={open} autoHideDuration={2000}>
                                <Alert severity="warning" sx={{ width: '100%' }}>
                                    {name} is out of fuel!
                                </Alert>
                            </Snackbar>
                        </div>
                    ) : (
                        <p>Fuel-Level: {fuelLevel.percentage.toFixed(2)}</p>
                    )
                }
            </div>
            <div className="progress" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "0px 15px 0px 15px",
            }}>
                <LinearProgress variant="determinate" value={parseFloat(fuelLevel.percentage.toFixed(2))} />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "0px 15px 0px 15px"
            }}>
                <p>Reactor State: {state}</p>
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
            <div>
                <p>{temperature.status}</p>
                <p>{output.amount} {output.unit}</p>
            </div>
            <div>
                <button onClick={handleChange}>Change Coolant</button>
            </div>
        </div>
    )
}

export default Plant