import {uint8, uint16} from "./types";
import IBusDevice from  "./IBusDevice";
import Bus from "./Bus";

export default class RAM implements IBusDevice {

    bytes: uint8[] = [];
    size: number;

    constructor(size: number = 64 * 1024) {
        this.size = size;
        for(let i = 0; i < this.size; i++) {
            this.bytes.push(0x00);
        }
    }

    connectBus(bus: Bus): void {
        
    }

    canRead(address: number): boolean {
        return true;
    }
    canWrite(address: number): boolean {
        return true;
    }

    read(address: uint16): uint8 {
        return this.bytes[address];
    }

    write(address: uint16, data: uint8): void {
        this.bytes[address] = data;
    }

    load(address: uint16, payload: string): void {
        let bytesAsString = payload.split(" ");
        for(let i = 0; i < bytesAsString.length; i++) {
            let byte = parseInt(bytesAsString[i], 16);
            this.bytes[address + i] = byte;
        }
    }

    reset(): void {
        for(let i = 0; i < this.size; i++) {
            this.bytes[i] = 0x00;
        }
    }

}