<template>
  <div class="window-btns">
    <div
      class="iconfont icon-window-min-full"
      title="最小化"
      :style="{ color: type == 'min' ? '#36c64b' : '#000' }"
      @click="windowHandle('min')"
      @mouseenter="handleEnter('min')"
      @mouseleave="handleLeave('min')"
    ></div>
    <div
      class="iconfont icon-window-normal-full"
      title="最大化"
      :style="{ color: type == 'max' ? '#fcba40' : '#000' }"
      @click="windowHandle('max')"
      @mouseenter="handleEnter('max')"
      @mouseleave="handleLeave('max')"
    ></div>
    <div
      class="iconfont icon-window-close-full"
      title="关闭"
      :style="{ color: type == 'close' ? '#fb605b' : '#000' }"
      @click="windowHandle('close')"
      @mouseenter="handleEnter('close')"
      @mouseleave="handleLeave('close')"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 最小化、最大化、关闭
const windowHandle = (type) => {
  if (type === "min") {
    myApi.minWindow();
  } else if (type === "max") {
    myApi.maxWindow();
  } else if (type === "close") {
    myApi.closeWindow();
  }
};

// 鼠标移入移出更改颜色
let type = ref("");
const handleEnter = (e) => {
  type.value = e;
};
const handleLeave = () => {
  type.value = "";
};
</script>

<style lang="less" scoped>
.window-btns {
  // width: 100px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  padding-top: 10px;
  position: absolute;
  right: 0;
  top: 0;
  // border: 1px solid #f00;

  -webkit-app-region: no-drag;
  > div {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
