import { uint16 } from "../types";
import Bus from "./Bus";
import BusDevice from "./BusDevice";

export default class RepeatingBusDevice extends BusDevice {

    private repeatNum: number;
    private start: uint16;
    private end: number;

    constructor(start: uint16, end: number, repeatNum: number) {
        super();
        this.repeatNum = repeatNum;
        this.start = start;
        this.end = end;
    }

    connectBus(bus: Bus): void {
        super.connectBus(bus);
        bus.onAddressChanged.on(this.addressChanged.bind(this));
    }

    addressChanged(address: uint16) {
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