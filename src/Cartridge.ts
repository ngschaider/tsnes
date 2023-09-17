import { uint8 } from "./types";
import Mapper from "./Mapper";
import Bus from "./bus/Bus";
import { ArrayConsumer } from "./ArrayConsumer";

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
    programRomBanks: number;
    patternRomBanks: number;
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
}

export default class Cartridge {

    header: Header;
    programRom: uint8[] = [];
    patternRom: uint8[] = [];

    trainer: uint8[] = [];


    constructor(bytes: number[]) {
        const arr = new ArrayConsumer(bytes);

        if(arr.consume() !== 0x4E || arr.consume() !== 0x45 || arr.consume() !== 0x53 || arr.consume() !== 0x1A) {
            throw new Error("Invalid iNES header.");
        }

        const programRomSize = arr.consume();
        const patternRomSize = arr.consume();

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

        this.header = {
            programRomBanks: programRomSize,
            patternRomBanks: patternRomSize,
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
        };

        arr.consume(); // byte 11 (unused)
        arr.consume(); // byte 12 (unused)
        arr.consume(); // byte 13 (unused)
        arr.consume(); // byte 14 (unused)
        arr.consume(); // byte 15 (unused)

        if(this.header.containsTrainer) {
            for(let i = 0; i < 512; i++) {
                this.trainer.push(arr.consume());
            }
        }

        if(this.header.formatVersion === 1) {
            for(let i = 0; i < this.header.programRomBanks * 16384; i++) {
                this.programRom.push(arr.consume());
            }
    
            for(let i = 0; i < this.header.patternRomBanks * 8192; i++) {
                this.patternRom.push(arr.consume());
            }
        }
        
    }

    static loadFromFile(file: File, cb: (cartridge: Cartridge) => void) {
        let reader: FileReader = new FileReader();
        reader.onloadend = (ev: ProgressEvent<FileReader>) => {
            if(!ev.target || typeof(ev.target.result) !== "string") {
                return;
            }

            let bytes = [];
            for(let a of ev.target.result.split("")) {
                bytes.push(a.charCodeAt(0));
            };

            const cartridge = new Cartridge(bytes);
            cb(cartridge);
        };
        reader.readAsBinaryString(file);
    }

    ppuBus?: Bus;
    cpuBus?: Bus;

    connectBus(ppuBus: Bus, cpuBus: Bus) {
        this.ppuBus = ppuBus;
        this.cpuBus = cpuBus;
    }

    disconnectBus() {
        delete this.ppuBus;
        delete this.cpuBus;
    }
}