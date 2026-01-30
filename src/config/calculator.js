import SvgIcon from "@/components/SvgIcon.vue";
import { h, } from "vue";
export const keynoardConfig = {
    moreMenuList: [
        {
            name: 'calculator.calculator',
            children: [
                {
                    name: 'calculator.standard',
                    key: "standard"
                },
                {
                    name: 'calculator.scientific',
                    key: 'scientific'
                },
                {
                    name: 'calculator.graphing',
                    disabled: true,
                },
                {
                    name: 'calculator.programmer',
                    disabled: true,
                },
                {
                    name: 'calculator.dateCalculation',
                    key: 'dateCalculation',
                }
            ]
        },
        {
            name: 'calculator.converter',
            children: [
                {
                    name: 'calculator.currency',
                    disabled: true,
                },
                {
                    name: 'calculator.volume',
                    disabled: true,
                },
                {
                    name: 'calculator.length',
                    key: 'length',
                    disabled: false,
                },
                {
                    name: 'calculator.weightAndMass',
                    disabled: true,
                },
                {
                    name: 'calculator.temperature',
                    disabled: true,
                },
                {
                    name: 'calculator.energy',
                    disabled: true,
                },
                {
                    name: 'calculator.area',
                    disabled: true,
                },
                {
                    name: 'calculator.speed',
                    disabled: true,
                },
                {
                    name: 'calculator.time',
                    disabled: true,
                },
                {
                    name: 'calculator.power',
                    disabled: true,
                },
                {
                    name: 'calculator.data',
                    disabled: true,
                },
                {
                    name: 'calculator.pressure',
                    disabled: true,
                },
                {
                    name: 'calculator.angle',
                    disabled: true,
                },

            ]
        }
    ],
    standard: {
        keyboardList: [
            {
                label: "%",
                keyboard: 'Digit5',
            },
            {
                label: "CE",
                key: 'Delete'
            },
            {
                label: "C",
                key: 'Clear'
            },
            {
                latex: "⌫",
                keyboard: 'Backspace',
                key: 'Backspace',
                component: h(
                    SvgIcon,
                    {
                        size: "16px",
                        name: "back",
                        color: "var(--text-color)",
                        style: "padding: 10px 12px",
                    },
                    {}
                ),
            },
            {
                latex: "^{1}\\!/\\!_{x}",
                key: 'Reciprocal'
            },
            {
                latex: "x^{2} ",
                key: 'Sqr'
            },
            {
                latex: `\\sqrt[2]{x} `,
                key: 'Sqrt',
            },
            {
                latex: `{\\div}`,
                key: "/",
                keyboard: 'NumpadDivide,Slash'
            },

            {
                label: "7",
                keyboard: 'Numpad7',
            },
            {
                label: "8",
                keyboard: 'Numpad8',
            },
            {
                label: "9",
                keyboard: 'Numpad9',
            },
            {
                key: "*",
                latex: `\\times`,
                keyboard: 'NumpadMultiply,shift_digit8'
            },
            {
                label: "4",
                keyboard: 'Numpad4',
            },
            {
                label: "5",
                keyboard: 'Numpad5',
            },
            {
                label: "6",
                keyboard: 'Numpad6',
            },
            {
                label: "-",
                keyboard: 'NumpadSubtract,Minus',
            },
            {
                label: "1",
                keyboard: 'Numpad1',
            },
            {
                label: "2",
                keyboard: 'Numpad2',
            },
            {
                label: "3",
                keyboard: 'Numpad3',
            },
            {
                label: "+",
                keyboard: 'NumpadAdd,shift_equal',
            },
            {
                latex: "^{+}\\!/\\!_{-}",
                key: 'Negate',
            },
            {
                label: "0",
                keyboard: 'Numpad0',
            },
            {
                label: ".",
                keyboard: 'Period,NumpadDecimal',
            },
            {
                label: "=",
                key: 'Enter',
                keyboard: 'Enter',
            },
        ],
        rowNumber: 6,
        columnNumber: 4,
    },
    scientific: {
        keyboardList: [
            {
                latex: "2^{nd}",
                key: '2nd',
                isActiveButton: true
            },
            {
                latex: '\\pi',
                key: "ConstantPI"
            },
            {
                label: "e",
                key: 'ConstantE'
            },
            {
                label: "C",
                key: 'Clear'
            },
            {
                latex: "⌫",
                keyboard: 'Backspace',
                key: 'Backspace',
                component: h(
                    SvgIcon,
                    {
                        size: "16px",
                        name: "back",
                        color: "var(--text-color)",
                        style: "padding: 10px 12px",
                    },
                    {}
                ),
            },

            {
                latex: "x^{2} ",
                key: 'Sqr'
            },
            {
                latex: "^{1}\\!/\\!_{x}",
                key: 'Reciprocal'
            },
            {
                latex: "\\left |x\\right|",
                key: "Abs",
            },
            {
                label: "exp",
                key: "Exp",
                keyboard: 'e'
            },
            {
                label: "mod",
                key: "Mod"
            },
            {
                latex: `\\sqrt[2]{x} `,
                key: 'Sqrt',
                '2nd': {
                    latex: "\\sqrt[3]{x} ",
                    key: 'Cuberoot'
                },
            },
            {
                label: "(",
                key: "(",
                keyboard: 'Digit9',
            },
            {
                label: ")",
                key: ")",
                keyboard: 'Digit0',
            },
            {
                latex: `n!`,
                key: 'Fact'
            },
            {
                latex: `{\\div}`,
                key: "/",
                keyboard: 'NumpadDivide,Slash'
            },
            {
                latex: "x^{y} ",
                key: "^",
                keyboard: 'Digit6',
                '2nd': {
                    latex: "\\sqrt[y]{x} ",
                    key: 'Yroot'
                },
            },
            {
                label: "7",
                keyboard: 'Numpad7',
            },
            {
                label: "8",
                keyboard: 'Numpad8',
            },
            {
                label: "9",
                keyboard: 'Numpad9',
            },
            {
                key: "*",
                latex: `\\times`,
                keyboard: 'NumpadMultiply,shift_digit8'
            },
            {
                latex: "10^{x} ",
                key: "10^",
                '2nd': {
                    latex: "2^{x}",
                    key: '2^{x}'

                },
            },
            {
                label: "4",
                keyboard: 'Numpad4',
            },
            {
                label: "5",
                keyboard: 'Numpad5',
            },
            {
                label: "6",
                keyboard: 'Numpad6',
            },
            {
                label: "-",
                keyboard: 'NumpadSubtract,Minus',
            },
            {
                latex: "\\log",
                key: 'l',
                keyboard: 'KeyL',
                '2nd': {
                    latex: "\\log_{y}{x}",
                    key: 'log_{y}{x}'
                },
            },
            {
                label: "1",
                keyboard: 'Numpad1',
            },
            {
                label: "2",
                keyboard: 'Numpad2',
            },
            {
                label: "3",
                keyboard: 'Numpad3',
            },
            {
                label: "+",
                keyboard: 'NumpadAdd,shift_equal',
            },
            {
                latex: "\\ln",
                keyboard: 'KeyN',
                key: 'n',
                '2nd': {
                    latex: "e^{x}",
                    key: 'e^{x}'
                },
            },
            {
                latex: "^{+}\\!/\\!_{-}",
                key: 'Negate',
            },
            {
                label: "0",
                keyboard: 'Numpad0',
            },
            {
                label: ".",
                keyboard: 'Period,NumpadDecimal',
            },
            {
                label: "=",
                key: 'Enter',
                keyboard: 'Enter',
            },
        ],
        customToolbar: [
            {
                name: 'scientific.trigonometry',
                key: 'trigonometry',
                iconComponent: h(
                    SvgIcon,
                    {
                        size: "18px",
                        name: "trigonometry",
                        color: "var(--text-color)",
                        style: "padding: 4px",
                    },
                    {}
                ),
                rowNumber: 2,
                columnNumber: 4,
                keyboardList: [
                    {
                        latex: "2^{nd}",
                        isActiveButton: true,
                        key: "2nd"
                    },
                    {
                        latex: "sin",
                        key: "Sin",
                        '2nd': {
                            latex: 'sin^{-1}',
                            key: "Asin"
                        },
                        Hyp: {
                            latex: 'sinh',
                            key: "Sinh"
                        },
                        '2ndHyp': {
                            latex: 'sinh^{-1}',
                            key: "Asinh"
                        },
                    },
                    {
                        latex: "cos",
                        key: "Cos",
                        '2nd': {
                            latex: 'cos^{-1}',
                            key: "Acos"
                        },
                        Hyp: {
                            latex: 'cosh',
                            key: "Cosh"
                        },
                        '2ndHyp': {
                            latex: 'cosh^{-1}',
                            key: "Acosh"
                        },
                    },
                    {
                        latex: "tan",
                        key: "Tan",
                        '2nd': {
                            latex: 'tan^{-1}',
                            key: "Atan"
                        },
                        Hyp: {
                            latex: 'tanh',
                            key: "Tanh"
                        },
                        '2ndHyp': {
                            latex: 'tanh^{-1}',
                            key: "Atanh"
                        },
                    },
                    {
                        label: "hyp",
                        isActiveButton: true,
                        key: "Hyp"
                    },
                    {
                        latex: "sec",
                        key: "Sec",
                        '2nd': {
                            latex: 'sec^{-1}',
                            key: "Asec"
                        },
                        Hyp: {
                            latex: 'sech',
                            key: "Sech"
                        },
                        '2ndHyp': {
                            latex: 'sech^{-1}',
                            key: "Asech"
                        },
                    },
                    {
                        latex: "csc",
                        key: "Csc",
                        '2nd': {
                            latex: 'csc^{-1}',
                            key: "Acsc"
                        },
                        Hyp: {
                            latex: 'csch',
                            key: "Csch"
                        },
                        '2ndHyp': {
                            latex: 'csch^{-1}',
                            key: "Acsch"
                        },
                    },
                    {
                        latex: "cot",
                        key: "Cot",
                        '2nd': {
                            latex: 'cot^{-1}',
                            key: "Acot"
                        },
                        Hyp: {
                            latex: 'coth',
                            key: "Coth"
                        },
                        '2ndHyp': {
                            latex: 'coth^{-1}',
                            key: "Acoth"
                        },
                    },
                ]
            },
            {
                name: 'scientific.function',
                key: 'function',
                latex: '\\int',
                rowNumber: 2,
                columnNumber: 3,
                keyboardList: [
                    {
                        latex: "\\begin{vmatrix} x \\end{vmatrix}",
                        key: "Abs"
                    },
                    {
                        latex: "\\left \\lfloor x \\right \\rfloor ",
                        key: "Floor"
                    },
                    {
                        latex: "\\left \\lceil x \\right \\rceil ",
                        key: "Ceil"
                    },
                    {
                        label: "rand",
                        key: 'Rand'
                    },
                    {
                        latex: "\\longrightarrow dms",
                        key: "ToDms"
                    },
                    {
                        latex: "\\longrightarrow deg",
                        key: "ToDeg"
                    },

                ]
            },
        ],
        rowNumber: 7,
        columnNumber: 5,
    },
    dateCalculation: {
        keyboardList: [
            {
                label: "dateCalculation.differenceBetweenDates",
                key: "DiffDates"
            },
            {
                label: "dateCalculation.addSubDays",
                key: "AddSubDays"
            },
        ]
    },
    length: {
        unitOptions: [
            {
                label: 'length.angstroms',
                key: 'angstroms'
            },
            {
                label: 'length.nanometers',
                key: 'nanometers'
            },
            {
                label: 'length.microns',
                key: 'microns'
            },
            {
                label: 'length.millimeters',
                key: 'millimeters'
            },
            {
                label: 'length.centimeters',
                key: 'centimeters'
            },
            {
                label: 'length.meters',
                key: 'meters'
            },
            {
                label: 'length.kilometers',
                key: 'kilometers'
            },
            {
                label: 'length.inches',
                key: 'inches'
            },
            {
                label: 'length.feet',
                key: 'feet'
            },
            {
                label: 'length.yards',
                key: 'yards'
            },
            {
                label: 'length.miles',
                key: 'miles'
            },
            {
                label: 'length.nauticalMiles',
                key: 'nauticalMiles'
            },
        ],
        keyboardList: [
            {
                label: "",
                hidden: true,
            },
            {
                label: "CE",
                key: 'Delete'
            },
            {
                latex: "⌫",
                keyboard: 'Backspace',
                key: 'Backspace',
                component: h(
                    SvgIcon,
                    {
                        size: "16px",
                        name: "back",
                        color: "var(--text-color)",
                        style: "padding: 10px 12px",
                    },
                    {}
                ),
            },


            {
                label: "7",
                keyboard: 'Numpad7',
            },
            {
                label: "8",
                keyboard: 'Numpad8',
            },
            {
                label: "9",
                keyboard: 'Numpad9',
            },

            {
                label: "4",
                keyboard: 'Numpad4',
            },
            {
                label: "5",
                keyboard: 'Numpad5',
            },
            {
                label: "6",
                keyboard: 'Numpad6',
            },

            {
                label: "1",
                keyboard: 'Numpad1',
            },
            {
                label: "2",
                keyboard: 'Numpad2',
            },
            {
                label: "3",
                keyboard: 'Numpad3',
            },

            {
                label: "",
                hidden: true,
            },
            {
                label: "0",
                keyboard: 'Numpad0',
            },
            {
                label: ".",
                keyboard: 'Period,NumpadDecimal',
            },
        ],
        rowNumber: 5,
        columnNumber: 3,
    }
}