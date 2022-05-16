import AddressingMode from "../AddressingMode";
import CPU from "../CPU";
import { uint16, uint8 } from "../../types";

// From the Datasheet:
// INDEXED ABSOLUTE ADDRESSING [ABS, X or Y]
// This form of addressing is used in conjunction 
// with X and Y index register and is referred to 
// as "Absolute, X" and "Absolute, Y". The effective 
// address is formed by adding the contents of X or Y 
// to the address contained in the second and third 
// bytes of the instruction. This mode allows the 
// index register to contain the index or count value 
// and the instruction to contain the base address. 
// This type of indexing allows referencing of any 
// location and the index may modify multiple fields, 
// resulting in reduced coding and execution time.
export default class ABS_Y extends AddressingMode {
    constructor() {
        super("ABS_Y");
    }

    private address: uint16;
    getAddress(cpu: CPU): uint16 {
        if(!this.address) {
            let low: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
            let high: uint8 = cpu.bus.read(cpu.pc);
            cpu.pc++;
    
            let provided = (high << 8) | low;

            this.address = provided + cpu.y;

            this.pageBoundaryCrossed = (provided >> 8) !== (this.address >> 8);
        }

        return this.address;
    }

    getData(cpu: CPU): uint8 {
        let address = this.getAddress(cpu);
        return cpu.bus.read(address);
    }

    setData(cpu: CPU, data: number): void {
        cpu.bus.write(this.getAddress(cpu), data);
    }

}