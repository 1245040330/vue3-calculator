<template>
    <div class="diff-dates">
        <div class="tips-box">{{ $t('dateCalculation.from') }}</div>
        <input v-model="from" type="text">
        <div class="tips-box">{{ $t('dateCalculation.to') }}</div>
        <input v-model="to" type="text">

        <div class="tips-box">{{ $t('dateCalculation.difference') }}</div>
        <div>
            <template v-if="diffObject.years > 0">{{ diffObject.years }} {{ $t('dateCalculation.year') }}; </template>
            <template v-if="diffObject.months > 0">{{ diffObject.months }} {{ $t('dateCalculation.month') }}; </template>
            <template v-if="diffObject.weeks > 0">{{ diffObject.weeks }} {{ $t('dateCalculation.week') }}; </template>
            <template v-if="diffObject.days > 0">{{ diffObject.days }} {{ $t('dateCalculation.day') }}</template>
        </div>
        <div class="tips-box">{{ diffObject.totalDays }} {{ $t('dateCalculation.day') }}</div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import dayjsDuration from 'dayjs/plugin/duration';

const from = ref('2026-01-28')
const to = ref('2026-05-01')

const diffObject = computed(() => {
    dayjs.extend(dayjsDuration);
    if (from.value && to.value) {
        let d1 = dayjs(from.value);
        let d2 = dayjs(to.value);
        const diff = dayjs.duration(d2.diff(d1));
        const totalMonths = d2.diff(d1, 'month');
        const d3 = d1.add(totalMonths, 'month'); 
        const remainingDays = d2.diff(d3, 'day'); 
        return {
            years: Math.abs(diff.years()),
            months: Math.abs(diff.months()),
            weeks: Math.floor(remainingDays / 7),
            days: remainingDays % 7,
            totalDays: Math.abs(d2.diff(d1, 'day'))
        }
    } else {
        console.log("值为空");
    }
})
</script>
<style lang="scss" scoped>
.diff-dates {
    .tips-box {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 12px;
        opacity: .70;
    }

    input {
        padding: 8px;
        border-radius: 8px;
    }
}
</style>