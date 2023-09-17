import { uint8 } from "./types";

export class ArrayConsumer {

    bytes: uint8[];
    index: number = 0;

    constructor(bytes: uint8[]) {
        this.bytes = bytes;
    }

    consume(): uint8 {
        if(this.index >= this.bytes.length) {
            throw new Error("Reached end of array");
        }

        const value = this.bytes[this.index];
        this.index++;
        return value;
    }

}