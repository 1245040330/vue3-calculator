import SvgIcon from "@/components/SvgIcon.vue";
import { h, } from "vue";
export const keynoardConfig = {
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
                        color: "#fff",
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
            },
            {
                latex: '\\pi',
            },
            {
                label: "e",
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
                        color: "#fff",
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
                latex: "\\left |x\\right|",
            },
            {
                label: "exp",
            },
            {
                label: "mod",
            },
            {
                latex: `\\sqrt[2]{x} `,
                key: 'Sqrt',
            },
            {
                label: "(",
            },
            {
                label: ")",
            },
            {
                latex: `n!`,
            },
            {
                latex: `{\\div}`,
                key: "/",
                keyboard: 'NumpadDivide,Slash'
            },
            {
                latex: "x^{y} ",
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
                name: 'Trigonometry',
                key: 'trigonometry',
                iconComponent: h(
                    SvgIcon,
                    {
                        size: "18px",
                        name: "trigonometry",
                        color: "#fff",
                        style: "padding: 4px",
                    },
                    {}
                ),
                rowNumber: 2,
                columnNumber: 4,
                keyboardList: [
                    {
                        latex: "2^nd",
                    },
                    {
                        label: "sin",
                    },
                    {
                        label: "cos",
                    },
                    {
                        label: "tan",
                    },
                      {
                        label: "htp",
                    },
                    {
                        label: "sec",
                    },
                    {
                        label: "csc",
                    },
                     {
                        label: "cot",
                    },
                ]
            },
            {
                name: 'Function',
                key: 'function',
                latex: '\\int',
                  keyboardList: [
                    {
                        latex: "2^nd",
                    },
                    {
                        label: "sin",
                    },
                    {
                        label: "cos",
                    },
                    {
                        label: "tan",
                    },
                    {
                        label: "sec",
                    },
                    {
                        label: "csc",
                    },
                     {
                        label: "cot",
                    },
                ]
            },
        ],
        rowNumber: 7,
        columnNumber: 5,
    },
}