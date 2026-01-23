//计算器
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        data: {
            currentText: '0',
            calculationText: "",
            activeMenu: useStorage('calculator0-active-menu', 'standard') ,
            angleUnit:useStorage('calculator0-angle-unit', 'DEG'),//DEG,RAD,GRAD
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
        angleUnit(){
            return this.data.angleUnit
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
        setAngleUnit(value){
            this.data.angleUnit = value
        },
    },
})
