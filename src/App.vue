<template>
  <Main></Main>
</template>
<script setup>
import { watch } from 'vue'
import Main from '@/views/main.vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { useCalculatorStore } from '@/store'
const calculatorStore = useCalculatorStore()
const mode = useColorMode({
  emitAuto: true,
})
watch(() => calculatorStore.language, (value) => {
  locale.value = value
},
  { immediate: true }
)

</script>


<style lang="scss" scoped></style>
