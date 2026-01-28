<template>
    <div class="settings-box">
        <div class="title">{{ $t('settings.appearance') }}</div>
        <div class="item-box">
            <div class="item-title">{{ $t('settings.appTheme') }}</div>
            <div class="title-tips">{{ $t('settings.appThemeTips') }}</div>
        </div>
        <div class="item-content-box radio-group">
            <Radio value="light" label="settings.appThemeOptions.light" :checked="mode == 'light'"
                @change="updateColorMode"></Radio>
            <Radio value="dark" label="settings.appThemeOptions.dark" :checked="mode == 'dark'"
                @change="updateColorMode"></Radio>
            <Radio value="auto" label="settings.appThemeOptions.useSystemSetting" :checked="mode == 'auto'"
                @change="updateColorMode"></Radio>
        </div>

        <div class="item-box">
            <div class="item-title">{{ $t('settings.language') }}</div>
            <div class="title-tips">{{ $t('settings.languageTips') }}</div>
        </div>
        <div class="item-content-box radio-group">
            <Radio value="en" label="English" :checked="language == 'en'" @change="updateLanguage"></Radio>
            <Radio value="zh-cn" label="中文" :checked="language == 'zh-cn'" @change="updateLanguage"></Radio>

        </div>

        <div class="title">{{ $t('settings.about') }}</div>
        <div class="item-box">
            <div class="item-title">{{ $t('calculator.calculator') }}</div>
            <div class="title-tips">{{ $t('settings.aboutTips') }}</div>
        </div>
        <div class="item-content-box">
            <div>{{ calculatorStore.version }}</div>
            <div style="font-size: 12px;" v-html="$t('settings.githubTips')"></div>
        </div>

    </div>
</template>
<script setup>
import { watch, computed } from 'vue'
import Radio from "@/components/Radio/index.vue"

import { useColorMode, useCycleList } from '@vueuse/core'
import { useCalculatorStore } from '@/store'
const calculatorStore = useCalculatorStore()

const mode = useColorMode({
    emitAuto: true,
})
const language = computed({
    get: () => {
        return calculatorStore.language
    },
    set: (value) => {
        calculatorStore.setLanguage(value)
    }
})

const updateColorMode = (colorMode) => {
    mode.value = colorMode
}
const updateLanguage = (value) => {
    language.value = value;
}

</script>
<style lang="scss" scoped>
.settings-box {
    padding: 8px;
    overflow: auto;

    .title {
        margin-top: 16px;
    }

    .item-box {
        background-color: var(--bg-2-color);
        padding: 16px;
        margin-top: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;


        .title-tips {
            opacity: .70;
            font-size: 12px;
        }
    }

    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-size: 12px;
    }

    .item-content-box {
        background-color: var(--bg-2-color);
        margin-top: 2px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        padding: 16px;
    }


}
</style>