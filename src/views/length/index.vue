<template>
  <div class="length-box">
    <NumberDisplay
      :class="[(activeDisplay == 'from' ? 'active' : '')]"
      @click="activeDisplay = 'from'"
      style="flex: 1; height: 1px"
      v-model="fromValue"
    ></NumberDisplay>
    <Select
      class="select-box"
      :options="unitOptions"
      v-model="fromUnitValue"
      value-field="key"
      popover-width="fit-content"
    ></Select>
    <NumberDisplay
      :class="[(activeDisplay == 'to' ? 'active' : '')]"
      @click="activeDisplay = 'to'"
      style="flex: 1; height: 1px"
      v-model="toValue"
    ></NumberDisplay>
    <Select
      class="select-box"
      :options="unitOptions"
      v-model="toUnitValue"
      value-field="key"
      popover-width="fit-content"
    ></Select>
    <Keyboard style="flex: 5" :handle-key-press="handleKeyPress"></Keyboard>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import Select from "@/components/select/index.vue";
import NumberDisplay from "@/views/display/number.vue";
import Keyboard from "@/views/keyboard/index.vue";
import { keynoardConfig } from "@/config/calculator";
import { inputDot, backspace } from "@/utils/mathUtil";
import { convertLength } from "@/utils/lengthUtil";
const unitOptions = computed(() => {
  return keynoardConfig.length.unitOptions || [];
});

const fromUnitValue = ref("centimeters");
const toUnitValue = ref("inches");
const fromValue = ref("0");
const toValue = ref("0");
watch(fromUnitValue, () => {
  calculateLength();
});
watch(toUnitValue, () => {
  calculateLength();
});
const activeDisplay = ref("from");
const handleKeyPress = (value) => {
  let currentText =
    activeDisplay.value == "from" ? fromValue.value : toValue.value;
  if (value == ".") {
    currentText = inputDot(currentText);
  } else if (value == "Backspace") {
    currentText = backspace(currentText);
  } else if (value == "Delete") {
    fromValue.value = "0";
    toValue.value = "0";
    currentText = "0";
  } else if (!isNaN(Number(value)) && typeof Number(value) == "number") {
    if (currentText === "0") {
      currentText = value;
    } else if (currentText === "Error" || currentText == "Infinity") {
      currentText = value;
    } else {
      if (currentText.length < 16) {
        currentText += value;
      }
    }
  }
//   console.log(value);
  if (activeDisplay.value == "from") {
    fromValue.value = currentText;
  } else {
    toValue.value = currentText;
  }
  calculateLength();
};

const calculateLength = () => {
  if (activeDisplay.value == "from") {
    toValue.value = convertLength(
      Number(fromValue.value),
      fromUnitValue.value,
      toUnitValue.value
    );
  } else {
    fromValue.value = convertLength(
      Number(toValue.value),
      toUnitValue.value,
      fromUnitValue.value
    );
  }
};
</script>
<style lang="scss" scoped>
.length-box {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .active{
    font-weight: bold;
  }
  .select-box {
    width: fit-content;
  }
}
</style>
