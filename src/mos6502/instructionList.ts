import ABS from "./addressingModes/ABS";
import ABX from "./addressingModes/ABX";
import ABY from "./addressingModes/ABY";
import IMM from "./addressingModes/IMM";
import IMP from "./addressingModes/IMP";
import IND from "./addressingModes/IND";
import IZX from "./addressingModes/IZX";
import IZY from "./addressingModes/IZY";
import REL from "./addressingModes/REL";
import ZP0 from "./addressingModes/ZP0";
import ZPX from "./addressingModes/ZPX";
import ZPY from "./addressingModes/ZPY";

import ADC from "./instructions/ADC"
import AND from "./instructions/AND"
import ASL from "./instructions/ASL"
import BCC from "./instructions/BCC"
import BCS from "./instructions/BCS"
import BEQ from "./instructions/BEQ"
import BIT from "./instructions/BIT"
import BMI from "./instructions/BMI"
import BNE from "./instructions/BNE"
import BPL from "./instructions/BPL"
import BRK from "./instructions/BRK"
import BVC from "./instructions/BVC"
import BVS from "./instructions/BVS"
import CLC from "./instructions/CLC"
import CLD from "./instructions/CLD"
import CLI from "./instructions/CLI"
import CLV from "./instructions/CLV"
import CMP from "./instructions/CMP"
import CPX from "./instructions/CPX"
import CPY from "./instructions/CPY"
import DEC from "./instructions/DEC"
import DEX from "./instructions/DEX"
import DEY from "./instructions/DEY"
import EOR from "./instructions/EOR"
import INC from "./instructions/INC"
import INX from "./instructions/INX"
import INY from "./instructions/INY"
import JMP from "./instructions/JMP"
import JSR from "./instructions/JSR"
import LDA from "./instructions/LDA"
import LDX from "./instructions/LDX"
import LDY from "./instructions/LDY"
import LSR from "./instructions/LSR"
import NOP from "./instructions/NOP"
import ORA from "./instructions/ORA"
import PHA from "./instructions/PHA"
import PHP from "./instructions/PHP"
import PLA from "./instructions/PLA"
import PLP from "./instructions/PLP"
import ROL from "./instructions/ROL"
import ROR from "./instructions/ROR"
import RTI from "./instructions/RTI"
import RTS from "./instructions/RTS"
import SBC from "./instructions/SBC"
import SEC from "./instructions/SEC"
import SED from "./instructions/SED"
import SEI from "./instructions/SEI"
import STA from "./instructions/STA"
import STX from "./instructions/STX"
import STY from "./instructions/STY"
import TAX from "./instructions/TAX"
import TAY from "./instructions/TAY"
import TSX from "./instructions/TSX"
import TXA from "./instructions/TXA"
import TXS from "./instructions/TXS"
import TYA from "./instructions/TYA"
import XXX from "./instructions/XXX"
import { uint8 } from "./types";

export const instructionList = [
    new BRK(0x00, new IMM()),
    new ORA(0x01, new IZX()),
    new XXX(0x02),
    new XXX(0x03),
    new NOP(0x04, new IMP()),
    new ORA(0x05, new ZP0()),
    new ASL(0x06, new ZP0()),
    new XXX(0x07),
    new PHP(0x08, new IMP()),
    new ORA(0x09, new IMM()),
    new ASL(0x0A, new IMP()),
    new XXX(0x0B),
    new NOP(0x0C, new IMP()),
    new ORA(0x0D, new ABS()),
    new ASL(0x0E, new ABS()),
    new XXX(0x0F),
    new BPL(0x10, new REL()),
    new ORA(0x11, new IZY()),
    new XXX(0x12),
    new XXX(0x13),
    new NOP(0x14, new IMP()),
    new ORA(0x15, new ZPX()),
    new ASL(0x16, new ZPX()),
    new XXX(0x17),
    new CLC(0x18, new IMP()),
    new ORA(0x19, new ABY()),
    new NOP(0x1A, new IMP()),
    new XXX(0x1B),
    new NOP(0x1C, new IMP()),
    new ORA(0x1D, new ABX()),
    new ASL(0x1E, new ABX()),
    new XXX(0x1F),
    new JSR(0x20, new ABS()),
    new AND(0x21, new IZX()),
    new XXX(0x22),
    new XXX(0x23),
    new BIT(0x24, new ZP0()),
    new AND(0x25, new ZP0()),
    new ROL(0x26, new ZP0()),
    new XXX(0x27),
    new PLP(0x28, new IMP()),
    new AND(0x29, new IMM()),
    new ROL(0x2A, new IMP()),
    new XXX(0x2B),
    new BIT(0x2C, new ABS()),
    new AND(0x2D, new ABS()),
    new ROL(0x2E, new ABS()),
    new XXX(0x2F),
    new BMI(0x30, new REL()),
    new AND(0x31, new IZY()),
    new XXX(0x32),
    new XXX(0x33),
    new NOP(0x34, new IMP()),
    new AND(0x35, new ZPX()),
    new ROL(0x36, new ZPX()),
    new XXX(0x37),
    new SEC(0x38, new IMP()),
    new AND(0x39, new ABY()),
    new NOP(0x3A, new IMP()),
    new XXX(0x3B),
    new NOP(0x3C, new IMP()),
    new AND(0x3D, new ABX()),
    new ROL(0x3E, new ABX()),
    new XXX(0x3F),
    new RTI(0x40, new IMP()),
    new EOR(0x41, new IZX()),
    new XXX(0x42),
    new XXX(0x43),
    new NOP(0x44, new IMP()),
    new EOR(0x45, new ZP0()),
    new LSR(0x46, new ZP0()),
    new XXX(0x47),
    new PHA(0x48, new IMP()),
    new EOR(0x49, new IMM()),
    new LSR(0x4A, new IMP()),
    new XXX(0x4B),
    new JMP(0x4C, new ABS()),
    new EOR(0x4D, new ABS()),
    new LSR(0x4E, new ABS()),
    new XXX(0x4F),
    new BVC(0x50, new REL()),
    new EOR(0x51, new IZY()),
    new XXX(0x52),
    new XXX(0x53),
    new NOP(0x54, new IMP()),
    new EOR(0x55, new ZPX()),
    new LSR(0x56, new ZPX()),
    new XXX(0x57),
    new CLI(0x58, new IMP()),
    new EOR(0x59, new ABY()),
    new NOP(0x5A, new IMP()),
    new XXX(0x5B),
    new NOP(0x5C, new IMP()),
    new EOR(0x5D, new ABX()),
    new LSR(0x5E, new ABX()),
    new XXX(0x5F),
    new RTS(0x60, new IMP()),
    new ADC(0x61, new IZX()),
    new XXX(0x62),
    new XXX(0x63),
    new NOP(0x64, new IMP()),
    new ADC(0x65, new ZP0()),
    new ROR(0x66, new ZP0()),
    new XXX(0x67),
    new PLA(0x68, new IMP()),
    new ADC(0x69, new IMM()),
    new ROR(0x6A, new IMP()),
    new XXX(0x6B),
    new JMP(0x6C, new IND()),
    new ADC(0x6D, new ABS()),
    new ROR(0x6E, new ABS()),
    new XXX(0x6F),
    new BVS(0x70, new REL()),
    new ADC(0x71, new IZY()),
    new XXX(0x72),
    new XXX(0x73),
    new NOP(0x74, new IMP()),
    new ADC(0x75, new ZPX()),
    new ROR(0x76, new ZPX()),
    new XXX(0x77),
    new SEI(0x78, new IMP()),
    new ADC(0x79, new ABY()),
    new NOP(0x7A, new IMP()),
    new XXX(0x7B),
    new NOP(0x7C, new IMP()),
    new ADC(0x7D, new ABX()),
    new ROR(0x7E, new ABX()),
    new XXX(0x7F),
    new NOP(0x80, new IMP()),
    new STA(0x81, new IZX()),
    new NOP(0x82, new IMP()),
    new XXX(0x83),
    new STY(0x84, new ZP0()),
    new STA(0x85, new ZP0()),
    new STX(0x86, new ZP0()),
    new XXX(0x87),
    new DEY(0x88, new IMP()),
    new NOP(0x89, new IMP()),
    new TXA(0x8A, new IMP()),
    new XXX(0x8B),
    new STY(0x8C, new ABS()),
    new STA(0x8D, new ABS()),
    new STX(0x8E, new ABS()),
    new XXX(0x8F),
    new BCC(0x90, new REL()),
    new STA(0x91, new IZY()),
    new XXX(0x92),
    new XXX(0x93),
    new STY(0x94, new ZPX()),
    new STA(0x95, new ZPX()),
    new STX(0x96, new ZPY()),
    new XXX(0x97),
    new TYA(0x98, new IMP()),
    new STA(0x99, new ABY()),
    new TXS(0x9A, new IMP()),
    new XXX(0x9B),
    new NOP(0x9C, new IMP()),
    new STA(0x9D, new ABX()),
    new XXX(0x9E),
    new XXX(0x9F),
    new LDY(0xA0, new IMM()),
    new LDA(0xA1, new IZX()),
    new LDX(0xA2, new IMM()),
    new XXX(0xA3),
    new LDY(0xA4, new ZP0()),
    new LDA(0xA5, new ZP0()),
    new LDX(0xA6, new ZP0()),
    new XXX(0xA7),
    new TAY(0xA8, new IMP()),
    new LDA(0xA9, new IMM()),
    new TAX(0xAA, new IMP()),
    new XXX(0xAB),
    new LDY(0xAC, new ABS()),
    new LDA(0xAD, new ABS()),
    new LDX(0xAE, new ABS()),
    new XXX(0xAF),
    new BCS(0xB0, new REL()),
    new LDA(0xB1, new IZY()),
    new XXX(0xB2),
    new XXX(0xB3),
    new LDY(0xB4, new ZPX()),
    new LDA(0xB5, new ZPX()),
    new LDX(0xB6, new ZPY()),
    new XXX(0xB7),
    new CLV(0xB8, new IMP()),
    new LDA(0xB9, new ABY()),
    new TSX(0xBA, new IMP()),
    new XXX(0xBB),
    new LDY(0xBC, new ABX()),
    new LDA(0xBD, new ABX()),
    new LDX(0xBE, new ABY()),
    new XXX(0xBF),
    new CPY(0xC0, new IMM()),
    new CMP(0xC1, new IZX()),
    new NOP(0xC2, new IMP()),
    new XXX(0xC3),
    new CPY(0xC4, new ZP0()),
    new CMP(0xC5, new ZP0()),
    new DEC(0xC6, new ZP0()),
    new XXX(0xC7),
    new INY(0xC8, new IMP()),
    new CMP(0xC9, new IMM()),
    new DEX(0xCA, new IMP()),
    new XXX(0xCB),
    new CPY(0xCC, new ABS()),
    new CMP(0xCD, new ABS()),
    new DEC(0xCE, new ABS()),
    new XXX(0xCF),
    new BNE(0xD0, new REL()),
    new CMP(0xD1, new IZY()),
    new XXX(0xD2),
    new XXX(0xD3),
    new NOP(0xD4, new IMP()),
    new CMP(0xD5, new ZPX()),
    new DEC(0xD6, new ZPX()),
    new XXX(0xD7),
    new CLD(0xD8, new IMP()),
    new CMP(0xD9, new ABY()),
    new NOP(0xDA, new IMP()),
    new XXX(0xDB),
    new NOP(0xDC, new IMP()),
    new CMP(0xDD, new ABX()),
    new DEC(0xDE, new ABX()),
    new XXX(0xDF),
    new CPX(0xE0, new IMM()),
    new SBC(0xE1, new IZX()),
    new NOP(0xE2, new IMP()),
    new XXX(0xE3),
    new CPX(0xE4, new ZP0()),
    new SBC(0xE5, new ZP0()),
    new INC(0xE6, new ZP0()),
    new XXX(0xE7),
    new INX(0xE8, new IMP()),
    new SBC(0xE9, new IMM()),
    new NOP(0xEA, new IMP()),
    new SBC(0xEB, new IMP()),
    new CPX(0xEC, new ABS()),
    new SBC(0xED, new ABS()),
    new INC(0xEE, new ABS()),
    new XXX(0xEF),
    new BEQ(0xF0, new REL()),
    new SBC(0xF1, new IZY()),
    new XXX(0xF2),
    new XXX(0xF3),
    new NOP(0xF4, new IMP()),
    new SBC(0xF5, new ZPX()),
    new INC(0xF6, new ZPX()),
    new XXX(0xF7),
    new SED(0xF8, new IMP()),
    new SBC(0xF9, new ABY()),
    new NOP(0xFA, new IMP()),
    new XXX(0xFB),
    new NOP(0xFC, new IMP()),
    new SBC(0xFD, new ABX()),
    new INC(0xFE, new ABX()),
    new XXX(0xFF),
];

export const getInstructionByOpcode = (opcode: uint8) => {
    for(let instruction of instructionList) {
        if(instruction.opcode === opcode) {
            return instruction;
        }
    }
}