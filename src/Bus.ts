import IBusDevice from "./IBusDevice";
import BusConnection from "./BusConnection";
import { uint16, uint8 } from "./types";

export default class Bus {

    private devices: IBusDevice[] = [];

    connectDevice(device: IBusDevice) {
        this.devices.push(device);
        device.connectBus(this);
    }

    read(address: uint16): uint8 {
        for(let device of this.devices) {
            if(device.canRead(address)) {
                return device.read(address);
            }
        }

        return 0x00;
    }

    write(address: uint16, data: uint8): void {
        for(let device of this.devices) {
            if(device.canWrite(address)) {
                device.write(address, data);
            }
        }
    }

}