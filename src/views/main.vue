<template>
  <div class="main-box">
    <Header @more-click="changeShowMenu" :name="activeMenu.name"></Header>
    <DateCalculation v-if="activeMenu.key == 'dateCalculation'" style="flex:1;height: 1px;"></DateCalculation>
    <Settings v-else-if="activeMenu.key == 'settings'"></Settings>
    <Length v-else-if="activeMenu.key == 'length'"></Length>
    <template v-else>
      <Display style="flex:1;height: 1px;"></Display>
      <MemoryCapability></MemoryCapability>
      <Keyboard style="flex:4;height: 1px;"></Keyboard>
    </template>

    <More class="more-box" v-model:active-menu="activeMenu" v-if="showMenu" @more-click="changeShowMenu"></More>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Header from "@/views/header/index.vue";
import Display from "@/views/display/index.vue"
import MemoryCapability from "@/views/memoryCapability/index.vue"
import Keyboard from "@/views/keyboard/index.vue"
import More from "@/views/more/index.vue"
import DateCalculation from "@/views/dateCalculation/index.vue"
import Length from "@/views/length/index.vue"
import Settings from "@/views/settings/index.vue"
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
  container-type: size;
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--bg-color);
  color: var(--text-color);

  .more-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 100%;
  }
}
</style>