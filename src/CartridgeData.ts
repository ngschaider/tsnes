import { ArrayConsumer } from "./ArrayConsumer";
import Mapper from "./Mapper";
import Mapper000 from "./mappers/Mapper000";
import { uint8 } from "./types";

enum MirroringDirection {
    Vertical,
    Horizontal
}

enum TvSystem {
    NTSC,
    PAL,
    DualCompatible,
}

type Header = {
    programMemoryChunks: number;
    patternMemoryChunks: number;
    mapperLower: number; // 4 bits
    fourScreen: boolean;
    containsTrainer: boolean;
    containsPersistentMemory: boolean;
    mirroring: MirroringDirection; // 1 bit
    mapperUpper: number; // 4 bits
    formatVersion: number; // 2 bits
    playChoice10: boolean;
    vsUnisystem: boolean;
    programRamSize: number;
    tvSystem1: TvSystem;
    busConflicts: boolean;
    containsProgramRam: boolean;
    tvSystem2: TvSystem;
    mapperNumber: uint8;
}

export type CartridgeData = {
    header: Header;
    patternMemory: uint8[];
    programMemory: uint8[];
    trainer: uint8[];
};

export const parseBytes = (bytes: uint8[]): CartridgeData => {
    const arr = new ArrayConsumer(bytes);

    if(arr.consume() !== 0x4E || arr.consume() !== 0x45 || arr.consume() !== 0x53 || arr.consume() !== 0x1A) {
        throw new Error("Invalid iNES header.");
    }

    const programMemoryChunks = arr.consume();
    const patternMemoryChunks = arr.consume();

    const flags6 = arr.consume();
    const mapperLower = flags6 >> 4;
    const fourScreen = (flags6 >> 3) & 0x01 ? true : false;
    const containsTrainer = (flags6 >> 2) & 0x01 ? true : false;
    const containsPersistentMemory = (flags6 >> 1) & 0x01 ? true : false;
    const mirroring = (flags6 >> 0) & 0x01 ? MirroringDirection.Vertical : MirroringDirection.Horizontal;

    const flags7 = arr.consume();
    const mapperUpper = flags7 >> 4;
    const formatVersion = (flags7 >> 2) & 0b00000011;
    const playChoice10 = (flags7 >> 1) & 0x01 ? true : false;
    const vsUnisystem = (flags7 >> 0) & 0x01 ? true : false;

    const programRamSize = arr.consume();

    const flags9 = arr.consume();
    const tvSystem1 = (flags9 & 0x01) === 1? TvSystem.PAL : TvSystem.NTSC;

    const flags10 = arr.consume();
    const busConflicts = (flags10 >> 4) & 0x01 ? true : false;
    const containsProgramRam = (flags10 >> 3) & 0x01 ? true : false;
    const tvSystem2 = (flags10 & 0b00000011) === 0 ? TvSystem.NTSC : (flags10 & 0b00000011) === 1 ? TvSystem.PAL : TvSystem.DualCompatible; 

    arr.consume(); // byte 11 (unused)
    arr.consume(); // byte 12 (unused)
    arr.consume(); // byte 13 (unused)
    arr.consume(); // byte 14 (unused)
    arr.consume(); // byte 15 (unused)

    const trainer = [];
    if(containsTrainer) {
        for(let i = 0; i < 512; i++) {
            trainer.push(arr.consume());
        }
    }

    const programMemory = [];
    const patternMemory = [];
    if(formatVersion === 2) {
        throw new Error("NES 2.0 format is currently not supported.");
    } else {
        for(let i = 0; i < programMemoryChunks * 16384; i++) {
            programMemory.push(arr.consume());
        }

        for(let i = 0; i < patternMemoryChunks * 8192; i++) {
            patternMemory.push(arr.consume());
        }
    }

    const mapperNumber = (mapperUpper & 0xF0) | (mapperLower >> 4);

    return {
        header: {
            programMemoryChunks,
            patternMemoryChunks,
            mapperLower,
            fourScreen,
            containsTrainer,
            containsPersistentMemory,
            mirroring,
            mapperUpper,
            formatVersion,
            playChoice10,
            vsUnisystem,
            programRamSize,
            tvSystem1,
            busConflicts,
            containsProgramRam,
            tvSystem2,
            mapperNumber
        },
        trainer,
        programMemory,
        patternMemory,
    }
}

export const getMapper = (mapperNumber: number, programMemoryChunks: number, patternMemoryChunks: number) => {
    if(mapperNumber === 0) return new Mapper000(programMemoryChunks, patternMemoryChunks);
    throw new Error("Unknown mapper number " + mapperNumber);
}