import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://10.0.2.2:3001");

function App() {
  const [arduinoData, setArduinoData] = useState("");

    useEffect(() => {
      socket.on("arduino-data", (data) => {
        setArduinoData(data);
      });

      return () => {
        socket.off("arduino-data");
      };
    }, []);

  return (
    <View>
      <Text> {arduinoData}</Text>
      <Text> Morning guys </Text>
    </View>
  );
}

export default App;
