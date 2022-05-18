import IBusDevice from "./IBusDevice";
import { uint8, uint16 } from "./types";

export default abstract class IBusConnection {

    device: IBusDevice;

    constructor(device: IBusDevice) {
        this.device = device;
    }

    abstract mapAddress(input: uint16): uint16;

}