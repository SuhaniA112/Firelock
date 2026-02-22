import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [arduinoData, setArduinoData] = useState("");

//   useEffect(() => {
//     socket.on("arduino-data", (data) => {
//       setArduinoData(data);
//     });

//     return () => {
//       socket.off("arduino-data");
//     };
//   }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Arduino Data:</h1>
      <p>hi </p> 
      {/* <p>{arduinoData}</p> */}
    </div>
  );
}

export default App;
