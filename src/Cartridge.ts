import { uint8 } from "./types";
import Mapper from "./Mapper";
import Bus from "./bus/Bus";

enum MirroringDirection {
    Vertical,
    Horizontal
}

export default class Cartridge {

    programRomSize: number;
    patternRomSize: number;
    //mapper: Mapper;
    mirroring: MirroringDirection;
    containsPersistentMemory: boolean;
    containsTrainer: boolean;
    disableMirroring: boolean;

    constructor(bytes: number[]) {
        let a = bytes[0];
        let b = bytes[1];
        let c = bytes[2];
        let d = bytes[3];

        if(a !== 0x4E || b !== 0x45 || c !== 0x53 || d !== 0x1A) {
            throw new Error("Invalid iNES header.");
        }

        this.programRomSize = bytes[4];
        this.patternRomSize = bytes[5];

        this.mirroring = (bytes[6] & 0x01) ? MirroringDirection.Vertical : MirroringDirection.Horizontal;
        this.containsPersistentMemory = (bytes[6] >> 1) & 0x01 ? true : false
        this.containsTrainer = (bytes[6] >> 2) & 0x01 ? true : false;
        this.disableMirroring = (bytes[6] >> 3) & 0x01 ? true : false;

        const mapperId = (bytes[7] & 0xF0) | (bytes[6] >> 4);
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