import Nuclear from "./nuclear.jpg";

const Plant = ({ name, temperature, coolant, fuelLevel, state, rodState, output }) => {
    // const [totalOutput] = totalOutput
    console.log(output)
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
                            <p>🥶</p>
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
                        <p>Fuel-Level: Empty</p>
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
                <div className="progress-bar progress-bar-striped" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{ width: "200px", height: "10px", border: "1px solid black" }}></div>
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
        </div>
    )
}

export default Plant