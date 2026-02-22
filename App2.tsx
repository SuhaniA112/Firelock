import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [arduinoData, setArduinoData] = useState("10");

  //   useEffect(() => {
  //     socket.on("arduino-data", (data) => {
  //       setArduinoData(data);
  //     });

  //     return () => {
  //       socket.off("arduino-data");
  //     };
  //   }, []);

  return (
    <View>
      <Text> {arduinoData}</Text>
    </View>
  );
}

export default App;
