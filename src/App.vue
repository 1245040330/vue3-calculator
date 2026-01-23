
<template>
  <Main></Main>
</template>
<script setup>
import Main from '@/views/main.vue'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode({
    emitAuto: true,
})

</script>


<style lang="scss" scoped>

</style>
