import Nuclear from "../assets/images/nuclear.jpg";
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";

const Plant = ({ name, temperature, coolant, fuelLevel, state, rodState, output, id }) => {
    const navigate = useNavigate()
    const [isCaution, setIsCaution] = useState(true)

    useEffect(() => {
        if (temperature.state === "Caution") {
            setIsCaution(prevIsCaution => {
                return true
            })
        }
        if (temperature.state === "safe") {
            setIsCaution(prevIsCaution => {
                return false
            })
        }
        // console.log(isCaution)
    })

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const test = () => {
        console.log("calling")
        navigate(`/${id}`)
    }

    return (
        <div onClick={test} className={
            isCaution ? "plants-safe" : "plants-caution"
        }>
            {/* Name of Plant */}
            <h3 style={{
                display: "flex",
                justifyContent: "center"
            }}>{name}</h3>
            {/* Picture of Plant */}
            <img src={Nuclear} alt="Nuclear Power Plant"
                style={{
                    borderRadius: "5px",
                }} />
            {/* Container for Temperature and Emoji */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "0px 15px -10px 15px",
            }}>
                <p>{temperature.amount.toFixed(2)} {temperature.unit}</p>
                {
                    Number(temperature.amount.toFixed(2)) === 72 && temperature.unit === "fahrenheit" || Number(temperature.amount.toFixed(2)) === 22.22 && temperature.unit === "celsius" ? (
                        <p>🥶</p>
                    ) : (
                        <p>😊</p>
                    )
                }
            </div>
            {/* Reactor State and Coolant */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0px 15px 0px 15px",
            }}>
                <p>Coolant: {coolant}</p>
                <p>State: {state}</p>
            </div>
            {/* Fuel Level Label and Progress Bar */}
            <div className="progress" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 15px 0px 15px",
                gap: "5px",
            }}>
                <p>Fuel:</p>
                <LinearProgress variant="determinate" value={parseFloat(fuelLevel.percentage.toFixed(2))} style={{
                    height: "10px", width: "75%",
                }} />
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "0px 15px 0px 15px",
            }}>
                <p>Rods in: {rodState.in}/300</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "-10px" }}>
                <p >Temperature Status: {temperature.status}</p>

                {
                    output.amount !== 0 ? (
                        <p>{output.amount} {output.unit}</p>
                    ) : (
                        <p>0.00 {output.unit}</p>
                    )
                }
            </div>
        </div>
    )
}

export default Plant