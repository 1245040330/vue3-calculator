<template>
  <div class="memory-capability-box">
    <div class="item-box" @click="next()">{{ angleUnitState }}</div>
  </div>
</template>
<script setup>
import { onMounted, computed, watch } from "vue"
import { useCalculatorStore, } from '@/store'
import { useCycleList } from '@vueuse/core'
const calculatorStore = useCalculatorStore()
const { state: angleUnitState, next, prev, go } = useCycleList([
  'DEG',
  'RAD',
  'GRAD',
])
const angleUnit = computed({
  get: () => {
    return calculatorStore.angleUnit
  },
  set: (value) => {
    calculatorStore.setAngleUnit(value)
  }

})
watch(angleUnitState, (newValue) => {
  angleUnit.value = newValue
})
onMounted(() => {
  angleUnitState.value = angleUnit.value
})
</script>

<style lang="scss" scoped>
.memory-capability-box {
  height: 40px;
  font-size: 12px;
  overflow: hidden;
  display: flex;
  gap: 8px;
  padding: 4px 0;

  .item-box {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    border-radius: 4px;

    &:hover {
      background-color: #33313B;
    }




  }
}
</style>