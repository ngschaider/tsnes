import CPU from "./CPU";
import { uint16, uint8 } from "./types";
import AddressingModeName from "./AddressingModeName";

export default class AddressingMode {
    name: AddressingModeName;

    pageBoundaryCrossed: boolean = false;

    fetch(cpu: CPU): uint16 {
        throw new Error("Not implemented (name=" + this.name + ")");
    }

    constructor(name: AddressingModeName) {
        this.name = name;
    }
}