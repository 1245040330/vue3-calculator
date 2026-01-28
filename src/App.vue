<template>
  <Main></Main>
</template>
<script setup>
import Main from '@/views/main.vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
const {  locale } = useI18n()
const mode = useColorMode({
  emitAuto: true,
})
locale.value = 'en'
</script>


<style lang="scss" scoped></style>
