import Navbar from "./components/Navbar"
import "./App.css"
import { useEffect } from "react"
import { useState } from "react"
import Plant from "./components/Plant"
const App = () => {
  const [data, setData] = useState({
    plant_name: "",
    reactors: [],
  })

  // const [temp, setTemp] = useState({
  //   temperature: {},
  // })

  useEffect(() => {
    (async () => {
      const raw = await fetch("https://nuclear.dacoder.io/reactors?apiKey=aff16bb6a30addb7")
      const jsonData = await raw.json()
      setData(jsonData)
    })()
  }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     (async () => {
  //       const raw = await fetch("https://nuclear.dacoder.io/reactors/temperature/e2358f4e-5f97-4176-addc-c6178516e81c?apiKey=aff16bb6a30addb7")
  //       const jsonData = await raw.json()
  //       setTemp(jsonData)
  //       console.log(jsonData)
  //     })()
  //   }, 1000);
  // }, {})

  return (
    <div>
      <Navbar />
      <h1>{data.plant_name}</h1>
      <div className="plants-container" style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "25px",
        }}>
          {
            data.reactors.map(item => {
              return (
                <Plant
                  key={item.id}
                  name={item.name}
                  // temp={item.temp}
                />
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default App