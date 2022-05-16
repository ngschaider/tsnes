import RAM from "../../../src/RAM";
import { setupHardware, countCycles } from "../utils";

describe("CPU - INCREMENT", () => {
    test("0xE8 - INX (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.x = 0x3D;

        ram.load(0x8000, "E8");

        let cycles = countCycles(cpu, () => cpu.x === 0x3E);
        expect(cycles).toBe(2);
    });

    test("0xC8 - INY (Implied)", () => {
        let {cpu, ram} = setupHardware();
        cpu.y = 0x3D;

        ram.load(0x8000, "C8");

        let cycles = countCycles(cpu, () => cpu.y === 0x3E);
        expect(cycles).toBe(2);
    })
    
    test("0xE6 - INC (ZP)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0x0022, "3D");
        ram.load(0x8000, "E6 22");

        let cycles = countCycles(cpu, () => ram.read(0x0022) === 0x3E);
        expect(cycles).toBe(5)
    });
    
    test("0xEE - INC (ABS)", () => {
        let {cpu, ram} = setupHardware();

        ram.load(0xC0DE, "3D");
        ram.load(0x8000, "EE DE C0");

        let cycles = countCycles(cpu, () => ram.read(0xC0DE) === 0x3E);
        expect(cycles).toBe(6);
    });
    
    test("0xF6 - INC (ZP_X)", () => {
        let {cpu, ram} = setupHardware();

        cpu.x = 0x04;

        ram.load(0x0022 + 0x04, "3D");
        ram.load(0x8000, "F6 22");
        
        let cycles = countCycles(cpu, () => ram.read(0x0022 + 0x04) === 0x3E);
        expect(cycles).toBe(6);
    });
        
    test("0xFE - INC (ABS_X)", () => {
        let {cpu, ram} = setupHardware();

        cpu.x = 0x04;

        ram.load(0x8000, "FE DE C0");
        ram.load(0xC0DE + 0x04, "3D");

        let cycles = countCycles(cpu, () => ram.read(0xC0DE + 0x04) === 0x3E);
        expect(cycles).toBe(7);
    });

});