<template>
    <div class="select-box" @click="openPopup()" ref="selectBoxRef" :style="{ '--zIndex': props.zIndex }">
        {{ modelValue }}
        <SvgIcon name="downwardArrow" size="12px" style="margin-left: 4px;"></SvgIcon>
        <div class="popover-box" ref="popoverBoxRef" :style="popoverStyle" v-if="showPopover">
            <div class="popover-item" :class="{ 'active': item.value == modelValue }" v-for="item in props.options"
                :key="item.key" @click="updateValue(item)">
                {{ item.label }}
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, computed, defineModel, useTemplateRef, nextTick } from 'vue'
import { useElementBounding, onClickOutside } from '@vueuse/core'
const props = defineProps({
    options: {
        type: Array,
        default: () => {
            return []
        }
    },
    popoverHeight: {
        type: String,
        default: '200px'
    },
    zIndex: {
        type: String,
        default: 'var(--z-index)'
    },
})
const selectBoxRef = useTemplateRef("selectBoxRef")
const popoverBoxRef = useTemplateRef("popoverBoxRef")
const modelValue = defineModel()
const showPopover = ref(false)
const popoverStyle = ref({

})
//点击元素以外的盒子
onClickOutside(selectBoxRef, event => {
    showPopover.value = false;
})
const openPopup = () => {
    if (showPopover.value) {
        showPopover.value = false;
        return;
    }
    const { x, y, top, right, bottom, left, width, height }
        = useElementBounding(selectBoxRef.value)
    popoverStyle.value = {
        left: x.value + 'px',
        top: (y.value + height.value + 2) + 'px',
        height: props.popoverHeight,
        width: width.value + 'px',
    }
    showPopover.value = true
    nextTick(() => {
        let maxHeight = window.innerHeight;
        const { y: popoverY, top, right, bottom, left, width, height: popoverHeight }
            = useElementBounding(popoverBoxRef.value)
        if (popoverY.value + popoverHeight.value > maxHeight) {
            let bottom = maxHeight - y.value + 2;
            if (bottom + popoverHeight.value > maxHeight) {
                popoverStyle.value = {
                    ...popoverStyle.value,
                    height: maxHeight - popoverY.value + 'px'
                }
            } else {
                popoverStyle.value = {
                    ...popoverStyle.value,
                    top: undefined,
                    bottom: (maxHeight - y.value + 2) + 'px',
                }
            }

        }
    })


}
const updateValue = (item) => {
    modelValue.value = item.value
}
</script>
<style lang="scss" scoped>
.select-box {
    border-radius: 8px;
    background-color: var(--bg-2-color);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;

    &:hover {
        background-color: var(--btn-bg);
    }


    .popover-box {
        position: fixed;
        overflow: auto;
        background-color: var(--bg-2-color);
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 4px;
        border-radius: 8px;
        z-index: var(--zIndex);

        .popover-item {
            padding: 4px 8px;
            border-radius: 4px;
            position: relative;

            &:hover,
            &.active {
                background-color: var(--btn-hover);
            }

            &.active:before {
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
</style>