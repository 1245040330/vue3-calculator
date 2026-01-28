# Vue3 科学计算器

一个基于 Vue3 + Vite + MathJS 构建的现代化科学计算器应用，支持键盘操作和复杂数学表达式计算。

## 🌐 在线体验

https://1245040330.github.io/vue3-calculator/

🌐 **[中文文档](README_CH.md)** | **[English Documentation](README.md)**

## 🧩 截图

### 标准计算器
![alt text](src/assets/images/demo.png)

### 科学计算器
![alt text](src/assets/images/demo1.png)

### 日期计算
![alt text](src/assets/images/demoDate.png)

### 设置
![alt text](src/assets/images/demoSettings.png)

## ✅ 已实现功能

- 🎯 **标准计算器**：基础算术运算（+、-、×、÷），支持小数
- 🔬 **科学计算器**：高级数学函数，包括三角函数、对数和指数
- 📅 **日期计算**：日期差异计算和日期加减功能

## 🗒️ 待办项

### 计划实现的功能
- [ ] **绘图计算器**：绘制数学函数和方程图形
- [ ] **程序员计算器**：二进制、八进制、十六进制转换和运算
- [ ] **货币转换器**：实时货币汇率和转换
- [ ] **体积转换器**：不同体积单位之间的转换
- [ ] **长度转换器**：不同长度单位之间的转换
- [ ] **重量转换器**：不同重量单位之间的转换
- [ ] **温度转换器**：摄氏度、华氏度、开尔文等单位转换
- [ ] **能量转换器**：不同能量单位之间的转换
- [ ] **面积转换器**：不同面积单位之间的转换
- [ ] **速度转换器**：不同速度单位之间的转换
- [ ] **时间转换器**：不同时间单位之间的转换
- [ ] **功率转换器**：不同功率单位之间的转换
- [ ] **数据转换器**：不同数据存储单位之间的转换
- [ ] **压强转换器**：不同压强单位之间的转换
- [ ] **角度转换器**：度、弧度、梯度之间的转换


## ✨ 功能特性

- 🧮 **基础运算**：支持加减乘除四则运算
- 🔢 **数字输入**：支持小数点和负数
- ⌨️ **键盘支持**：完整键盘快捷键操作
- 🎨 **数学公式显示**：使用 KaTeX 渲染数学符号
- 📱 **响应式设计**：适配移动端和桌面端
- 🧠 **智能计算**：集成 MathJS 处理复杂数学表达式
- ⚡ **快速响应**：基于 Vue3 和 Vite 构建
- 📅 **日期计算**：支持日期差异计算和日期加减功能
- 🌍 **国际化支持**：多语言支持（英文和中文）
- 💾 **存储功能**：存储和调用计算结果
- ⚙️ **设置功能**：可自定义计算器偏好设置
- 🔍 **高级功能**：三角函数和其他科学计算

## 🚀 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **状态管理**：Pinia
- **数学计算**：MathJS
- **数学公式渲染**：KaTeX
- **键盘事件**：@vueuse/core
- **样式**：SCSS + UnoCSS
- **日期计算**：Day.js
- **国际化**：Vue I18n
- **图标**：SVG Icons

## 📦 项目结构

```
vue3-calculator/
├── src/
│   ├── assets/              # 静态资源
│   │   ├── icons/           # SVG 图标
│   │   ├── images/          # 图片资源
│   │   └── sounds/          # 音效
│   ├── components/          # 通用组件
│   │   ├── Radio/           # 单选按钮组件
│   │   ├── Select/          # 选择组件
│   │   └── SvgIcon.vue      # SVG 图标组件
│   ├── config/              # 配置文件
│   ├── i18n/                # 国际化设置
│   ├── locales/             # 语言文件
│   │   ├── en.json          # 英文翻译
│   │   └── zh-cn.json       # 中文翻译
│   ├── store/               # 状态管理 (Pinia)
│   │   ├── modules/         # Store 模块
│   ├── utils/               # 工具函数
│   ├── views/               # 页面组件
│   │   ├── dateCalculation/ # 日期计算功能
│   │   │   ├── addSubDays.vue # 日期加减
│   │   │   ├── diffDates.vue  # 日期差异计算
│   │   ├── display/         # 显示屏组件
│   │   ├── header/          # 头部组件
│   │   ├── keyboard/        # 键盘组件
│   │   ├── memoryCapability/# 存储功能组件
│   │   ├── more/            # 更多功能组件
│   │   └── settings/        # 设置组件
│   ├── App.vue              # 根组件
│   ├── main.js              # 应用入口
│   └── style.css            # 全局样式
├── public/                  # 公共资源
├── README.md                # 英文文档
├── README_CH.md             # 中文文档
└── package.json             # 项目配置
```

## 🛠️ 安装与运行

### npm组件 引用
```bash
npm install vue3-calculator

#main.js use
import Calculator from 'vue3-calculator'
import 'vue3-calculator/dist/vue3-calculator.css'
import "katex/dist/katex.min.css";
app.use(Calculator)
```

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
# 或
npm run serve
```

### 生产构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## ⌨️ 键盘快捷键

| 按键 | 功能 |
|------|------|
| 数字键 0-9 | 输入数字 |
| + - * / | 四则运算 |
| Enter | 计算结果 |
| Backspace | 退格删除 |
| C | 清空所有 |
| CE | 清空当前输入 |
| . | 小数点 |
| ( ) | 括号分组 |
| % | 百分比计算 |
| = | 计算结果 |
| Ctrl + M | 存储功能 |
| Ctrl + Z | 撤销操作 |

## 🧮 支持的数学功能

- **基础运算**：`1 + 2`, `3 * 4`, `10 / 2`, `8 - 3`
- **小数运算**：`3.14 + 2.5`
- **复杂表达式**：`2 * (3 + 4)`, `sqrt(16)`, `pow(2, 3)`
- **三角函数**：`sin(π/2)`, `cos(0)`, `tan(π/4)`
- **指数与对数**：`exp(1)`, `log(100)`, `ln(e)`
- **统计函数**：`mean([1, 2, 3])`, `median([1, 2, 3])`
- **逻辑运算**：`2 > 1`, `3 == 3`

## 📅 日期计算功能

- **日期差异计算**：计算两个日期之间的年、月、周、日差异
- **日期加减**：在给定日期上添加或减去年、月、日
- **格式支持**：YYYY-MM-DD 格式，显示星期几

## 🌍 国际化支持

- **语言**：英文和中文
- **动态切换**：无缝语言切换，无需页面刷新
- **本地化日期格式**：区域特定的日期格式
- **翻译的 UI 元素**：所有用户界面元素完全翻译



## 🔧 核心功能实现

### 数学计算
使用 MathJS 进行安全的数学表达式计算：
```javascript
import { create, all } from "mathjs"
const math = create(all)

// 安全计算表达式
const result = math.evaluate("2 + 3 * 4")
```

### 键盘事件处理
使用 @vueuse/core 监听键盘事件：
```javascript
import { useMagicKeys } from '@vueuse/core'
const magicKeys = useMagicKeys()
```

### 数学公式渲染
使用 KaTeX 渲染数学符号：
```javascript
import katex from "katex"
const renderResult = katex.renderToString("x^{2}", { throwOnError: false })
```

## 🎨 界面设计

- **显示屏**：显示当前输入和历史记录
- **键盘布局**：6x4 网格布局，科学计算器风格
- **按钮反馈**：按键高亮和悬停效果
- **数学符号**：专业数学符号显示（平方、开方等）

## 📱 移动端适配

- 响应式网格布局
- 触摸友好的按钮设计

## 🔒 安全特性

- 使用 MathJS 替代 eval，避免代码注入风险
- 输入验证和错误处理
- 安全的数学表达式解析

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

---

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！**