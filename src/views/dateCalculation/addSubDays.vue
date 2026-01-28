<template>
    <div class="add-sub-days">
        <div class="tips-box">{{ $t('dateCalculation.from') }}</div>
        <input v-model="from" type="text">
        <div class="radio-group">
            <div class="radio-container" :class="[operation == 'add' ? 'checked' : '']" @click="updateOperation('add')">
                <div class="custom-radio"></div>
                {{ $t('dateCalculation.add') }}
            </div>
            <div class="radio-container" :class="[operation == 'sub' ? 'checked' : '']" @click="updateOperation('sub')">
                <div class="custom-radio"></div>
                 {{ $t('dateCalculation.subtract') }}
            </div>
        </div>
        <div class="tips-group">
            <div class="tips-box" style="width: 88px;">{{ $t('dateCalculation.year') }}</div>
            <div class="tips-box" style="width: 88px;">{{ $t('dateCalculation.month') }}</div>
            <div class="tips-box" style="width: 88px;">{{ $t('dateCalculation.day') }}</div>
        </div>
        <div class="select-group">
            <Select class="select-box" v-model="years" :options="options">
            </Select>
            <Select class="select-box" v-model="months" :options="options">
            </Select>
            <Select class="select-box" v-model="days" :options="options">
            </Select>
        </div>
        <div class="tips-box">{{$t('dateCalculation.date')}}</div>
        <div>
            {{ dateString }}
        </div>

    </div>

</template>
<script setup>
import { ref, computed } from 'vue'
import Select from "@/components/Select/index.vue"

import dayjs from 'dayjs'

const from = ref('2026-03-17')
const operation = ref('add')
const years = ref('1')
const months = ref('2')
const days = ref('3')

const options = computed(() => {
    let list = []
    for (let i = 0; i < 1000; i++) {
        list.push({
            label: i,
            value: i
        })
    }
    return list
})
const dateString = computed(() => {
    let fromDayjs = dayjs(from.value);
    let dayjsOperation = 'add';
    if (operation.value == 'sub') {
        dayjsOperation = 'subtract';
    }
    let toDayjs = fromDayjs;
    if (years.value > 0) {
        toDayjs = toDayjs[dayjsOperation](years.value, 'year');
    }
    if (months.value > 0) {
        toDayjs = toDayjs[dayjsOperation](months.value, 'month');
    }
    if (days.value > 0) {
        toDayjs = toDayjs[dayjsOperation](days.value, 'day');
    }
    return toDayjs.format('YYYY-MM-DD dddd');
})
const updateOperation = (value) => {
    operation.value = value
}
</script>
<style lang="scss" scoped>
.add-sub-days {
    .tips-box {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 12px;
        opacity: .70;
    }

    .radio-group {
        display: flex;
        gap: 32px;
        margin-top: 32px;

        .radio-container {
            display: flex;
            align-items: center;
            position: relative;
            padding-left: 30px;
            /* 为圆圈留出空间 */
            cursor: pointer;
            font-size: 16px;
            user-select: none;

            /* 自定义大圆圈 */
            .custom-radio {
                position: absolute;
                left: 0;
                height: 24px;
                /* 控制圆圈高度 */
                width: 24px;
                /* 控制圆圈宽度 */
                background-color: var(--radio-bg-color);
                border-radius: 50%;
                border: 1px solid var(--bg-3-color);
                transition: all 0.3s;

                &:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
            }


            /* 鼠标悬停效果 */
            &:hover .custom-radio {
                background-color: var(--radio-check-bg-color);
            }

            /* 选中时的外圈样式 */
            &.checked .custom-radio {
                background-color: var(--bg-3-color);
                /* 选中颜色 */
                border-color: var(--bg-3-color);
            }

            /* 内点的样式：中心圆 */
            &.checked .custom-radio:after {
                display: block;
                content: "";
                position: absolute;
                left: 4px;
                top: 4px;
                height: calc(100% - 8px);
                width: calc(100% - 8px);
                border-radius: 50%;
                background: var(--radio-bg-color);
                transition: all 0.2s;
            }
        }
    }

    .tips-group {
        display: flex;
        gap: 16px;
        margin-top: 32px;
    }

    .select-group {
        display: flex;
        gap: 16px;
        margin-top: 8px;

        .select-box {
            width: 88px;
            height: 32px;
        }
    }

  
}
</style>