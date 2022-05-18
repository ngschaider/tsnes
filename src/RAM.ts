import {uint8, uint16} from "./types";
import IBusDevice from  "./bus/IBusDevice";
import Bus from "./bus/Bus";
import ReadOrWrite from "./bus/ReadOrWrite";

export default class RAM implements IBusDevice {

    clock(): void {
        
    }

    bus: Bus;

    connectBus(bus: Bus): void {
        this.bus = bus;
        bus.onAddressChanged.on(this.addressChanged.bind(this));
    }

    addressChanged(address: uint16) {
        if(address < 0x0000 || address > this.size) {
            return;
        }

        if(this.bus.readOrWrite === ReadOrWrite.Read) {
            this.bus.data = this.read(address)
        } else if(this.bus.readOrWrite === ReadOrWrite.Write) {
            this.write(address, this.bus.data);
        }
    }

    read(address: uint16): uint8 {
        if(address < 0 || address > this.size) {
            return;
        }
        
        return this.bytes[address];
    }

    write(address: uint16, data: uint8) {
        if(address < 0 || address > this.size) {
            return;
        }

        this.bytes[address] = data;
    }

    bytes: uint8[] = [];
    size: number;

    constructor(size: number = 64 * 1024) {
        this.size = size;
        for(let i = 0; i < this.size; i++) {
            this.bytes.push(0x00);
        }
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