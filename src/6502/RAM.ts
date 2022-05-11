import {uint8, uint16} from "./types";

export default class RAM {

    bytes: uint8[] = [];
    size: number;

    constructor(size: number = 64 * 1024) {
        this.size = size;
        for(let i = 0; i < this.size; i++) {
            this.bytes.push(0x00);
        }
    }

    read(address: uint16): uint8 {
        return this.bytes[address];
    }

    write(address: uint16, data: uint8) {
        this.bytes[address] = data;
    }

}