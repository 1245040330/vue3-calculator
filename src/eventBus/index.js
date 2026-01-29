import { useEventBus } from '@vueuse/core'

export const calculationResultBus = useEventBus('calculation-result-event')