import {uint8, uint16, Address} from "./types";
import Bus from "./bus/Bus";

export default class RAM {

    bytes: uint8[] = [];
    size: number;

    constructor(bus: Bus, size: number) {
        this.size = size;

        for(let i = 0; i < this.size; i++) {
            this.bytes.push(0x00);
        }

        bus.onRead.on(this.read.bind(this));
        bus.onWrite.on(this.write.bind(this));
    }

    read(address: Address): uint8|undefined {
        if(address < 0 || address >= this.size) {
            return;
        }

        return this.bytes[address];
    };
    write(address: Address, value: uint8): void {
        if(address < 0 || address >= this.size) {
            return;
        }

        this.bytes[address] = value;
    };

    /**
     * Loads a string of bytes in the format of "AB CD EF 01 02 03 C0 DE BE EF" into the ram starting at the given address
     */
    load(address: uint16, payload: string): void {
        let bytesAsString = payload.split(" ");
        for(let i = 0; i < bytesAsString.length; i++) {
            this.bytes[address + i] = parseInt(bytesAsString[i], 16);
        }
    }

    reset(): void {
        for(let i = 0; i < this.size; i++) {
            this.bytes[i] = 0x00;
        }
    }

}