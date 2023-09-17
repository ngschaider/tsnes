import { Address, uint8 } from "../types";
import Bus from "./Bus";

export class AddressShifter extends Bus {

    shift: number;

    constructor(bus: Bus, shift: number) {
        super();
        
        bus.onRead.on(this.onIncomingRead.bind(this));
        bus.onWrite.on(this.onIncomingWrite.bind(this));
        bus.onClock.on(this.onClock.trigger(this));

        this.shift = shift;
    }

    onIncomingRead(address: Address): uint8|undefined {
        return this.onRead.trigger(address + this.shift);
    }

    onIncomingWrite(address: Address, value: uint8): void {
        this.onWrite.trigger(address + this.shift, value);
    }

}