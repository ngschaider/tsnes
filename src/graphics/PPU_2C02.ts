import Color from "./Color"
import Bus from "../bus/Bus";
import { Address, uint8 } from "../types";

export default class PPU_2C02 {

    framebuffer: Color[] = [];

    width: number;
    height: number;

    cpuBus: Bus;
    ppuBus: Bus;

    scanline: number = 0;
    cycle: number = 0;
    frameComplete: boolean = false;

    colors: Color[] = [];

    constructor(ppuBus: Bus, cpuBus: Bus, width: number = 340, height: number = 260) {
        this.colors[0x00] = new Color(84, 84, 84);
        this.colors[0x01] = new Color(0, 30, 116);
        this.colors[0x02] = new Color(8, 16, 144);
        this.colors[0x03] = new Color(48, 0, 136);
        this.colors[0x04] = new Color(68, 0, 100);
        this.colors[0x05] = new Color(92, 0, 48);
        this.colors[0x06] = new Color(84, 4, 0);
        this.colors[0x07] = new Color(60, 24, 0);
        this.colors[0x08] = new Color(32, 42, 0);
        this.colors[0x09] = new Color(8, 58, 0);
        this.colors[0x0A] = new Color(0, 64, 0);
        this.colors[0x0B] = new Color(0, 60, 0);
        this.colors[0x0C] = new Color(0, 50, 60);
        this.colors[0x0D] = new Color(0, 0, 0);
        this.colors[0x0E] = new Color(0, 0, 0);
        this.colors[0x0F] = new Color(0, 0, 0);
    
        this.colors[0x10] = new Color(152, 150, 152);
        this.colors[0x11] = new Color(8, 76, 196);
        this.colors[0x12] = new Color(48, 50, 236);
        this.colors[0x13] = new Color(92, 30, 228);
        this.colors[0x14] = new Color(136, 20, 176);
        this.colors[0x15] = new Color(160, 20, 100);
        this.colors[0x16] = new Color(152, 34, 32);
        this.colors[0x17] = new Color(120, 60, 0);
        this.colors[0x18] = new Color(84, 90, 0);
        this.colors[0x19] = new Color(40, 114, 0);
        this.colors[0x1A] = new Color(8, 124, 0);
        this.colors[0x1B] = new Color(0, 118, 40);
        this.colors[0x1C] = new Color(0, 102, 120);
        this.colors[0x1D] = new Color(0, 0, 0);
        this.colors[0x1E] = new Color(0, 0, 0);
        this.colors[0x1F] = new Color(0, 0, 0);
    
        this.colors[0x20] = new Color(236, 238, 236);
        this.colors[0x21] = new Color(76, 154, 236);
        this.colors[0x22] = new Color(120, 124, 236);
        this.colors[0x23] = new Color(176, 98, 236);
        this.colors[0x24] = new Color(228, 84, 236);
        this.colors[0x25] = new Color(236, 88, 180);
        this.colors[0x26] = new Color(236, 106, 100);
        this.colors[0x27] = new Color(212, 136, 32);
        this.colors[0x28] = new Color(160, 170, 0);
        this.colors[0x29] = new Color(116, 196, 0);
        this.colors[0x2A] = new Color(76, 208, 32);
        this.colors[0x2B] = new Color(56, 204, 108);
        this.colors[0x2C] = new Color(56, 180, 204);
        this.colors[0x2D] = new Color(60, 60, 60);
        this.colors[0x2E] = new Color(0, 0, 0);
        this.colors[0x2F] = new Color(0, 0, 0);
    
        this.colors[0x30] = new Color(236, 238, 236);
        this.colors[0x31] = new Color(168, 204, 236);
        this.colors[0x32] = new Color(188, 188, 236);
        this.colors[0x33] = new Color(212, 178, 236);
        this.colors[0x34] = new Color(236, 174, 236);
        this.colors[0x35] = new Color(236, 174, 212);
        this.colors[0x36] = new Color(236, 180, 176);
        this.colors[0x37] = new Color(228, 196, 144);
        this.colors[0x38] = new Color(204, 210, 120);
        this.colors[0x39] = new Color(180, 222, 120);
        this.colors[0x3A] = new Color(168, 226, 144);
        this.colors[0x3B] = new Color(152, 226, 180);
        this.colors[0x3C] = new Color(160, 214, 228);
        this.colors[0x3D] = new Color(160, 162, 160);
        this.colors[0x3E] = new Color(0, 0, 0);
        this.colors[0x3F] = new Color(0, 0, 0);

        this.cpuBus = cpuBus;
        this.ppuBus = ppuBus;

        this.width = width;
        this.height = height; 

        for(let y = 0; y < height; y++) {            
            for(let x = 0; x < width; x++) {
                this.framebuffer.push(new Color(0, 0, 0));
            }
        }

        cpuBus.onWrite.on(this.onCpuBusWrite.bind(this));
        cpuBus.onRead.on(this.onCpuBusRead.bind(this));

        ppuBus.onClock.on(this.onPpuBusClock.bind(this));
    }

    onCpuBusWrite(address: Address, value: uint8) {
        if(address < 0x2000 || address > 0x2007) {
            return;
        }

        if(address === 0x2000) {
            // Controller (PPUCTRL)
        } else if(address === 0x2001) {
            // Mask (PPUMASK)
        } else if(address === 0x2002) {
            // Status (PPUSTATUS)
        } else if(address === 0x2003) {
            // OAM address (OAMADDR)
        } else if(address === 0x2004) {
            // OAM data (OAMDATA)
        } else if(address === 0x2005) {
            // Scroll (PPUSCROLL)
        } else if(address === 0x2006) {
            // Address (PPUADDR)
        } else if(address === 0x2007) {
            // Data (PPUDATA)
        } else {
            throw new Error("Not implemented");
        }
    }
    onCpuBusRead(address: Address): uint8|undefined {
        if(address < 0x2000 || address > 0x2007) {
            return;
        }

        if(address === 0x2000) {
            // Controller (PPUCTRL)
        } else if(address === 0x2001) {
            // Mask (PPUMASK)
        } else if(address === 0x2002) {
            // Status (PPUSTATUS)
        } else if(address === 0x2003) {
            // OAM address (OAMADDR)
        } else if(address === 0x2004) {
            // OAM data (OAMDATA)
        } else if(address === 0x2005) {
            // Scroll (PPUSCROLL)
        } else if(address === 0x2006) {
            // Address (PPUADDR)
        } else if(address === 0x2007) {
            // Data (PPUDATA)
        } else {
            throw new Error("Not implemented");
        }
    }

    onPpuBusClock() {
        if(this.scanline >= 0 && this.cycle >= 0) {
            this.setPixel(this.cycle - 1, this.scanline, this.colors[Math.random() >= 0.5 ? 0x3F : 0x30]);
        }
        


        this.cycle++;
        if(this.cycle > 340) {
            this.cycle = 0;
            this.scanline++;
            if(this.scanline > 260) {
                this.scanline = -1;
                this.frameComplete = true;
            }
        }
    }
    
    setPixel(x: number, y: number, color: Color) {
        let index = x + this.width * y;
        this.framebuffer[index] = color;
    }

    getPixel(x: number, y: number): Color {
        const index = x + this.width * y;
        const value = this.framebuffer[index];
        return value || new Color(255, 0, 0);
    }

}