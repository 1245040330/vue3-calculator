
<template>
  <Main></Main>
</template>
<script setup>
import Main from '@/views/main.vue'

const theme = localStorage.getItem('theme') ?? 'auto'

const isDark =
  theme === 'dark' ||
  (theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)

document.documentElement.classList.toggle('dark', isDark)
</script>


<style lang="scss" scoped>

</style>
