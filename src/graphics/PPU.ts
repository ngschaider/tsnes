import Color from "./Color"
import Bus from "../bus/Bus";
import { Address, uint8 } from "../types";

export default class PPU {

    framebuffer: Color[] = [];

    width: number;
    height: number;

    cpuBus: Bus;
    ppuBus: Bus;

    constructor(ppuBus: Bus, cpuBus: Bus, width: number = 600, height: number = 240) {
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
    }

    onCpuBusWrite(address: Address, value: uint8) {
        if(address < 0x2000 || address > 0x2007) {
            return;
        }

        if(address === 0x2000) {
            // Controller (PPUCTRL)
        } else if(address === 0x2001) {
            // Mask (PPUMASK)
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
        }

        throw new Error("Not implemented");
    }
    onCpuBusRead(address: Address): uint8|undefined {
        if(address < 0x2000 || address > 0x2007) {
            return;
        }
        
        if(address === 0x2002) {
            // Status (PPUSTATUS)
        } else if(address === 0x2004) {
            // OAM data (OAMDATA)
        } else if(address === 0x2007) {
            // Data (PPUDATA)
        }

        throw new Error("Not implemented");
    }
    
    setPixel(x: number, y: number, color: Color) {
        let index = x + this.width * y;
        this.framebuffer[index] = color;
    }

}