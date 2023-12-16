<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
        ref="ulTarget"
        class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!--滑块-->
      <li ref="sliderTarget"
          :style="sliderStyle"
          class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"></li>
      <!--汉堡按钮-->
      <li class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!--items-->
      <li
          v-for="(item, index) in data"
          :key="item.id"
          class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
          :class="{
            'text-zinc-100': currentCategoryIndex === index
          }"
          :ref="setItemRef"
          @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// vite 构建的项目中，我们可以直接使用defineProps方法
import {onBeforeUpdate, ref, watch} from "vue";
import { useScroll } from "@vueuse/core";

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 选中的item的下标
const currentCategoryIndex = ref(0)
// 获取所有的item元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后，dom变化之前
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取ul元素
const ulTarget = ref(null)
// 通过 vueuse -> useScroll 获取响应式的 scroll 滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)

// watch监听
watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
})

// item点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>

<style lang="scss">
/* 隐藏滚动条 */
ul::-webkit-scrollbar {
  display: none;
}
</style>