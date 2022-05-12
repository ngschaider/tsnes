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

/*
00,BRK,IMM,7
01,ORA,IZX,6
02,XXX,IMP,2
03,XXX,IMP,8
04,NOP,IMP,3
05,ORA,ZP0,3
06,ASL,ZP0,5
07,XXX,IMP,5
08,PHP,IMP,3
09,ORA,IMM,2
0A,ASL,IMP,2
0B,XXX,IMP,2
0C,NOP,IMP,4
0D,ORA,ABS,4
0E,ASL,ABS,6
0F,XXX,IMP,6
10,BPL,REL,2
11,ORA,IZY,5
12,XXX,IMP,2
13,XXX,IMP,8
14,NOP,IMP,4
15,ORA,ZPX,4
16,ASL,ZPX,6
17,XXX,IMP,6
18,CLC,IMP,2
19,ORA,ABY,4
1A,NOP,IMP,2
1B,XXX,IMP,7
1C,NOP,IMP,4
1D,ORA,ABX,4
1E,ASL,ABX,7
1F,XXX,IMP,7
20,JSR,ABS,6
21,AND,IZX,6
22,XXX,IMP,2
23,XXX,IMP,8
24,BIT,ZP0,3
25,AND,ZP0,3
26,ROL,ZP0,5
27,XXX,IMP,5
28,PLP,IMP,4
29,AND,IMM,2
2A,ROL,IMP,2
2B,XXX,IMP,2
2C,BIT,ABS,4
2D,AND,ABS,4
2E,ROL,ABS,6
2F,XXX,IMP,6
30,BMI,REL,2
31,AND,IZY,5
32,XXX,IMP,2
33,XXX,IMP,8
34,NOP,IMP,4
35,AND,ZPX,4
36,ROL,ZPX,6
37,XXX,IMP,6
38,SEC,IMP,2
39,AND,ABY,4
3A,NOP,IMP,2
3B,XXX,IMP,7
3C,NOP,IMP,4
3D,AND,ABX,4
3E,ROL,ABX,7
3F,XXX,IMP,7
40,RTI,IMP,6
41,EOR,IZX,6
42,XXX,IMP,2
43,XXX,IMP,8
44,NOP,IMP,3
45,EOR,ZP0,3
46,LSR,ZP0,5
47,XXX,IMP,5
48,PHA,IMP,3
49,EOR,IMM,2
4A,LSR,IMP,2
4B,XXX,IMP,2
4C,JMP,ABS,3
4D,EOR,ABS,4
4E,LSR,ABS,6
4F,XXX,IMP,6
50,BVC,REL,2
51,EOR,IZY,5
52,XXX,IMP,2
53,XXX,IMP,8
54,NOP,IMP,4
55,EOR,ZPX,4
56,LSR,ZPX,6
57,XXX,IMP,6
58,CLI,IMP,2
59,EOR,ABY,4
5A,NOP,IMP,2
5B,XXX,IMP,7
5C,NOP,IMP,4
5D,EOR,ABX,4
5E,LSR,ABX,7
5F,XXX,IMP,7
60,RTS,IMP,6
61,ADC,IZX,6
62,XXX,IMP,2
63,XXX,IMP,8
64,NOP,IMP,3
65,ADC,ZP0,3
66,ROR,ZP0,5
67,XXX,IMP,5
68,PLA,IMP,4
69,ADC,IMM,2
6A,ROR,IMP,2
6B,XXX,IMP,2
6C,JMP,IND,5
6D,ADC,ABS,4
6E,ROR,ABS,6
6F,XXX,IMP,6
70,BVS,REL,2
71,ADC,IZY,5
72,XXX,IMP,2
73,XXX,IMP,8
74,NOP,IMP,4
75,ADC,ZPX,4
76,ROR,ZPX,6
77,XXX,IMP,6
78,SEI,IMP,2
79,ADC,ABY,4
7A,NOP,IMP,2
7B,XXX,IMP,7
7C,NOP,IMP,4
7D,ADC,ABX,4
7E,ROR,ABX,7
7F,XXX,IMP,7
80,NOP,IMP,2
81,STA,IZX,6
82,NOP,IMP,2
83,XXX,IMP,6
84,STY,ZP0,3
85,STA,ZP0,3
86,STX,ZP0,3
87,XXX,IMP,3
88,DEY,IMP,2
89,NOP,IMP,2
8A,TXA,IMP,2
8B,XXX,IMP,2
8C,STY,ABS,4
8D,STA,ABS,4
8E,STX,ABS,4
8F,XXX,IMP,4
90,BCC,REL,2
91,STA,IZY,6
92,XXX,IMP,2
93,XXX,IMP,6
94,STY,ZPX,4
95,STA,ZPX,4
96,STX,ZPY,4
97,XXX,IMP,4
98,TYA,IMP,2
99,STA,ABY,5
9A,TXS,IMP,2
9B,XXX,IMP,5
9C,NOP,IMP,5
9D,STA,ABX,5
9E,XXX,IMP,5
9F,XXX,IMP,5
A0,LDY,IMM,2
A1,LDA,IZX,6
A2,LDX,IMM,2
A3,XXX,IMP,6
A4,LDY,ZP0,3
A5,LDA,ZP0,3
A6,LDX,ZP0,3
A7,XXX,IMP,3
A8,TAY,IMP,2
A9,LDA,IMM,2
AA,TAX,IMP,2
AB,XXX,IMP,2
AC,LDY,ABS,4
AD,LDA,ABS,4
AE,LDX,ABS,4
AF,XXX,IMP,4
B0,BCS,REL,2
B1,LDA,IZY,5
B2,XXX,IMP,2
B3,XXX,IMP,5
B4,LDY,ZPX,4
B5,LDA,ZPX,4
B6,LDX,ZPY,4
B7,XXX,IMP,4
B8,CLV,IMP,2
B9,LDA,ABY,4
BA,TSX,IMP,2
BB,XXX,IMP,4
BC,LDY,ABX,4
BD,LDA,ABX,4
BE,LDX,ABY,4
BF,XXX,IMP,4
C0,CPY,IMM,2
C1,CMP,IZX,6
C2,NOP,IMP,2
C3,XXX,IMP,8
C4,CPY,ZP0,3
C5,CMP,ZP0,3
C6,DEC,ZP0,5
C7,XXX,IMP,5
C8,INY,IMP,2
C9,CMP,IMM,2
CA,DEX,IMP,2
CB,XXX,IMP,2
CC,CPY,ABS,4
CD,CMP,ABS,4
CE,DEC,ABS,6
CF,XXX,IMP,6
D0,BNE,REL,2
D1,CMP,IZY,5
D2,XXX,IMP,2
D3,XXX,IMP,8
D4,NOP,IMP,4
D5,CMP,ZPX,4
D6,DEC,ZPX,6
D7,XXX,IMP,6
D8,CLD,IMP,2
D9,CMP,ABY,4
DA,NOP,IMP,2
DB,XXX,IMP,7
DC,NOP,IMP,4
DD,CMP,ABX,4
DE,DEC,ABX,7
DF,XXX,IMP,7
E0,CPX,IMM,2
E1,SBC,IZX,6
E2,NOP,IMP,2
E3,XXX,IMP,8
E4,CPX,ZP0,3
E5,SBC,ZP0,3
E6,INC,ZP0,5
E7,XXX,IMP,5
E8,INX,IMP,2
E9,SBC,IMM,2
EA,NOP,IMP,2
EB,SBC,IMP,2
EC,CPX,ABS,4
ED,SBC,ABS,4
EE,INC,ABS,6
EF,XXX,IMP,6
F0,BEQ,REL,2
F1,SBC,IZY,5
F2,XXX,IMP,2
F3,XXX,IMP,8
F4,NOP,IMP,4
F5,SBC,ZPX,4
F6,INC,ZPX,6
F7,XXX,IMP,6
F8,SED,IMP,2
F9,SBC,ABY,4
FA,NOP,IMP,2
FB,XXX,IMP,7
FC,NOP,IMP,4
FD,SBC,ABX,4
FE,INC,ABX,7
FF,XXX,IMP,7
*/

// Match: ([A-F0-9]{2}),([A-Z0-9]{3}),([A-Z0-9]{3}),([0-9])
// Replace: new $2(0x$1, new $3(), $4),

// Match: new XXX\((0x[A-F0-9]{2}), new [A-Z0-9]{3}\(\), [0-9]\),
// Replace: new XXX($1),

const getInstructionByOpcode = (opcode: number) => {
    switch(opcode) {
        case 0x00: return new BRK(0x00, new IMM(), 7);
        case 0x01: return new ORA(0x01, new IZX(), 6);
        case 0x02: return new XXX(0x02);
        case 0x03: return new XXX(0x03);
        case 0x04: return new NOP(0x04, new IMP(), 3);
        case 0x05: return new ORA(0x05, new ZP0(), 3);
        case 0x06: return new ASL(0x06, new ZP0(), 5);
        case 0x07: return new XXX(0x07);
        case 0x08: return new PHP(0x08, new IMP(), 3);
        case 0x09: return new ORA(0x09, new IMM(), 2);
        case 0x0A: return new ASL(0x0A, new IMP(), 2);
        case 0x0B: return new XXX(0x0B);
        case 0x0C: return new NOP(0x0C, new IMP(), 4);
        case 0x0D: return new ORA(0x0D, new ABS(), 4);
        case 0x0E: return new ASL(0x0E, new ABS(), 6);
        case 0x0F: return new XXX(0x0F);
        case 0x10: return new BPL(0x10, new REL(), 2);
        case 0x11: return new ORA(0x11, new IZY(), 5);
        case 0x12: return new XXX(0x12);
        case 0x13: return new XXX(0x13);
        case 0x14: return new NOP(0x14, new IMP(), 4);
        case 0x15: return new ORA(0x15, new ZPX(), 4);
        case 0x16: return new ASL(0x16, new ZPX(), 6);
        case 0x17: return new XXX(0x17);
        case 0x18: return new CLC(0x18, new IMP(), 2);
        case 0x19: return new ORA(0x19, new ABY(), 4);
        case 0x1A: return new NOP(0x1A, new IMP(), 2);
        case 0x1B: return new XXX(0x1B);
        case 0x1C: return new NOP(0x1C, new IMP(), 4);
        case 0x1D: return new ORA(0x1D, new ABX(), 4);
        case 0x1E: return new ASL(0x1E, new ABX(), 7);
        case 0x1F: return new XXX(0x1F);
        case 0x20: return new JSR(0x20, new ABS(), 6);
        case 0x21: return new AND(0x21, new IZX(), 6);
        case 0x22: return new XXX(0x22);
        case 0x23: return new XXX(0x23);
        case 0x24: return new BIT(0x24, new ZP0(), 3);
        case 0x25: return new AND(0x25, new ZP0(), 3);
        case 0x26: return new ROL(0x26, new ZP0(), 5);
        case 0x27: return new XXX(0x27);
        case 0x28: return new PLP(0x28, new IMP(), 4);
        case 0x29: return new AND(0x29, new IMM(), 2);
        case 0x2A: return new ROL(0x2A, new IMP(), 2);
        case 0x2B: return new XXX(0x2B);
        case 0x2C: return new BIT(0x2C, new ABS(), 4);
        case 0x2D: return new AND(0x2D, new ABS(), 4);
        case 0x2E: return new ROL(0x2E, new ABS(), 6);
        case 0x2F: return new XXX(0x2F);
        case 0x30: return new BMI(0x30, new REL(), 2);
        case 0x31: return new AND(0x31, new IZY(), 5);
        case 0x32: return new XXX(0x32);
        case 0x33: return new XXX(0x33);
        case 0x34: return new NOP(0x34, new IMP(), 4);
        case 0x35: return new AND(0x35, new ZPX(), 4);
        case 0x36: return new ROL(0x36, new ZPX(), 6);
        case 0x37: return new XXX(0x37);
        case 0x38: return new SEC(0x38, new IMP(), 2);
        case 0x39: return new AND(0x39, new ABY(), 4);
        case 0x3A: return new NOP(0x3A, new IMP(), 2);
        case 0x3B: return new XXX(0x3B);
        case 0x3C: return new NOP(0x3C, new IMP(), 4);
        case 0x3D: return new AND(0x3D, new ABX(), 4);
        case 0x3E: return new ROL(0x3E, new ABX(), 7);
        case 0x3F: return new XXX(0x3F);
        case 0x40: return new RTI(0x40, new IMP(), 6);
        case 0x41: return new EOR(0x41, new IZX(), 6);
        case 0x42: return new XXX(0x42);
        case 0x43: return new XXX(0x43);
        case 0x44: return new NOP(0x44, new IMP(), 3);
        case 0x45: return new EOR(0x45, new ZP0(), 3);
        case 0x46: return new LSR(0x46, new ZP0(), 5);
        case 0x47: return new XXX(0x47);
        case 0x48: return new PHA(0x48, new IMP(), 3);
        case 0x49: return new EOR(0x49, new IMM(), 2);
        case 0x4A: return new LSR(0x4A, new IMP(), 2);
        case 0x4B: return new XXX(0x4B);
        case 0x4C: return new JMP(0x4C, new ABS(), 3);
        case 0x4D: return new EOR(0x4D, new ABS(), 4);
        case 0x4E: return new LSR(0x4E, new ABS(), 6);
        case 0x4F: return new XXX(0x4F);
        case 0x50: return new BVC(0x50, new REL(), 2);
        case 0x51: return new EOR(0x51, new IZY(), 5);
        case 0x52: return new XXX(0x52);
        case 0x53: return new XXX(0x53);
        case 0x54: return new NOP(0x54, new IMP(), 4);
        case 0x55: return new EOR(0x55, new ZPX(), 4);
        case 0x56: return new LSR(0x56, new ZPX(), 6);
        case 0x57: return new XXX(0x57);
        case 0x58: return new CLI(0x58, new IMP(), 2);
        case 0x59: return new EOR(0x59, new ABY(), 4);
        case 0x5A: return new NOP(0x5A, new IMP(), 2);
        case 0x5B: return new XXX(0x5B);
        case 0x5C: return new NOP(0x5C, new IMP(), 4);
        case 0x5D: return new EOR(0x5D, new ABX(), 4);
        case 0x5E: return new LSR(0x5E, new ABX(), 7);
        case 0x5F: return new XXX(0x5F);
        case 0x60: return new RTS(0x60, new IMP(), 6);
        case 0x61: return new ADC(0x61, new IZX(), 6);
        case 0x62: return new XXX(0x62);
        case 0x63: return new XXX(0x63);
        case 0x64: return new NOP(0x64, new IMP(), 3);
        case 0x65: return new ADC(0x65, new ZP0(), 3);
        case 0x66: return new ROR(0x66, new ZP0(), 5);
        case 0x67: return new XXX(0x67);
        case 0x68: return new PLA(0x68, new IMP(), 4);
        case 0x69: return new ADC(0x69, new IMM(), 2);
        case 0x6A: return new ROR(0x6A, new IMP(), 2);
        case 0x6B: return new XXX(0x6B);
        case 0x6C: return new JMP(0x6C, new IND(), 5);
        case 0x6D: return new ADC(0x6D, new ABS(), 4);
        case 0x6E: return new ROR(0x6E, new ABS(), 6);
        case 0x6F: return new XXX(0x6F);
        case 0x70: return new BVS(0x70, new REL(), 2);
        case 0x71: return new ADC(0x71, new IZY(), 5);
        case 0x72: return new XXX(0x72);
        case 0x73: return new XXX(0x73);
        case 0x74: return new NOP(0x74, new IMP(), 4);
        case 0x75: return new ADC(0x75, new ZPX(), 4);
        case 0x76: return new ROR(0x76, new ZPX(), 6);
        case 0x77: return new XXX(0x77);
        case 0x78: return new SEI(0x78, new IMP(), 2);
        case 0x79: return new ADC(0x79, new ABY(), 4);
        case 0x7A: return new NOP(0x7A, new IMP(), 2);
        case 0x7B: return new XXX(0x7B);
        case 0x7C: return new NOP(0x7C, new IMP(), 4);
        case 0x7D: return new ADC(0x7D, new ABX(), 4);
        case 0x7E: return new ROR(0x7E, new ABX(), 7);
        case 0x7F: return new XXX(0x7F);
        case 0x80: return new NOP(0x80, new IMP(), 2);
        case 0x81: return new STA(0x81, new IZX(), 6);
        case 0x82: return new NOP(0x82, new IMP(), 2);
        case 0x83: return new XXX(0x83);
        case 0x84: return new STY(0x84, new ZP0(), 3);
        case 0x85: return new STA(0x85, new ZP0(), 3);
        case 0x86: return new STX(0x86, new ZP0(), 3);
        case 0x87: return new XXX(0x87);
        case 0x88: return new DEY(0x88, new IMP(), 2);
        case 0x89: return new NOP(0x89, new IMP(), 2);
        case 0x8A: return new TXA(0x8A, new IMP(), 2);
        case 0x8B: return new XXX(0x8B);
        case 0x8C: return new STY(0x8C, new ABS(), 4);
        case 0x8D: return new STA(0x8D, new ABS(), 4);
        case 0x8E: return new STX(0x8E, new ABS(), 4);
        case 0x8F: return new XXX(0x8F);
        case 0x90: return new BCC(0x90, new REL(), 2);
        case 0x91: return new STA(0x91, new IZY(), 6);
        case 0x92: return new XXX(0x92);
        case 0x93: return new XXX(0x93);
        case 0x94: return new STY(0x94, new ZPX(), 4);
        case 0x95: return new STA(0x95, new ZPX(), 4);
        case 0x96: return new STX(0x96, new ZPY(), 4);
        case 0x97: return new XXX(0x97);
        case 0x98: return new TYA(0x98, new IMP(), 2);
        case 0x99: return new STA(0x99, new ABY(), 5);
        case 0x9A: return new TXS(0x9A, new IMP(), 2);
        case 0x9B: return new XXX(0x9B);
        case 0x9C: return new NOP(0x9C, new IMP(), 5);
        case 0x9D: return new STA(0x9D, new ABX(), 5);
        case 0x9E: return new XXX(0x9E);
        case 0x9F: return new XXX(0x9F);
        case 0xA0: return new LDY(0xA0, new IMM(), 2);
        case 0xA1: return new LDA(0xA1, new IZX(), 6);
        case 0xA2: return new LDX(0xA2, new IMM(), 2);
        case 0xA3: return new XXX(0xA3);
        case 0xA4: return new LDY(0xA4, new ZP0(), 3);
        case 0xA5: return new LDA(0xA5, new ZP0(), 3);
        case 0xA6: return new LDX(0xA6, new ZP0(), 3);
        case 0xA7: return new XXX(0xA7);
        case 0xA8: return new TAY(0xA8, new IMP(), 2);
        case 0xA9: return new LDA(0xA9, new IMM(), 2);
        case 0xAA: return new TAX(0xAA, new IMP(), 2);
        case 0xAB: return new XXX(0xAB);
        case 0xAC: return new LDY(0xAC, new ABS(), 4);
        case 0xAD: return new LDA(0xAD, new ABS(), 4);
        case 0xAE: return new LDX(0xAE, new ABS(), 4);
        case 0xAF: return new XXX(0xAF);
        case 0xB0: return new BCS(0xB0, new REL(), 2);
        case 0xB1: return new LDA(0xB1, new IZY(), 5);
        case 0xB2: return new XXX(0xB2);
        case 0xB3: return new XXX(0xB3);
        case 0xB4: return new LDY(0xB4, new ZPX(), 4);
        case 0xB5: return new LDA(0xB5, new ZPX(), 4);
        case 0xB6: return new LDX(0xB6, new ZPY(), 4);
        case 0xB7: return new XXX(0xB7);
        case 0xB8: return new CLV(0xB8, new IMP(), 2);
        case 0xB9: return new LDA(0xB9, new ABY(), 4);
        case 0xBA: return new TSX(0xBA, new IMP(), 2);
        case 0xBB: return new XXX(0xBB);
        case 0xBC: return new LDY(0xBC, new ABX(), 4);
        case 0xBD: return new LDA(0xBD, new ABX(), 4);
        case 0xBE: return new LDX(0xBE, new ABY(), 4);
        case 0xBF: return new XXX(0xBF);
        case 0xC0: return new CPY(0xC0, new IMM(), 2);
        case 0xC1: return new CMP(0xC1, new IZX(), 6);
        case 0xC2: return new NOP(0xC2, new IMP(), 2);
        case 0xC3: return new XXX(0xC3);
        case 0xC4: return new CPY(0xC4, new ZP0(), 3);
        case 0xC5: return new CMP(0xC5, new ZP0(), 3);
        case 0xC6: return new DEC(0xC6, new ZP0(), 5);
        case 0xC7: return new XXX(0xC7);
        case 0xC8: return new INY(0xC8, new IMP(), 2);
        case 0xC9: return new CMP(0xC9, new IMM(), 2);
        case 0xCA: return new DEX(0xCA, new IMP(), 2);
        case 0xCB: return new XXX(0xCB);
        case 0xCC: return new CPY(0xCC, new ABS(), 4);
        case 0xCD: return new CMP(0xCD, new ABS(), 4);
        case 0xCE: return new DEC(0xCE, new ABS(), 6);
        case 0xCF: return new XXX(0xCF);
        case 0xD0: return new BNE(0xD0, new REL(), 2);
        case 0xD1: return new CMP(0xD1, new IZY(), 5);
        case 0xD2: return new XXX(0xD2);
        case 0xD3: return new XXX(0xD3);
        case 0xD4: return new NOP(0xD4, new IMP(), 4);
        case 0xD5: return new CMP(0xD5, new ZPX(), 4);
        case 0xD6: return new DEC(0xD6, new ZPX(), 6);
        case 0xD7: return new XXX(0xD7);
        case 0xD8: return new CLD(0xD8, new IMP(), 2);
        case 0xD9: return new CMP(0xD9, new ABY(), 4);
        case 0xDA: return new NOP(0xDA, new IMP(), 2);
        case 0xDB: return new XXX(0xDB);
        case 0xDC: return new NOP(0xDC, new IMP(), 4);
        case 0xDD: return new CMP(0xDD, new ABX(), 4);
        case 0xDE: return new DEC(0xDE, new ABX(), 7);
        case 0xDF: return new XXX(0xDF);
        case 0xE0: return new CPX(0xE0, new IMM(), 2);
        case 0xE1: return new SBC(0xE1, new IZX(), 6);
        case 0xE2: return new NOP(0xE2, new IMP(), 2);
        case 0xE3: return new XXX(0xE3);
        case 0xE4: return new CPX(0xE4, new ZP0(), 3);
        case 0xE5: return new SBC(0xE5, new ZP0(), 3);
        case 0xE6: return new INC(0xE6, new ZP0(), 5);
        case 0xE7: return new XXX(0xE7);
        case 0xE8: return new INX(0xE8, new IMP(), 2);
        case 0xE9: return new SBC(0xE9, new IMM(), 2);
        case 0xEA: return new NOP(0xEA, new IMP(), 2);
        case 0xEB: return new SBC(0xEB, new IMP(), 2);
        case 0xEC: return new CPX(0xEC, new ABS(), 4);
        case 0xED: return new SBC(0xED, new ABS(), 4);
        case 0xEE: return new INC(0xEE, new ABS(), 6);
        case 0xEF: return new XXX(0xEF);
        case 0xF0: return new BEQ(0xF0, new REL(), 2);
        case 0xF1: return new SBC(0xF1, new IZY(), 5);
        case 0xF2: return new XXX(0xF2);
        case 0xF3: return new XXX(0xF3);
        case 0xF4: return new NOP(0xF4, new IMP(), 4);
        case 0xF5: return new SBC(0xF5, new ZPX(), 4);
        case 0xF6: return new INC(0xF6, new ZPX(), 6);
        case 0xF7: return new XXX(0xF7);
        case 0xF8: return new SED(0xF8, new IMP(), 2);
        case 0xF9: return new SBC(0xF9, new ABY(), 4);
        case 0xFA: return new NOP(0xFA, new IMP(), 2);
        case 0xFB: return new XXX(0xFB);
        case 0xFC: return new NOP(0xFC, new IMP(), 4);
        case 0xFD: return new SBC(0xFD, new ABX(), 4);
        case 0xFE: return new INC(0xFE, new ABX(), 7);
        case 0xFF: return new XXX(0xFF);
    }
}
export default getInstructionByOpcode;