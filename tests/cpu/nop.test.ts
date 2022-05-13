import { countCycles, setupHardware } from "./utils";

describe("CPU - NOP", () => {    
    test("0x04 - NOP (IMP)", () => {
    
    });
    
    test("0x0C - NOP (IMP)", () => {
    
    });

    test("0x14 - NOP (IMP)", () => {
    
    });

    test("0x1A - NOP (IMP)", () => {
    
    });
    
    test("0x1C - NOP (IMP)", () => {
    
    });

    test("0x34 - NOP (IMP)", () => {
    
    });
    
    test("0x3A - NOP (IMP)", () => {
    
    });
    
    test("0x3C - NOP (IMP)", () => {
    
    });
    
    test("0x44 - NOP (IMP)", () => {
    
    });

    test("0x54 - NOP (IMP)", () => {
    
    });

    test("0x5A - NOP (IMP)", () => {
    
    });
    
    test("0x5C - NOP (IMP)", () => {
    
    });

    test("0x64 - NOP (IMP)", () => {
    
    });
    
    test("0x74 - NOP (IMP)", () => {
    
    });

    test("0x7A - NOP (IMP)", () => {
    
    });
    
    test("0x7C - NOP (IMP)", () => {
    
    });
    
    test("0x80 - NOP (IMP)", () => {
    
    });
    
    test("0x82 - NOP (IMP)", () => {
    
    });
    
    test("0x89 - NOP (IMP)", () => {
    
    });
    
    test("0x9C - NOP (IMP)", () => {
    
    });
    
    test("0xC2 - NOP (IMP)", () => {
    
    });
    
    test("0xD4 - NOP (IMP)", () => {
    
    });
    
    test("0xDA - NOP (IMP)", () => {
    
    });
    
    test("0xDC - NOP (IMP)", () => {
    
    });
    
    test("0xE2 - NOP (IMP)", () => {
    
    });
    
    test("0xF4 - NOP (IMP)", () => {
    
    });
    
    test("0xFA - NOP (IMP)", () => {
    
    });
    
    test("0xFC - NOP (IMP)", () => {
    
    });

    test("0xEA - NOP (IMP)", () => {
        let {cpu, ram} = setupHardware();
        cpu.status.fromUint8(0x3D);
        cpu.a = 0xAB;
        cpu.x = 0xCD;
        cpu.y = 0xEF;
        cpu.stkp = 0x37;

        // NOP should do nothing, just check that it does not change any registers
        // NOP takes 2 cycles
        ram.write(0x8000, 0x9C);

        cpu.clock();
        cpu.clock();
        
        expect(cpu.status.toUint8()).toBe(0x3D);
        expect(cpu.a).toBe(0xAB);
        expect(cpu.x).toBe(0xCD);
        expect(cpu.y).toBe(0xEF);
        expect(cpu.stkp).toBe(0x37);
    });
});