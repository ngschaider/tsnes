import { uint16 } from "../types";
import Bus from "./Bus";
import BusDevice from "./IBusDevice";

export default class RepeatingBusDevice implements BusDevice {

    private repeatNum: number;
    private start: uint16;
    private end: number;

    constructor(start: uint16, end: number, repeatNum: number) {
        this.repeatNum = repeatNum;
        this.start = start;
        this.end = end;
    }

    bus: Bus;

    connectBus(bus: Bus): void {
        this.bus = bus;
        this.bus.onAddressChanged.on(this.onAddressChanged.bind(this));
    }

    onAddressChanged(address: uint16) {
        // address is below range or is in the target range
        if(address < this.end) {
            return;
        }

        // address is above range
        if(address > this.start + (this.end - this.start) * this.repeatNum) {
            return;
        }

        let targetAddress = (address - this.start) % (this.end - this.start) + this.start;
        this.bus.address = targetAddress;
    }

    clock(): void {
    }

    device: BusDevice;

}