import Cartridge from "./Cartridge";
import RAM from "./RAM";
import { AddressShifter } from "./bus/AddressShifter";
import Bus from "./bus/Bus";
import { Mirrorer } from "./bus/Mirrorer";
import CPU_6502 from "./cpu/CPU_6502";
import PPU_2C02 from "./graphics/PPU_2C02";

export default class NES {

    cpuBus: Bus;
    ppuBus: Bus;

    cpu: CPU_6502;
    ppu: PPU_2C02;

    cartridge?: Cartridge;

    constructor() {
        this.cpuBus = new Bus();
        this.cpu = new CPU_6502(this.cpuBus);
        const ram = new RAM(this.cpuBus, 0x0800);
        const ram2 = new Mirrorer(new AddressShifter(this.cpuBus, 0x0800), 0x0000, 0x0800);
        const ram3 = new Mirrorer(new AddressShifter(this.cpuBus, 0x1000), 0x0000, 0x0800);
        const ram4 = new Mirrorer(new AddressShifter(this.cpuBus, 0x1800), 0x0000, 0x0800);

        this.ppuBus = new Bus();
        this.ppu = new PPU_2C02(this.ppuBus, this.cpuBus); // responds on 0x2000 to 0x2007 on the cpu bus
        const patternTable0 = new RAM(this.ppuBus, 0x1000);
        const patternTable1 = new RAM(new AddressShifter(this.ppuBus, 0x1000), 0x1000);
        const nametable0 = new RAM(new AddressShifter(this.ppuBus, 0x2000), 1024);
        const nametable1 = new RAM(new AddressShifter(this.ppuBus, 0x2400), 1024);
        const nametable2 = new RAM(new AddressShifter(this.ppuBus, 0x2800), 1024);
        const nametable3 = new RAM(new AddressShifter(this.ppuBus, 0x2C00), 1024);
        const nametableMirror = new Mirrorer(this.ppuBus, 0x2000, 4096);
        const palette = new RAM(new AddressShifter(this.ppuBus, 0x3F00), 0x0020)
        const paletteMirror1 = new Mirrorer(new AddressShifter(this.ppuBus, 0x3F20), 0x3F00, 4096);
        const paletteMirror2 = new Mirrorer(new AddressShifter(this.ppuBus, 0x3F40), 0x3F00, 4096);

        // the 8 bytes for the PPU on the CPU bus are mirrored 1023 times (0x2008 - 0x3FFF is the mirror range, repeats every 8 bytes)
        for(let i = 0x2008; i < 0x4000; i += 0x0008) {
            const mirrorer = new Mirrorer(new AddressShifter(this.cpuBus, i), 0x2000, 0x0008);
        }
    }

    clockCounter: number = 0;

    clock() {
        this.ppuBus.clock();
        if(this.clockCounter % 3 === 0) {
            this.cpuBus.clock();
        }

        this.clockCounter++;
    }

    reset() {
        this.cpuBus.reset();
        this.ppuBus.reset();
        this.clockCounter = 0;
    }

    insertCartridge(cartridge: Cartridge) {
        if(this.cartridge) {
            this.cartridge.disconnect();
        }

        this.cartridge = cartridge;
        this.cartridge.connect();
    }

}