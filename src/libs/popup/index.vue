<template>
  <div>
    <teleport to="body">
      <!--蒙板-->
      <transition name="fade">
        <div
            v-if="isVisable"
            @click="isVisable = false"
            class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"></div>
      </transition>
      <!--body-->
      <transition name="popup-down-up">
        <div
            v-if="isVisable"
            v-bind="$attrs" class="w-screen bg-white z-50 fixed bottom-0">
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from "@vueuse/core";
import {watch} from "vue";

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

defineEmits([
    'update:modelValue'
])

// useVModel 将props 变成一个响应式数据，当 isVisable 的值发生改变的时候，会自动触发emit 修改modelValue
const isVisable = useVModel(props)

// 锁定滚动
const isLocked = useScrollLock(document.body)

watch(
    isVisable,
    (val) => {
      isLocked.value = val
    },{
      immediate: true
    }
)
</script>

<style lang="scss" scoped>
// fade 动画
.fade-enter-active ,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.fade-enter-from ,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active ,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.popup-down-up-enter-from ,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>