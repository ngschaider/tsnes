import { setup } from "../utils";

describe("CPU - NOP", () => {    
    test("0x04 - NOP (Implied)", () => {
    
    });
    
    test("0x0C - NOP (Implied)", () => {
    
    });

    test("0x14 - NOP (Implied)", () => {
    
    });

    test("0x1A - NOP (Implied)", () => {
    
    });
    
    test("0x1C - NOP (Implied)", () => {
    
    });

    test("0x34 - NOP (Implied)", () => {
    
    });
    
    test("0x3A - NOP (Implied)", () => {
    
    });
    
    test("0x3C - NOP (Implied)", () => {
    
    });
    
    test("0x44 - NOP (Implied)", () => {
    
    });

    test("0x54 - NOP (Implied)", () => {
    
    });

    test("0x5A - NOP (Implied)", () => {
    
    });
    
    test("0x5C - NOP (Implied)", () => {
    
    });

    test("0x64 - NOP (Implied)", () => {
    
    });
    
    test("0x74 - NOP (Implied)", () => {
    
    });

    test("0x7A - NOP (Implied)", () => {
    
    });
    
    test("0x7C - NOP (Implied)", () => {
    
    });
    
    test("0x80 - NOP (Implied)", () => {
    
    });
    
    test("0x82 - NOP (Implied)", () => {
    
    });
    
    test("0x89 - NOP (Implied)", () => {
    
    });
    
    test("0x9C - NOP (Implied)", () => {
    
    });
    
    test("0xC2 - NOP (Implied)", () => {
    
    });
    
    test("0xD4 - NOP (Implied)", () => {
    
    });
    
    test("0xDA - NOP (Implied)", () => {
    
    });
    
    test("0xDC - NOP (Implied)", () => {
    
    });
    
    test("0xE2 - NOP (Implied)", () => {
    
    });
    
    test("0xF4 - NOP (Implied)", () => {
    
    });
    
    test("0xFA - NOP (Implied)", () => {
    
    });
    
    test("0xFC - NOP (Implied)", () => {
    
    });

    test("0xEA - NOP (Implied)", () => {
        let {cpu, ram} = setup();
        cpu.status.fromUint8(0x3D);
        cpu.a = 0xAB;
        cpu.x = 0xCD;
        cpu.y = 0xEF;
        cpu.stkp = 0x37;

        // NOP should do nothing, just check that it does not change any registers
        // NOP takes 2 cycles
        ram.write(0x8000, 0x9C);

        cpu.stepInstruction();
        
        expect(cpu.status.toUint8()).toBe(0x3D);
        expect(cpu.a).toBe(0xAB);
        expect(cpu.x).toBe(0xCD);
        expect(cpu.y).toBe(0xEF);
        expect(cpu.stkp).toBe(0x37);
    });
});