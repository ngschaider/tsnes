import CPU from "./CPU";
import { uint16, uint8 } from "./types";
import AddressingModeName from "./AddressingModeName";

export class AddressingMode {
    name: AddressingModeName;

    fetch(cpu: CPU): uint16 {
        throw new Error("Not implemented (name=" + this.name + ")");
    }

    constructor(name: AddressingModeName) {
        this.name = name;
    }
}