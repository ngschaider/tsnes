import { countCycles, setupHardware } from "./utils";

describe("CPU - LEGAL OPCODES", () => {


    
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

    test("0x61 - ADC (IZX)", () => {
    
    });
    
    test("0x64 - NOP (IMP)", () => {
    
    });

    
    test("0x6C - JMP (IND)", () => {
    
    });
    
    test("0x71 - ADC (IZY)", () => {
    
    });
    
    test("0x74 - NOP (IMP)", () => {
    
    });
    
    test("0x75 - ADC (ZPX)", () => {
    
    });
    
    test("0x76 - ROR (ZPX)", () => {
    
    });
    
    test("0x79 - ADC (ABY)", () => {
    
    });
    
    test("0x7A - NOP (IMP)", () => {
    
    });
    
    test("0x7C - NOP (IMP)", () => {
    
    });
    
    test("0x7D - ADC (ABX)", () => {
    
    });
    
    test("0x7E - ROR (ABX)", () => {
    
    });
    
    test("0x80 - NOP (IMP)", () => {
    
    });
    
    test("0x81 - STA (IZX)", () => {
    
    });
    
    test("0x82 - NOP (IMP)", () => {
    
    });
    
    test("0x84 - STY (ZP0)", () => {
    
    });
    
    test("0x85 - STA (ZP0)", () => {
    
    });
    
    test("0x86 - STX (ZP0)", () => {
    
    });
    
    test("0x89 - NOP (IMP)", () => {
    
    });
    
    test("0x8C - STY (ABS)", () => {
    
    });
    
    test("0x8D - STA (ABS)", () => {
    
    });
    
    test("0x8E - STX (ABS)", () => {
    
    });
    
    test("0x90 - BCC (REL)", () => {
    
    });
    
    test("0x91 - STA (IZY)", () => {
    
    });
    
    test("0x94 - STY (ZPX)", () => {
    
    });
    
    test("0x95 - STA (ZPX)", () => {
    
    });
    
    test("0x96 - STX (ZPY)", () => {
    
    });
    
    test("0x99 - STA (ABY)", () => {
    
    });
    
    test("0x9C - NOP (IMP)", () => {
    
    });
    
    test("0x9D - STA (ABX)", () => {
    
    });
    
    test("0xA1 - LDA (IZX)", () => {
    
    });
    
    test("0xA2 - LDX (IMM)", () => {
    
    });
    
    test("0xA4 - LDY (ZP0)", () => {
    
    });
    
    test("0xA5 - LDA (ZP0)", () => {
    
    });
    
    test("0xA6 - LDX (ZP0)", () => {
    
    });
    
    test("0xAC - LDY (ABS)", () => {
    
    });
    
    test("0xAD - LDA (ABS)", () => {
    
    });
    
    test("0xAE - LDX (ABS)", () => {
    
    });
    
    test("0xB0 - BCS (REL)", () => {
    
    });
    
    test("0xB1 - LDA (IZY)", () => {
    
    });
    
    test("0xB4 - LDY (ZPX)", () => {
    
    });
    
    test("0xB5 - LDA (ZPX)", () => {
    
    });
    
    test("0xB6 - LDX (ZPY)", () => {
    
    });
    
    test("0xB9 - LDA (ABY)", () => {
    
    });
    
    test("0xBC - LDY (ABX)", () => {
    
    });
    
    test("0xBD - LDA (ABX)", () => {
    
    });
    
    test("0xBE - LDX (ABY)", () => {
    
    });
    
    test("0xC1 - CMP (IZX)", () => {
    
    });
    
    test("0xC2 - NOP (IMP)", () => {
    
    });
    
    test("0xC4 - CPY (ZP0)", () => {
    
    });
    
    test("0xC5 - CMP (ZP0)", () => {
    
    });
    
    test("0xC6 - DEC (ZP0)", () => {
    
    });
    
    test("0xCC - CPY (ABS)", () => {
    
    });
    
    test("0xCD - CMP (ABS)", () => {
    
    });
    
    test("0xCE - DEC (ABS)", () => {
    
    });
    
    test("0xD0 - BNE (REL)", () => {
    
    });
    
    test("0xD1 - CMP (IZY)", () => {
    
    });
    
    test("0xD4 - NOP (IMP)", () => {
    
    });
    
    test("0xD5 - CMP (ZPX)", () => {
    
    });
    
    test("0xD6 - DEC (ZPX)", () => {
    
    });
    
    test("0xD9 - CMP (ABY)", () => {
    
    });
    
    test("0xDA - NOP (IMP)", () => {
    
    });
    
    test("0xDC - NOP (IMP)", () => {
    
    });
    
    test("0xDD - CMP (ABX)", () => {
    
    });
    
    test("0xDE - DEC (ABX)", () => {
    
    });
    
    test("0xE1 - SBC (IZX)", () => {
    
    });
    
    test("0xE2 - NOP (IMP)", () => {
    
    });
    
    test("0xE4 - CPX (ZP0)", () => {
    
    });
    
    test("0xE5 - SBC (ZP0)", () => {
    
    });
    
    test("0xE6 - INC (ZP0)", () => {
    
    });
    
    test("0xEB - SBC (IMP)", () => {
    
    });
    
    test("0xEC - CPX (ABS)", () => {
    
    });
    
    test("0xED - SBC (ABS)", () => {
    
    });
    
    test("0xEE - INC (ABS)", () => {
    
    });
    
    test("0xF0 - BEQ (REL)", () => {
    
    });
    
    test("0xF1 - SBC (IZY)", () => {
    
    });
    
    test("0xF4 - NOP (IMP)", () => {
    
    });
    
    test("0xF5 - SBC (ZPX)", () => {
    
    });
    
    test("0xF6 - INC (ZPX)", () => {
    
    });
    
    test("0xF9 - SBC (ABY)", () => {
    
    });
    
    test("0xFA - NOP (IMP)", () => {
    
    });
    
    test("0xFC - NOP (IMP)", () => {
    
    });
    
    test("0xFD - SBC (ABX)", () => {
    
    });
    
    test("0xFE - INC (ABX)", () => {
    
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