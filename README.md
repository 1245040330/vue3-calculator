# Vue3 Scientific Calculator

A modern scientific calculator application built with Vue3 + Vite + MathJS, featuring keyboard support and complex mathematical expression evaluation.

## 🌐 Demo

https://1245040330.github.io/vue3-calculator/

🌐 **[中文文档](README_CH.md)** | **[English Documentation](README.md)**

## 🧩 screenshot

### standard
![alt text](src/assets/images/demo.png)

### scientific
![alt text](src/assets/images/demo1.png)

### date calculation
![alt text](src/assets/images/demoDate.png)

### settings
![alt text](src/assets/images/demoSettings.png)

## ✅ Implemented Features

- 🎯 **Standard Calculator**: Basic arithmetic operations (+, -, ×, ÷) with decimal support
- 🔬 **Scientific Calculator**: Advanced mathematical functions including trigonometry, logarithms, and exponentials
- 📅 **Date Calculation**: Date difference calculation and date addition/subtraction functionality

## 🗒️ Todo Items

### Features to Implement
- [ ] **Graphing Calculator**: Plot mathematical functions and equations
- [ ] **Programmer Calculator**: Binary, octal, hexadecimal conversions and operations
- [ ] **Currency Converter**: Real-time currency exchange rates and conversions
- [ ] **Volume Converter**: Convert between different volume units
- [ ] **Length Converter**: Convert between different length units
- [ ] **Weight Converter**: Convert between different weight units
- [ ] **Temperature Converter**: Convert between Celsius, Fahrenheit, Kelvin, etc.
- [ ] **Energy Converter**: Convert between different energy units
- [ ] **Area Converter**: Convert between different area units
- [ ] **Speed Converter**: Convert between different speed units
- [ ] **Time Converter**: Convert between different time units
- [ ] **Power Converter**: Convert between different power units
- [ ] **Data Converter**: Convert between different data storage units
- [ ] **Pressure Converter**: Convert between different pressure units
- [ ] **Angle Converter**: Convert between degrees, radians, and gradients

## ✨ Features

- 🧮 **Basic Operations**: Support for addition, subtraction, multiplication, and division
- 🔢 **Number Input**: Support for decimal points and negative numbers
- ⌨️ **Keyboard Support**: Complete keyboard shortcut functionality
- 🎨 **Mathematical Notation**: Professional mathematical symbols using KaTeX rendering
- 📱 **Responsive Design**: Mobile and desktop compatibility
- 🧠 **Smart Calculation**: Integrated MathJS for complex mathematical expressions
- ⚡ **Fast Performance**: Built with Vue3 and Vite for optimal speed
- 📅 **Date Calculation**: Support for date difference calculation and date addition/subtraction
- 🌍 **Internationalization**: Multi-language support (English and Chinese)
- 💾 **Memory Functions**: Store and recall calculation results
- ⚙️ **Settings**: Customizable calculator preferences
- 🔍 **Advanced Functions**: Trigonometric functions and other scientific calculations

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Mathematical Computation**: MathJS
- **Mathematical Notation Rendering**: KaTeX
- **Keyboard Events**: @vueuse/core
- **Styling**: SCSS + UnoCSS
- **Date Calculation**: Day.js
- **Internationalization**: Vue I18n
- **Icons**: SVG Icons

## 📦 Project Structure

```
vue3-calculator/
├── src/
│   ├── assets/              # Static assets
│   │   ├── icons/           # SVG icons
│   │   ├── images/          # Image resources
│   │   └── sounds/          # Sound effects
│   ├── components/          # Common components
│   │   ├── Radio/           # Radio button component
│   │   ├── Select/          # Select component
│   │   └── SvgIcon.vue      # SVG icon component
│   ├── config/              # Configuration files
│   ├── i18n/                # Internationalization setup
│   ├── locales/             # Language files
│   │   ├── en.json          # English translations
│   │   └── zh-cn.json       # Chinese translations
│   ├── store/               # State management (Pinia)
│   │   ├── modules/         # Store modules
│   ├── utils/               # Utility functions
│   ├── views/               # Page components
│   │   ├── dateCalculation/ # Date calculation features
│   │   │   ├── addSubDays.vue # Add/subtract days
│   │   │   ├── diffDates.vue  # Date difference calculator
│   │   ├── display/         # Display screen components
│   │   ├── header/          # Header components
│   │   ├── keyboard/        # Keyboard components
│   │   ├── memoryCapability/# Memory capability components
│   │   ├── more/            # More features components
│   │   └── settings/        # Settings components
│   ├── App.vue              # Root component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles
├── public/                  # Public resources
├── README.md                # English documentation
├── README_CH.md             # Chinese documentation
└── package.json             # Project configuration
```

## 🛠️ Installation & Setup

### Install Dependencies
```bash
npm install
```

### Development Environment
```bash
npm run dev
# or
npm run serve
```

### Production Build
```bash
npm run build
```

### Preview Build Result
```bash
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Key | Function |
|-----|----------|
| Number Keys 0-9 | Input numbers |
| + - * / | Basic arithmetic operations |
| Enter | Calculate result |
| Backspace | Delete last character |
| C | Clear all |
| CE | Clear current entry |
| . | Decimal point |
| ( ) | Parentheses for grouping |
| % | Percentage calculation |
| = | Calculate result |
| Ctrl + M | Memory functions |
| Ctrl + Z | Undo |

## 🧮 Supported Mathematical Functions

- **Basic Operations**: `1 + 2`, `3 * 4`, `10 / 2`, `8 - 3`
- **Decimal Operations**: `3.14 + 2.5`
- **Complex Expressions**: `2 * (3 + 4)`, `sqrt(16)`, `pow(2, 3)`
- **Trigonometric Functions**: `sin(π/2)`, `cos(0)`, `tan(π/4)`
- **Exponential & Logarithmic**: `exp(1)`, `log(100)`, `ln(e)`
- **Statistical Functions**: `mean([1, 2, 3])`, `median([1, 2, 3])`
- **Logical Operations**: `2 > 1`, `3 == 3`

## 📅 Date Calculation Features

- **Date Difference Calculator**: Calculate the difference between two dates in years, months, weeks, and days
- **Date Addition/Subtraction**: Add or subtract years, months, and days from a given date
- **Format Support**: YYYY-MM-DD format with day of week display

## 🌍 Internationalization Support

- **Languages**: English and Chinese
- **Dynamic Switching**: Seamless language change without page reload
- **Localized Date Formats**: Region-specific date formatting
- **Translated UI Elements**: All user interface elements fully translated



## 🔧 Core Implementation

### Mathematical Calculation
Using MathJS for safe mathematical expression evaluation:
```javascript
import { create, all } from "mathjs"
const math = create(all)

// Safe expression evaluation
const result = math.evaluate("2 + 3 * 4")
```

### Keyboard Event Handling
Using @vueuse/core for keyboard event monitoring:
```javascript
import { useMagicKeys } from '@vueuse/core'
const magicKeys = useMagicKeys()
```

### Mathematical Formula Rendering
Using KaTeX for mathematical symbol rendering:
```javascript
import katex from "katex"
const renderResult = katex.renderToString("x^{2}", { throwOnError: false })
```

## 🎨 UI Design

- **Display Screen**: Shows current input and calculation history
- **Keyboard Layout**: 6x4 grid layout with scientific calculator styling
- **Button Feedback**: Key highlighting and hover effects
- **Mathematical Symbols**: Professional mathematical notation (square, square root, etc.)

## 📱 Mobile Adaptation

- Responsive grid layout
- Touch-friendly button design

## 🔒 Security Features

- Uses MathJS instead of eval to prevent code injection risks
- Input validation and error handling
- Safe mathematical expression parsing

## 🤝 Contributing

Feel free to submit Issues and Pull Requests to improve this project!

## 📄 License

MIT License

---

**⭐ If this project helps you, please give it a Star!**