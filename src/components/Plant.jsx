import Nuclear from "./nuclear.jpg";

const Plant = ({ name }) => {
    // console.log(temp)
    return (
        <div style={{
            backgroundColor: "#E6E6E6",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            borderRadius: "5%",
        }}>
            <img src={Nuclear} alt="Nuclear Power Plant"/>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0px 15px 0px 15px",
            }}>
                <p>{name}</p>
                {/* <p>{amount}</p> */}
            </div>
        </div>
    )
}

export default Plant