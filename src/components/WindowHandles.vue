<template>
  <div class="window-btns">
    <div
      class="iconfont icon-window-min-full"
      title="最小化"
      @click="windowHandle('min')"
    ></div>
    <div
      class="iconfont icon-window-normal-full"
      title="最大化"
      @click="windowHandle('max')"
    ></div>
    <div
      class="iconfont icon-window-close-full"
      title="关闭"
      @click="windowHandle('close')"
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
</script>

<style lang="less" scoped>
.window-btns {
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  padding-top: 10px;
  position: absolute;
  right: 0;
  top: 0;

  -webkit-app-region: no-drag;
  > div {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
