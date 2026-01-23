<template>
  <div class="keyboard-box"
    :style="{ '--row-number': rowNumber, '--column-number': columnNumber, '--active-keyboard-color': '#9F9FA0' }">
    <CustomToolbar class="custom-toolbar-box" v-if="customToolbar && customToolbar.length > 0"
      :custom-toolbar="customToolbar" @handle-key-press="handleKeyPress"></CustomToolbar>
    <div class="keyboard-list">
      <KeyboardButton v-for="item in keyboardList" :is-hover="hoverKeyboardObject[item.keyboard]"
        :is-active="activeKeyboardObject[item.key]" @click="handleKeyPress(item)">
        <component v-if="renderComponents(item, activeKeyboardObject)"
          :is="renderComponents(item, activeKeyboardObject)"> </component>
        <div v-else v-html="renderKeyboardLabel(item, activeKeyboardObject)"></div>
      </KeyboardButton>
    </div>

  </div>
</template>
<script setup>


import KeyboardButton from "./keyboardButton.vue";
import CustomToolbar from "./customToolbar.vue";

import { onMounted, onBeforeUnmount, computed, h, watchEffect, ref, watch } from "vue";
import {
  useMagicKeys,
} from '@vueuse/core'
import { useCalculatorStore, } from '@/store'
import { operatorList, renderKeyboardLabel, renderComponents, backspace, inputDot, evaluate, generateCalculationText, clearEntry, clear, negate, percent, enter, reciprocal, sqr, sqrt, abs, joinOperation, unaryOperation, random, toDMMSS, fromDMMSS } from '@/utils/mathUtil'
import { keynoardConfig } from '@/config/calculator'
const calculatorStore = useCalculatorStore()

const calculationText = computed({
  get: () => {
    return calculatorStore.calculationText
  },
  set: (value) => {
    calculatorStore.setCalculationText(value)
  }

})
const currentText = computed({
  get: () => {
    return calculatorStore.currentText
  },
  set: (value) => {
    calculatorStore.setCurrentText(value.trim())
  }
})
const updateCurremtText = ref(false)
watch(() => currentText.value, (newVal, oldVal) => {
  //从有值变成无值时，不更新文本
  if (oldVal && newVal == 0) {
    return;
  }
  updateCurremtText.value = true
})
const activeKeynoard = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu] || {}
})


const magicKeys = useMagicKeys();

const keyboardList = computed(() => {
  return activeKeynoard.value.keyboardList || []
})
const rowNumber = computed(() => {
  return activeKeynoard.value.rowNumber || 0
})
const columnNumber = computed(() => {
  return activeKeynoard.value.columnNumber || 0
})
const customToolbar = computed(() => {
  return activeKeynoard.value.customToolbar || []
})
const hoverKeyboardObject = ref({})
const activeKeyboardObject = ref({})
watchEffect(() => {
  keyboardList.value.forEach(item => {
    if (item.keyboard && typeof item.keyboard == 'string' && item.keyboard.split(",").length > 0) {
      let keyboards = item.keyboard.split(",");
      if (keyboards.some(key => magicKeys[key].value)) {
        hoverKeyboardObject.value[item.keyboard] = true
      } else {
        hoverKeyboardObject.value[item.keyboard] = false
      }

    }
  });
});
//是否激活2nd

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
  activeKeynoard.value.keyboardList.forEach(keyboardItem => {
    if (keyboardItem.isActiveButton) {
      activeKeyboardObject.value[keyboardItem.key || keyboardItem.label] = false
    }

  });

});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})




/**
 * 键盘按下
 * @param key 
 */
const handleKeyPress = (key) => {
  let { label, key: keyValue } = key;
  Object.keys(activeKeyboardObject.value).forEach(activeKeyboardKey => {
    if (activeKeyboardObject.value[activeKeyboardKey] && key[activeKeyboardKey]) {
      label = key[activeKeyboardKey].label;
      keyValue = key[activeKeyboardKey].key;
    }
  })

  const value = keyValue || label;


  if (operatorList.includes(value)) {
    calculationText.value = generateCalculationText(calculationText.value, currentText.value, value, updateCurremtText.value)
    currentText.value = ""
    updateCurremtText.value = false;
  } else if (value == 'Enter') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = enter(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == '.') {
    currentText.value = inputDot(currentText.value)
  } else if (value == 'Backspace') {
    currentText.value = backspace(currentText.value)
  } else if (value == 'Negate') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = negate(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Delete') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = clearEntry(calculationText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Clear') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = clear(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == "%") {
    currentText.value = percent(currentText.value)
  } else if (value == 'Reciprocal') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = reciprocal(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sqr') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = sqr(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == "Sqrt") {
    const { calculationText: newCalculationText, currentText: newCurrentText } = sqrt(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'ConstantPI') {
    currentText.value = '3.1415926535897932384626433832795'
  } else if (value == 'ConstantE') {
    currentText.value = '2.7182818284590452353602874713527'
  } else if (value == 'Abs') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = abs(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Exp') {
    if (!calculationText.value) {
      currentText.value = currentText.value + '.e+0'
    }
  } else if (value == 'Mod') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = joinOperation(['mod'], calculationText.value, currentText.value, updateCurremtText.value, true)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == "(") {
    const { calculationText: newCalculationText, currentText: newCurrentText } = joinOperation(['('], calculationText.value, currentText.value, updateCurremtText.value, false)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == ")") {
    const { calculationText: newCalculationText, currentText: newCurrentText } = joinOperation([')'], calculationText.value, currentText.value, updateCurremtText.value, false)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
    updateCurremtText.value = false;
  } else if (value == 'Fact') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation("fact(", calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == '10^') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation("10^(", calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'l') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation("log10(", calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'n') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation("ln(", calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Cuberoot') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation("cuberoot(", calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Yroot') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('nthRoot(', calculationText.value, currentText.value, ",{_})")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == '2^{x}') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('2^(', calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'log_{y}{x}') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('log(', calculationText.value, currentText.value, ",{_})")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'e^{x}') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('e^(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sin') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('sin(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Cos') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('cos(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Tan') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('tan(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sec') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('sec(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Csc') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('csc(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Cot') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('cot(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Asin') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('asin(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Acos') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acos(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Atan') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('atan(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Asec') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('asec(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Acsc') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acsc(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Acot') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acot(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sinh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('sinh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Cosh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('cosh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Tanh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('tanh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sech') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('sech(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Csch') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('csch(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Coth') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('coth(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Asinh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('asinh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Acosh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acosh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (value == 'Atanh') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('atanh(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Asech') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('asech(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Acsch') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acsch(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Acoth') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('acoth(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Floor') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('floor(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Ceil') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = unaryOperation('ceil(', calculationText.value, currentText.value, ")")
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Rand') {
    currentText.value = random()
  } else if (value == 'ToDms') {
    currentText.value = toDMMSS(currentText.value)
  } else if (value == 'ToDeg') {
    currentText.value = fromDMMSS(currentText.value)
  }

  else if (Object.keys(activeKeyboardObject.value).includes(value) && !key.prefix) {
    activeKeyboardObject.value[value] = !activeKeyboardObject.value[value]
  } else if (!isNaN(Number(value)) && typeof Number(value) == 'number') {
    if (currentText.value === "0") {
      currentText.value = value;
      updateCurremtText.value = true;
    } else if (currentText.value === "Error" || currentText.value == 'Infinity') {
      calculationText.value = "";
      currentText.value = value;

    } else {
      if (currentText.value.length < 16) {
        currentText.value += value;
      }

    }
  }
  if (!currentText.value || currentText.value.length == 0) {
    currentText.value = "0"
  }
};
</script>
<style lang="scss" scoped>
.keyboard-box {

  display: flex;
  flex-direction: column;

  .custom-toolbar-box {
    height: 40px;
  }

  .keyboard-list {
    flex: 1;
    height: 1px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(var(--column-number), minmax(auto, 1fr));
    grid-template-rows: repeat(var(--row-number), minmax(auto, 1fr));
    justify-content: space-evenly;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
  }
}
</style>