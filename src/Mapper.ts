import Bus from "./bus/Bus";
import { Address } from "./types";

export default abstract class Mapper {

    programMemoryChunks: number;
    patternMemoryChunks: number;

    constructor(programMemoryChunks: number, patternMemoryChunks: number) {
        this.programMemoryChunks = programMemoryChunks;
        this.patternMemoryChunks = patternMemoryChunks;
    }

    abstract mapCpuRead(address: Address): Address|undefined;
    abstract mapPpuRead(address: Address): Address|undefined;
    abstract mapCpuWrite(address: Address): Address|undefined;
    abstract mapPpuWrite(address: Address): Address|undefined;

}