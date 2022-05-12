import Bus from "../src/mos6502/Bus";
import CPU from "../src/mos6502/CPU";
import RAM from "../src/mos6502/RAM";

let bus: Bus;
let ram: RAM;
let cpu: CPU;

describe("CPU - LEGAL OPCODES", () => {
    const countCycles = (until: () => boolean, max: number = 100) => {
        let cycles = 0;
        while(!until() || cpu.cycles > 0) {
            if(cycles > max) {
                throw new Error("Maximum amount of cycles reached when counting cycles");
            }
            cycles++;
            cpu.clock();
        }
        return cycles;
    }    

    const setupHardware = () => {
        cpu = new CPU();
        bus = new Bus();

        ram = new RAM();
        ram.load("00 80", 0xFFCC); // set reset vector

        bus.connectDevice(cpu);
        bus.connectDevice(ram);

        cpu.reset();
        for(let i = 0; i < 8; i++) {
            cpu.clock();
        }
    }

    test("0x09 - ORA (IMM)", () => {
        setupHardware();
        cpu.a = 0b11001100;

        ram.load("09", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(() => cpu.a === 0b11101110);
        expect(cycles).toBe(2);
    });

    test("0x18 - CLC (IMP)", () => {
        setupHardware();
        cpu.status.C = true;

        ram.load("18", 0x8000);

        let cycles = countCycles(() => !cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x28 - PLP (IMP)", () => {
        setupHardware();

        cpu.pushStack(0b11100011);
        ram.load("28", 0x8000);

        let cycles = countCycles(() => cpu.status.toUint8() === 0b11100011);
        expect(cycles).toBe(4);
    });

    test("0x29 - AND (IMM)", () => {
        setupHardware();
        cpu.a = 0b11001100;

        ram.load("29", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(() => cpu.a === 0b10001000);
        expect(cycles).toBe(2);
    });

    test("0x38 - SEC (IMP)", () => {
        setupHardware();

        ram.load("38", 0x8000);

        let cycles = countCycles(() => cpu.status.C);
        expect(cycles).toBe(2);
    });

    test("0x40 - RTI (IMP)", () => {

    });

    test("0x48 - PHA (IMP)", () => {
        setupHardware();
        cpu.a = 0x3D;

        ram.load("48", 0x8000);

        let cycles = countCycles(() => ram.read(0x01FD) === 0x3D);
        expect(cycles).toBe(3);
    })

    test("0x49 - EOR (IMM)", () => {
        setupHardware();
        cpu.a = 0b11001100;

        ram.load("49", 0x8000);
        ram.write(0x8001, 0b10101010);

        let cycles = countCycles(() => cpu.a === 0b01100110);
        expect(cycles).toBe(2);
    })

    test("0x58 - CLI (IMP)", () => {
        setupHardware();
        cpu.status.I = true;

        ram.load("58", 0x8000);

        let cycles = countCycles(() => !cpu.status.I);
        expect(cycles).toBe(2);
    })

    test("0x60 - RTS (IMP)", () => {

    });

    test("0x68 - PLA (IMP)", () => {
        setupHardware();
        cpu.pushStack(0x3D);

        ram.load("68", 0x8000);

        let cycles = countCycles(() => cpu.a === 0x3D);
        expect(cycles).toBe(4);
    });

    test("0x69 - ADC (IMM)", () => {
        setupHardware();
        cpu.a = 0b01001101;

        ram.load("69", 0x8000);
        ram.write(0x8001, 0b00110101);

        let cycles = countCycles(() => cpu.a === 0b10000010);
        expect(cycles).toBe(2);
    });

    test("0x78 - SEI (IMP)", () => {
        setupHardware();
        cpu.status.I = false;

        ram.load("78", 0x8000);

        let cycles = countCycles(() => cpu.status.I);
        expect(cycles).toBe(2);
    });

    test("0x88 - DEY (IMP)", () => {
        setupHardware();
        cpu.y = 0x3D;

        ram.load("88", 0x8000);

        let cycles = countCycles(() => cpu.y === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0x8A - TXA (IMP)", () => {
        setupHardware();
        cpu.x = 0x3D;

        ram.load("8A", 0x8000);

        let cycles = countCycles(() => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x98 - TYA (IMP)", () => {
        setupHardware();
        cpu.y = 0x3D;

        ram.load("98", 0x8000);

        let cycles = countCycles(() => cpu.a === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0x9A - TXS (IMP)", () => {
        setupHardware();
        cpu.x = 0x3D;

        ram.load("9A", 0x8000);

        let cycles = countCycles(() => cpu.stkp === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA0 - LDY (IMM)", () => {
        setupHardware();

        // LDY #$3D
        ram.load("A0 3D", 0x8000);

        let cycles = countCycles(() => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA2 - LDX (IMM)", () => {
        setupHardware();

        // LDX #$3D
        ram.load("A2 3D", 0x8000);

        let cycles = countCycles(() => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    });

    test("0xA8 - TAY (IMP)", () => {
        setupHardware();
        cpu.a = 0x3D;

        ram.load("A8", 0x8000);

        let cycles = countCycles(() => cpu.y === 0x3D);
        expect(cycles).toBe(2);
    })

    test("0xAA - TAX (IMP)", () => {
        setupHardware();
        cpu.a = 0x3D;

        ram.load("AA", 0x8000);

        let cycles = countCycles(() => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })

    test("0xB8 - CLV (IMP)", () => {
        setupHardware();
        cpu.status.V = true;

        ram.load("B8", 0x8000);

        let cycles = countCycles(() => !cpu.status.V);
        expect(cycles).toBe(2);
    });

    test("0xBA - TSX (IMP)", () => {
        setupHardware();
        cpu.stkp = 0x3D;

        ram.load("BA", 0x8000);

        let cycles = countCycles(() => cpu.x === 0x3D);
        expect(cycles).toBe(2);
    })

    test("0xC0 - CPY (IMM)", () => {

    });

    test("0xC8 - INY (IMP)", () => {
        setupHardware();
        cpu.y = 0x3D;

        ram.load("C8", 0x8000);

        let cycles = countCycles(() => cpu.y === 0x3E);
        expect(cycles).toBe(2);
    })

    test("0xC9 - CMP (IMM)", () => {

    });

    test("0xCA - DEX (IMP)", () => {
        setupHardware();
        cpu.x = 0x3D;

        ram.load("CA", 0x8000);

        let cycles = countCycles(() => cpu.x === 0x3C);
        expect(cycles).toBe(2);
    });

    test("0xD8 - CLD (IMP)", () => {
        setupHardware();
        cpu.status.D = true;

        ram.load("D8", 0x8000);

        let cycles = countCycles(() => !cpu.status.D);
        expect(cycles).toBe(2);
    });

    test("0xE0 - CPX (IMM)", () => {

    });

    test("0xE8 - INX (IMP)", () => {
        setupHardware();
        cpu.x = 0x3D;

        ram.load("E8", 0x8000);

        let cycles = countCycles(() => cpu.x === 0x3E);
        expect(cycles).toBe(2);
    });

    test("0xE9 - SBC (IMM)", () => {
        
    });

    test("0xEA - NOP (IMP)", () => {
        setupHardware();
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

    test("0xF8 - SED (IMP)", () => {
        setupHardware();
        cpu.status.D = false;

        ram.load("F8", 0x8000);

        let cycles = countCycles(() => cpu.status.D);
        expect(cycles).toBe(2);
    });

    test("0xA9 - LDA (IMM)", () => {
        setupHardware();
        
        // LDA #$3D
        ram.load("A9 3D", 0x8000);

        let cycles = countCycles(() => cpu.a === 0x3D); 
        expect(cycles).toBe(2);
    });
});