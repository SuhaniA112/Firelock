import { io, Socket } from "socket.io-client";

class ArduinoClient {
  private socket: Socket;
  private latestData: string = "";

  constructor() {
    this.socket = io("10.0.2.2:3001", {
      transports: ["websocket"],
    });

    this.socket.on("arduino-data", (data: string) => {
      this.latestData = data;
    });
  }

  public getLatestData(): string {
    return this.latestData;
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default ArduinoClient;
