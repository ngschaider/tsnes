import BusConnection from "../BusConnection";
import IBusDevice from "../IBusDevice";
import { uint16 } from "../types";

export default class CustomBusConnection extends BusConnection {
    mapAddress(input: uint16): uint16 {
        return this.mapFn(input);
    }

    private mapFn: (input: uint16) => uint16;

    constructor(device: IBusDevice, mapFn: (input: uint16) => uint16) {
        super(device);
        this.mapFn = mapFn;
    }

}