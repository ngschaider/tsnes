import { uint16, uint8 } from "../types";
import Event from "../Event";

export default class Bus {

    public onRead: Event = new Event();
    public onWrite: Event = new Event();
    public onClock: Event = new Event();
    public onReset: Event = new Event();

    // apply the address to the bus and the devices will immediately apply data onto the bus using the onAddressChanged listener
    read(address: uint16): uint8 {
        const value = this.onRead.trigger(address);
        if(value === undefined) {
            console.log("Could not read from address 0x" + address.toString(16));
            return 0x00;
        }
        return value;
    }

    // apply the data and the address to the bus and the devices will immediately perform the write using the onAddressChanged listener
    write(address: uint16, value: uint8): void {
        this.onWrite.trigger(address, value);
    }

    clock() {
        this.onClock.trigger();
    }

    reset() {
        this.onReset.trigger();
    }

}