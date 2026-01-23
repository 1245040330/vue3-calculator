<template>
  <div class="main-box bg-white text-gray-900 dark:bg-bg-dark dark:text-white">
    <Header @more-click="changeShowMenu" :name="activeMenu"></Header>
    <Display style="flex:1"></Display>
    <MemoryCapability></MemoryCapability>
    <Keyboard style="flex:4"></Keyboard>
    <More class="more-box" v-model:active-menu="activeMenu" v-if="showMenu" @more-click="changeShowMenu"></More>
  </div>
</template>
<script setup>
import { ref,computed } from 'vue'
import Header from "@/views/header/index.vue";
import Display from "@/views/display/index.vue"
import MemoryCapability from "@/views/memoryCapability/index.vue"
import Keyboard from "@/views/keyboard/index.vue"
import More from "@/views/more/index.vue"
import { useCalculatorStore } from '@/store'
const calculatorStore = useCalculatorStore()
const showMenu = ref(false)

const activeMenu = computed({
  get: () => {
    return calculatorStore.activeMenu
  },
  set: (value) => {
    calculatorStore.setActiveMenu(value)
  }

})
const changeShowMenu = (value) => {
  showMenu.value = value
}
</script>
<style lang="scss" scoped>
.main-box {
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  position: relative;

  .more-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 100%;
  }
}
</style>