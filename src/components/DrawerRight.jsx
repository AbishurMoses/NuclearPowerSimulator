import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState, useRef, useEffect, useCallback } from "react";
import { Chart } from 'chart.js/auto';

const DrawerRight = (props) => {
  const { temp, logs } = props
  const [avgTemp, setavgTemp] = useState([temp])
  // console.log(logs)

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const fetchNum = () => {
    setavgTemp(prevAvgTemp => {
      return [...prevAvgTemp, temp].splice(-300)
    })
  }

  useEffect(() => {
    const intervalId = setInterval(fetchNum, 1000)
    return () => {
      clearInterval(intervalId)
    }

  }, [temp])

  const List = useCallback(({ anchor, temp }) => {
    const canvasRef = useRef(null)

    useEffect(() => {

      const ctx = canvasRef.current

      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          // avgTemp.map((number, index) => index),
          labels: [...new Array(300)].map((_, index) => index),
          datasets: [{
            label: "Average Temperature",
            data: avgTemp,
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
        // console.log("Destroying")
        myChart.destroy()
      }
    }, [avgTemp])

    return (
      <Box
        sx={{ width: "50vw" }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <canvas className="canvas" ref={canvasRef}></canvas>
        </div>
      </Box>
    )
  }, [avgTemp])

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Temperature and Logs</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <List anchor={anchor} avgTemp={avgTemp} />
            <div style={{display: "flex", flexDirection:"row"}}>
              <div>
                {
                  logs.map(log => {
                    return <p className="display-logs">{log}</p>
                  })
                }
              </div>
              <div>

              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DrawerRight