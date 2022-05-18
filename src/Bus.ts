import IBusDevice from "./IBusDevice";
import IBusConnection from "./IBusConnection";
import { uint16, uint8 } from "./types";

export default class Bus {

    private connections: IBusConnection[] = [];

    addConnection(connection: IBusConnection) {
        this.connections.push(connection);
        connection.device.connectBus(this);
    }

    read(address: uint16): uint8 {
        for(let connection of this.connections) {
            let mapped: uint16 = connection.mapAddress(address);
            if(connection.device.canRead(mapped)) {
                return connection.device.read(mapped);
            }
        }

        return 0x00;
    }

    write(address: uint16, data: uint8): void {
        for(let connection of this.connections) {
            let mapped: uint16 = connection.mapAddress(address);
            if(connection.device.canWrite(mapped)) {
                connection.device.write(mapped, data);
            }
        }
    }

}