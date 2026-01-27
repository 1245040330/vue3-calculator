<template>
    <div class="date-calculation">
        <div class="popover-box" ref="popoverRef">
            <div class="popover-button" ref="popoverButtonRef" @click="handleClick()">
                {{ activePopoverButton.label }}<SvgIcon name="downwardArrow" size="14px" style="margin-left: 4px;"></SvgIcon>
            </div>
            <div class="button-list" :style="popoverStyle" style="position: fixed; " v-if="showPopover">
                <KeyboardButton v-for="(itemKeyboard, itemKeyboardIndex) in keyboardList" v-if="keyboardList.length > 0"
                    active-keyboard-color="var(--btn-hover)"
                    :is-active="activePopoverButton.key == (itemKeyboard.key || itemKeyboard.label)"
                    :key="itemKeyboardIndex" @click="handleClickKeyboard(itemKeyboard, index)" style="padding: 4px 8px"
                    :show-before-border="true">
                    <div>{{ itemKeyboard.label }}</div>
                </KeyboardButton>
            </div>
        </div>
        <div class="content-box">
            <AddSubDays v-if="activePopoverButton.key == 'AddSubDays'"></AddSubDays>
            <DiffDates v-if="activePopoverButton.key == 'DiffDates'"></DiffDates>
        </div>

    </div>
</template>
<script setup>
import { ref, useTemplateRef, computed } from 'vue'
import { useCalculatorStore } from '@/store'
import { keynoardConfig } from '@/config/calculator'
import { useElementBounding, onClickOutside } from '@vueuse/core'
import KeyboardButton from "@/views/keyboard/keyboardButton.vue";
import AddSubDays from "@/views/dateCalculation/addSubDays.vue";
import DiffDates from "@/views/dateCalculation/diffDates.vue";
const calculatorStore = useCalculatorStore()
const popoverButtonRef = useTemplateRef("popoverButtonRef")
const popoverRef = useTemplateRef("popoverRef")
const activePopoverButton = ref({
    label: 'Difference between dates',
    key: "DiffDates"
});
const showPopover = ref(false)
const popoverStyle = ref({

})

const activeKeynoard = computed(() => {
    return keynoardConfig[calculatorStore.activeMenu] || {}
})
const keyboardList = computed(() => {
    return activeKeynoard.value.keyboardList || []
})
onClickOutside(popoverRef, event => {
    showPopover.value = false;
})

const handleClick = () => {
    const { x, y, top, right, bottom, left, width, height }
        = useElementBounding(popoverButtonRef)
    popoverStyle.value = {
        left: 0 + 'px',
        top: (y.value) + 'px',
    }
    showPopover.value = true;
}
const handleClickKeyboard = (item, index) => {
    activePopoverButton.value = item;
    showPopover.value = false;
}
</script>
<style lang="scss" scoped>
.date-calculation {
    overflow: auto;

    .popover-box {
        .popover-button {
            width: fit-content;
            padding: 4px 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            &:hover {
                background-color: var(--bg-2-color);
            }

            .icon-box {
                display: flex;
                align-items: center;
            }
        }

        .button-list {
            background-color: var(--popover-bg-color);
            border-radius: 8px;
            width: fit-content;
            max-width: 95vw;
            padding: 4px;
            z-index: 8;
            display: flex;
            flex-direction: column;
            gap: 4px;

        }
    }

    .content-box {
        height: calc(100% - 32px);
        padding: 8px;
    }
}
</style>