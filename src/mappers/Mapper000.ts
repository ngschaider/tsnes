import Mapper from "../Mapper";
import { Address } from "../types";

export default class Mapper000 extends Mapper {
    mapCpuRead(address: Address): Address|undefined {
        if(address < 0x8000 || address > 0xFFFF) {
            return;
        }

        // if PRGROM is 16KB
        //     CPU Address Bus          PRG ROM
        //     0x8000 -> 0xBFFF: Map    0x0000 -> 0x3FFF
        //     0xC000 -> 0xFFFF: Mirror 0x0000 -> 0x3FFF
        // if PRGROM is 32KB
        //     CPU Address Bus          PRG ROM
        //     0x8000 -> 0xFFFF: Map    0x0000 -> 0x7FFF	

        if(this.programMemoryChunks === 1) {
            return address & 0x3FFF;
        } else if(this.programMemoryChunks === 2) {
            return address & 0x7FFF;
        }
        
        throw new Error("Unallowed number of program memory chunks");
    }
    mapPpuRead(address: Address): Address|undefined {
        if(address < 0x0000 || address > 0x1FFF) {
            return;
        }

        return address;
    }
    mapCpuWrite(address: Address): Address|undefined {
        if(address < 0x8000 || address > 0xFFFF) {
            return;
        }

        return address & (this.programMemoryChunks > 1 ? 0x7FFF : 0x3FFF);
    }
    mapPpuWrite(address: Address): Address|undefined {
        if(address < 0x0000 || address > 0x1FFF) {
            return;
        }

        if(this.patternMemoryChunks !== 0) {
            return;
        }

        // Treat as RAM (address is in range and patternMemoryBanks === 0)
        return address;
    }

}