import BusConnection from "../BusConnection";
import IBusDevice from "../IBusDevice";
import { uint16 } from "../types";

export default class MirrorBusConnection extends BusConnection {
    startAddresses: uint16[];

    constructor(device: IBusDevice, startAddresses: uint16[]) {
        super(device);
        this.startAddresses = [...startAddresses];

        // sort from highest to lowest
        this.startAddresses.sort((a, b) => {
            return a === b ? 0 : (a <= b ? 1 : -1);
        });
    }

    mapAddress(input: uint16): uint16 {
        for(let i = 0; i < this.startAddresses.length; i++) {
            let start: uint16 = this.startAddresses[i];
            if(input - start > 0) {
                return input - start;
            }
        }

        throw new Error("Could not map address 0x" + input.toString(16));
    }
}