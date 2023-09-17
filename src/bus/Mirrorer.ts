import { Address, uint8 } from "../types";
import Bus from "./Bus";

export class Mirrorer {

    bus: Bus;

    mirrorStart: number;
    size: number;

    constructor(bus: Bus, mirrorStart: number, size: number) {
        this.bus = bus;

        this.bus.onRead.on(this.onIncomingRead.bind(this));
        this.bus.onWrite.on(this.onIncomingWrite.bind(this));

        this.mirrorStart = mirrorStart;
        this.size = size;
    }

    onIncomingRead(address: Address): uint8|undefined {
        if(address < 0 || address >= this.size) {
            return;
        }
        return this.bus.read(this.mirrorStart + address);
    }

    onIncomingWrite(address: Address, value: uint8): void {
        if(address < 0 || address >= this.size) {
            return;
        }
        this.bus.write(this.mirrorStart + address, value);
    }

}