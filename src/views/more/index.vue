<template>
    <div class="more-box" ref="moreRef">
        <SvgIcon class="svg-box" name="more" @click="emits('more-click', false)" :size="14" color="var(--text-color)"
            style="padding: 10px 12px" />
        <div class="menu-list">
            <div class="sub-menu" v-for="item in moreList" :key="item.name">
                <div class="menu-item group-name"> {{ $t(item.name) }}</div>
                <div class="menu-item" v-for="child in item.children" :key="child.name" :class="getMenuItemClass(child)"
                    @click="handleClick(child)"> {{ $t(child.name) }}</div>
            </div>
        </div>
        <div class="setting-box">

            <div class="button" @click="next()">
                <SvgIcon class="svg-box" name="setting" :size="14" color="var(--text-color)" style="padding: 2px 8px" />
                <div>{{ $t('calculator.settings') }} {{ calculatorStore.version }} {{ state }}</div>
            </div>

        </div>

    </div>
</template>
<script setup>
import { watch, useTemplateRef,computed } from 'vue'
import { useCalculatorStore } from '@/store'
const calculatorStore = useCalculatorStore()
import { useColorMode, useCycleList, onClickOutside } from '@vueuse/core'
import { keynoardConfig } from '@/config/calculator'
const emits = defineEmits(['more-click'])
const activeMenu = defineModel('activeMenu')
const mode = useColorMode({
    emitAuto: true,
})
const moreRef = useTemplateRef('moreRef')

const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: mode })
watch(state, (newVal) => {
    mode.value = newVal
})
const moreList =computed(()=>{
    return keynoardConfig.moreMenuList
})


//点击元素以外的盒子
onClickOutside(moreRef, event => {
    emits('more-click', false)
})

/**
 *  动态获取class
 * @param item 
 */
const getMenuItemClass = (item) => {
    return [activeMenu.value.key == (item.key || item.name) ? 'active' : '', item.disabled ? 'disabled' : 'menu-item-content']
}
/**
 *  点击事件
 * @param item 
 */
const handleClick = (item) => {
    if (item.disabled) {
        return;
    }
    activeMenu.value = item;
    emits('more-click', false)
}
</script>

<style lang="scss" scoped>
.more-box {
    background-color: var(--btn-bg);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px 0;
    font-size: 14px;

    .menu-list {
        height: calc(100% - 90px);
        overflow: auto;
        padding: 4px;
        position: relative;

        .group-name {
            opacity: .70;
        }

        .menu-item {
            position: relative;
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;

        }

        .menu-item-content {

            &:hover,
            &.active {
                background-color: var(--bg-1-color)
            }

            &.active {
                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 3px;
                    height: 40%;
                    transform: translate(0%, 75%);
                    background-color: var(--bg-3-color);
                    border-radius: 8px;
                }
            }
        }
    }

    .setting-box {
        border-top: 1px solid var(--line-color);
        height: 56px;
        padding: 12px 4px 4px 4px;

        .button {
            align-items: center;
            display: flex;
            padding: 8px;
            border-radius: 4px;

            &:hover {
                background-color: var(--bg-1-color);
            }
        }
    }

}
</style>