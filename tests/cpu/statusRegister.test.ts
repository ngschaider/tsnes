import StatusRegister from "../../src/cpu/StatusRegister";

let status: StatusRegister;

describe("CPU - BASICS", () => {
    const setup = () => {
        status = new StatusRegister();
    }

    test("toUint8()", () => {
        setup();
        status.C = false;
        status.Z = false;
        status.I = false;
        status.D = false;
        status.B = true;
        status.U = true;
        status.V = true;
        status.N = true;

        expect(status.toUint8()).toBe(0b11110000);
    });

    test("fromUint8()", () => {
        setup();
        status.fromUint8(0b11110000);

        expect(status.C).toBe(false);
        expect(status.Z).toBe(false);
        expect(status.I).toBe(false);
        expect(status.D).toBe(false);
        expect(status.B).toBe(true);
        expect(status.U).toBe(true);
        expect(status.V).toBe(true);
        expect(status.N).toBe(true);
    });
});