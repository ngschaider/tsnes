import { uint8 } from "../../../src/types";
import { setup } from "../utils";

const testNop = (opcode: uint8) => {
    let {cpu, ram} = setup();
    cpu.status.fromUint8(0x3D);
    cpu.a = 0xAB;
    cpu.x = 0xCD;
    cpu.y = 0xEF;
    cpu.stkp = 0x37;

    // NOP should do nothing, just check that it does not change any registers
    // NOP takes 2 cycles
    ram.write(0x8000, opcode);

    cpu.stepInstruction();
    
    expect(cpu.status.toUint8()).toBe(0x3D);
    expect(cpu.a).toBe(0xAB);
    expect(cpu.x).toBe(0xCD);
    expect(cpu.y).toBe(0xEF);
    expect(cpu.stkp).toBe(0x37);
}

describe("CPU - NOP", () => {    
    test("0x04 - NOP (Implied)", () => {
        testNop(0x04);
    });
    
    test("0x0C - NOP (Implied)", () => {
        testNop(0x0C);
    });

    test("0x14 - NOP (Implied)", () => {
        testNop(0x14);
    });

    test("0x1A - NOP (Implied)", () => {
        testNop(0x1A);
    });
    
    test("0x1C - NOP (Implied)", () => {
        testNop(0x1C);
    });

    test("0x34 - NOP (Implied)", () => {
        testNop(0x34);
    });
    
    test("0x3A - NOP (Implied)", () => {
        testNop(0x3A);
    });
    
    test("0x3C - NOP (Implied)", () => {
        testNop(0x3C);
    });
    
    test("0x44 - NOP (Implied)", () => {
        testNop(0x44);
    });

    test("0x54 - NOP (Implied)", () => {
        testNop(0x54);
    });

    test("0x5A - NOP (Implied)", () => {
        testNop(0x5A);
    });
    
    test("0x5C - NOP (Implied)", () => {
        testNop(0x5C);
    });

    test("0x64 - NOP (Implied)", () => {
        testNop(0x64);
    });
    
    test("0x74 - NOP (Implied)", () => {
        testNop(0x74);
    });

    test("0x7A - NOP (Implied)", () => {
        testNop(0x7A);
    });
    
    test("0x7C - NOP (Implied)", () => {
        testNop(0x7C);
    });
    
    test("0x80 - NOP (Implied)", () => {
        testNop(0x80);
    });
    
    test("0x82 - NOP (Implied)", () => {
        testNop(0x82);
    });
    
    test("0x89 - NOP (Implied)", () => {
        testNop(0x89);
    });
    
    test("0x9C - NOP (Implied)", () => {
        testNop(0x9C);
    });
    
    test("0xC2 - NOP (Implied)", () => {
        testNop(0xC2);
    });
    
    test("0xD4 - NOP (Implied)", () => {
        testNop(0xD4);
    });
    
    test("0xDA - NOP (Implied)", () => {
        testNop(0xDA);
    });
    
    test("0xDC - NOP (Implied)", () => {
        testNop(0xDC);
    });
    
    test("0xE2 - NOP (Implied)", () => {
        testNop(0xE2);
    });
    
    test("0xF4 - NOP (Implied)", () => {
        testNop(0xF4);
    });
    
    test("0xFA - NOP (Implied)", () => {
        testNop(0xFA);
    });
    
    test("0xFC - NOP (Implied)", () => {
        testNop(0xFC);
    });

    test("0xEA - NOP (Implied)", () => {
        testNop(0xEA);
    });
});