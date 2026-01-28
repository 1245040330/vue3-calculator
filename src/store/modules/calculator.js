//计算器
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        data: {
            currentText: '0',
            calculationText: "",
            activeMenu: useStorage('calculator-active-menu', { key: 'standard', name: 'calculator.standard' }),
            angleUnit: useStorage('calculator-angle-unit', 'DEG'),//DEG,RAD,GRAD
            version: '1.1.0',
            language: useStorage('calculator-language', 'en')
        }

    }),
    getters: {
        currentText() {
            return this.data.currentText;
        },
        calculationText() {
            return this.data.calculationText;
        },
        activeMenu() {
            return this.data.activeMenu
        },
        angleUnit() {
            return this.data.angleUnit
        },
        version() {
            return this.data.version
        },
        language() {
            return this.data.language
        }

    },
    actions: {
        setCurrentText(value) {
            this.data.currentText = value
        },
        setCalculationText(value) {
            this.data.calculationText = value;
        },
        setActiveMenu(value) {
            this.data.activeMenu = value
        },
        setAngleUnit(value) {
            this.data.angleUnit = value
        },
        setLanguage(value) {
            this.data.language = value
        }
    },
})
