# Vue3 科学计算器

一个基于 Vue3 + Vite + MathJS 构建的现代化科学计算器应用，支持键盘操作和复杂数学表达式计算。

## 🌐 在线体验

https://1245040330.github.io/vite-calculator/

🌐 **[中文文档](README_CH.md)** | **[English Documentation](README.md)**

## 🧩 截图
![alt text](src/assets/images/demo.png)

## ✨ 功能特性

- 🧮 **基础运算**：支持加减乘除四则运算
- 🔢 **数字输入**：支持小数点和负数
- ⌨️ **键盘支持**：完整键盘快捷键操作
- 🎨 **数学公式显示**：使用 KaTeX 渲染数学符号
- 📱 **响应式设计**：适配移动端和桌面端
- 🧠 **智能计算**：集成 MathJS 处理复杂数学表达式
- ⚡ **快速响应**：基于 Vue3 和 Vite 构建

## 🚀 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **数学计算**：MathJS
- **数学公式渲染**：KaTeX
- **移动端 UI**：Vant
- **键盘事件**：@vueuse/core
- **样式**：SCSS + UnoCSS

## 📦 项目结构

```
vite-calculator/
├── src/
│   ├── components/          # 通用组件
│   ├── views/
│   │   └── keyboard/        # 计算器键盘组件
│   ├── assets/              # 静态资源
│   └── main.js              # 应用入口
├── public/                  # 公共资源
└── package.json
```

## 🛠️ 安装与运行

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

## 🧮 支持的数学功能

- 基础运算：`1 + 2`, `3 * 4`, `10 / 2`, `8 - 3`
- 小数运算：`3.14 + 2.5`
- 复杂表达式：`2 * (3 + 4)`, `sqrt(16)`, `pow(2, 3)`

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

- 使用 Vant 组件库确保移动端体验
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