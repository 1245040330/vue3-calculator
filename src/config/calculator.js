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
                // {
                //     name: 'calculator.currency',
                //     disabled: true,
                // },
                {
                    name: 'calculator.volume',
                    key: 'volume',
                    disabled: false,
                },
                {
                    name: 'calculator.length',
                    key: 'length',
                    disabled: false,
                },
                {
                    name: 'calculator.weightAndMass',
                    key: 'weightAndMass',
                    disabled: false,
                },
                {
                    name: 'calculator.temperature',
                    key: 'temperature',
                    disabled: false,
                },
                {
                    name: 'calculator.energy',
                    key: 'energy',
                    disabled: false,
                },
                {
                    name: 'calculator.area',
                    key: 'area',
                    disabled: false,
                },
                {
                    name: 'calculator.speed',
                    key: 'speed',
                    disabled: false,
                },
                {
                    name: 'calculator.time',
                    key: 'time',
                    disabled: false,
                },
                {
                    name: 'calculator.power',
                    key: 'power',
                    disabled: false,
                },
                {
                    name: 'calculator.data',
                    key: 'data',
                    disabled: false,
                },
                {
                    name: 'calculator.pressure',
                    key: 'pressure',
                    disabled: false,
                },
                {
                    name: 'calculator.angle',
                    key: 'angle',
                    disabled: false,
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
    volume: {
        fromDefaultUnit: 'milliliters',
        toDefaultUnit: 'liters',
        unitOptions: [
            {
                label: 'volume.milliliters',
                key: 'milliliters'
            },
            {
                label: 'volume.cubicCentimeters',
                key: 'cubicCentimeters'
            },
            {
                label: 'volume.liters',
                key: 'liters'
            },
            {
                label: 'volume.cubicMeters',
                key: 'cubicMeters'
            },
            {
                label: 'volume.teaspoonsUS',
                key: 'teaspoonsUS'
            },
            {
                label: 'volume.tablespoonsUS',
                key: 'tablespoonsUS'
            },
            {
                label: 'volume.fluidOuncesUS',
                key: 'fluidOuncesUS'
            },
            {
                label: 'volume.cupsUS',
                key: 'cupsUS'
            },
            {
                label: 'volume.pintsUS',
                key: 'pintsUS'
            },
            {
                label: 'volume.QuartsUS',
                key: 'QuartsUS'
            },
            {
                label: 'volume.GallonsUS',
                key: 'GallonsUS'
            },
            {
                label: 'volume.cubicInches',
                key: 'cubicInches'
            },
            {
                label: 'volume.cubicFeet',
                key: 'cubicFeet'
            },
            {
                label: 'volume.cubicYards',
                key: 'cubicYards'
            },
            {
                label: 'volume.teaspoonsUK',
                key: 'teaspoonsUK'
            },
            {
                label: 'volume.tablespoonsUK',
                key: 'tablespoonsUK'
            },
            {
                label: 'volume.fluidOuncesUK',
                key: 'fluidOuncesUK'
            },
            {
                label: 'volume.pintsUK',
                key: 'pintsUK'
            },
            {
                label: 'volume.QuartsUK',
                key: 'QuartsUK'
            },
            {
                label: 'volume.GallonsUK',
                key: 'GallonsUK'
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
    },
    length: {
        fromDefaultUnit: 'angstroms',
        toDefaultUnit: 'nanometers',
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
    },
    weightAndMass: {
        fromDefaultUnit: 'kilograms',
        toDefaultUnit: 'pounds',
        unitOptions: [
            {
                label: 'weightAndMass.carats',
                key: 'carats'
            },
            {
                label: 'weightAndMass.milligrams',
                key: 'milligrams'
            },
            {
                label: 'weightAndMass.centigrams',
                key: 'centigrams'
            },
            {
                label: 'weightAndMass.decigrams',
                key: 'decigrams'
            },
            {
                label: 'weightAndMass.grams',
                key: 'grams'
            },
            {
                label: 'weightAndMass.dekagrams',
                key: 'dekagrams'
            },
            {
                label: 'weightAndMass.hectograms',
                key: 'hectograms'
            },
            {
                label: 'weightAndMass.kilograms',
                key: 'kilograms'
            },
            {
                label: 'weightAndMass.metricTonnes',
                key: 'metricTonnes'
            },
            {
                label: 'weightAndMass.ounces',
                key: 'ounces'
            },
            {
                label: 'weightAndMass.pounds',
                key: 'pounds'
            },
            {
                label: 'weightAndMass.stones',
                key: 'stones'
            },
            {
                label: 'weightAndMass.shortTonsUS',
                key: 'shortTonsUS'
            },
            {
                label: 'weightAndMass.longTonsUK',
                key: 'longTonsUK'
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
    },
    temperature: {
        fromDefaultUnit: 'celsius',
        toDefaultUnit: 'fahrenheit',
        unitOptions: [
            {
                label: 'temperature.celsius',
                key: 'celsius'
            },
            {
                label: 'temperature.fahrenheit',
                key: 'fahrenheit'
            },
            {
                label: 'temperature.kelvin',
                key: 'kelvin'
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
        ],
        rowNumber: 5,
        columnNumber: 3,
    },
    energy: {
        fromDefaultUnit: 'foodCalories',
        toDefaultUnit: 'joules',
        unitOptions: [
            {
                label: 'energy.electronVolts',
                key: 'electronVolts'
            },
            {
                label: 'energy.joules',
                key: 'joules'
            },
            {
                label: 'energy.kilojoules',
                key: 'kilojoules'
            },
            {
                label: 'energy.thermalCalories',
                key: 'thermalCalories'
            },
            {
                label: 'energy.foodCalories',
                key: 'foodCalories'
            },
            {
                label: 'energy.footPounds',
                key: 'footPounds'
            },
            {
                label: 'energy.britishThermalUnits',
                key: 'britishThermalUnits'
            },
            {
                label: 'energy.kilowattHours',
                key: 'kilowattHours'
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
    },
    area: {
        fromDefaultUnit: 'squareMeters',
        toDefaultUnit: 'squareFeet',
        unitOptions: [
            {
                label: 'area.squareMillimeters',
                key: 'squareMillimeters'
            },
            {
                label: 'area.squareCentimeters',
                key: 'squareCentimeters'
            },
            {
                label: 'area.squareMeters',
                key: 'squareMeters'
            },
            {
                label: 'area.hectares',
                key: 'hectares'
            },
            {
                label: 'area.squareKilometers',
                key: 'squareKilometers'
            },
            {
                label: 'area.squareInches',
                key: 'squareInches'
            },
            {
                label: 'area.squareFeet',
                key: 'squareFeet'
            },
            {
                label: 'area.squareYards',
                key: 'squareYards'
            },
            {
                label: 'area.acres',
                key: 'acres'
            },
            {
                label: 'area.squareMiles',
                key: 'squareMiles'
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
    },
    speed: {
        fromDefaultUnit: 'kilometersPerHour',
        toDefaultUnit: 'milesPerHour',
        unitOptions: [
            {
                label: 'speed.centimetersPerSecond',
                key: 'centimetersPerSecond'
            },
            {
                label: 'speed.metersPerSecond',
                key: 'metersPerSecond'
            },
            {
                label: 'speed.kilometersPerHour',
                key: 'kilometersPerHour'
            },
            {
                label: 'speed.feetPerSecond',
                key: 'feetPerSecond'
            },
            {
                label: 'speed.milesPerHour',
                key: 'milesPerHour'
            },
            {
                label: 'speed.knots',
                key: 'knots'
            },
            {
                label: 'speed.mach',
                key: 'mach'
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
    },
    time: {
        fromDefaultUnit: 'minutes',
        toDefaultUnit: 'hours',
        unitOptions: [
            {
                label: 'time.microseconds',
                key: 'microseconds'
            },
            {
                label: 'time.milliseconds',
                key: 'milliseconds'
            },
            {
                label: 'time.seconds',
                key: 'seconds'
            },
            {
                label: 'time.minutes',
                key: 'minutes'
            },
            {
                label: 'time.hours',
                key: 'hours'
            },
            {
                label: 'time.days',
                key: 'days'
            },
            {
                label: 'time.weeks',
                key: 'weeks'
            },
            {
                label: 'time.years',
                key: 'years'
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
    },
    power: {
        fromDefaultUnit: 'horsepowerUS',
        toDefaultUnit: 'kilowatts',
        unitOptions: [
            {
                label: 'power.watts',
                key: 'watts'
            },
            {
                label: 'power.kilowatts',
                key: 'kilowatts'
            },
            {
                label: 'power.horsepowerUS',
                key: 'horsepowerUS'
            },
            {
                label: 'power.footPoundsMinute',
                key: 'footPoundsMinute'
            },
            {
                label: 'power.btusMinute',
                key: 'btusMinute'
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
        ],
        rowNumber: 5,
        columnNumber: 3,
    },
    data: {
        fromDefaultUnit: 'megabytes',
        toDefaultUnit: 'gigabytes',
        unitOptions: [
            {
                label: 'data.bits',
                key: 'bits'
            },
            {
                label: 'data.nibble',
                key: 'nibble'
            },
            {
                label: 'data.bytes',
                key: 'bytes'
            },
            {
                label: 'data.kilobits',
                key: 'kilobits'
            },
            {
                label: 'data.kibibits',
                key: 'kibibits'
            },
            {
                label: 'data.kilobytes',
                key: 'kilobytes'
            },
            {
                label: 'data.kibibytes',
                key: 'kibibytes'
            },
            {
                label: 'data.megabits',
                key: 'megabits'
            },
            {
                label: 'data.mebibits',
                key: 'mebibits'
            },
            {
                label: 'data.megabytes',
                key: 'megabytes'
            },
            {
                label: 'data.mebibytes',
                key: 'mebibytes'
            },
            {
                label: 'data.gigabits',
                key: 'gigabits'
            },
            {
                label: 'data.gibibits',
                key: 'gibibits'
            },
            {
                label: 'data.gigabytes',
                key: 'gigabytes'
            },
            {
                label: 'data.gibibytes',
                key: 'gibibytes'
            },
            {
                label: 'data.terabits',
                key: 'terabits'
            },
            {
                label: 'data.tebibits',
                key: 'tebibits'
            },
            {
                label: 'data.terabytes',
                key: 'terabytes'
            },
            {
                label: 'data.tebibytes',
                key: 'tebibytes'
            },
            {
                label: 'data.petabits',
                key: 'petabits'
            },
            {
                label: 'data.pebibits',
                key: 'pebibits'
            },
            {
                label: 'data.petabytes',
                key: 'petabytes'
            },
            {
                label: 'data.pebibytes',
                key: 'pebibytes'
            },
            {
                label: 'data.exabits',
                key: 'exabits'
            },
            {
                label: 'data.exbibits',
                key: 'exbibits'
            },
            {
                label: 'data.exabytes',
                key: 'exabytes'
            },
            {
                label: 'data.exbibytes',
                key: 'exbibytes'
            },
            {
                label: 'data.zetabits',
                key: 'zetabits'
            },
            {
                label: 'data.zebibits',
                key: 'zebibits'
            },
            {
                label: 'data.zetabytes',
                key: 'zetabytes'
            },
            {
                label: 'data.zebibytes',
                key: 'zebibytes'
            },
            {
                label: 'data.yottabits',
                key: 'yottabits'
            },
            {
                label: 'data.yobibits',
                key: 'yobibits'
            },
            {
                label: 'data.yottabytes',
                key: 'yottabytes'
            },
            {
                label: 'data.yobibytes',
                key: 'yobibytes'
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
    },
    pressure: {
        fromDefaultUnit: 'bars',
        toDefaultUnit: 'atmospheres',
        unitOptions: [
            {
                label: 'pressure.atmospheres',
                key: 'atmospheres'
            },
            {
                label: 'pressure.bars',
                key: 'bars'
            },
            {
                label: 'pressure.kilopascals',
                key: 'kilopascals'
            },
            {
                label: 'pressure.millimetersOfMercury',
                key: 'millimetersOfMercury'
            },
            {
                label: 'pressure.pascals',
                key: 'pascals'
            },
            {
                label: 'pressure.poundsPerSquareInch',
                key: 'poundsPerSquareInch'
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
    },
    angle: {
        fromDefaultUnit: 'radians',
        toDefaultUnit: 'degrees',
        unitOptions: [
            {
                label: 'angle.degrees',
                key: 'degrees'
            },
            {
                label: 'angle.radians',
                key: 'radians'
            },
            {
                label: 'angle.gradians',
                key: 'gradians'
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
        ],
        rowNumber: 5,
        columnNumber: 3,
    }

}