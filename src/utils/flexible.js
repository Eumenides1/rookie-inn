import { computed } from "vue";
import { PC_DEVICE_WIDTH } from '@/constants/index'
import  { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备，我们默认宽度小于1280为移动设备
 */
export const isMobileTerminal = computed(() => {
    return width.value < PC_DEVICE_WIDTH
})