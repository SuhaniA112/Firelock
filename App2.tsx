import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://10.0.2.2:3001", { // laptop ip if connecting to real phone
  transports: ["websocket"],
});

function App() {
  const [arduinoData, setArduinoData] = useState("");
  const sendButtonPress = () => {
    socket.emit("buttonPress", { time: Date.now() });
    };

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
      <Text> Morning guys </Text>
      <Text> Morning guys </Text>
      <Text> Morning guys </Text>
      <Text> {arduinoData}</Text>
      <Text> Morning guys </Text>
      <Button
        title = "Press here" 
        onPress = {sendButtonPress}/>
    </View>
  );
}

export default App;
