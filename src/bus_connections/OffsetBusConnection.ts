import BusConnection from "../BusConnection";
import IBusDevice from "../IBusDevice";
import { uint16 } from "../types";

export default class SimpleBusConnection extends BusConnection {

    start: uint16;

    constructor(device: IBusDevice, start: uint16) {
        super(device);
        this.start = start;
    }

    mapAddress(input: uint16): uint16 {
        return input + this.start;
    }

}