<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="" />
    </div>

    <div class="container">
      <div class="searchBar">
        <div class="iconfont icon-SanMiAppoutlinei"></div>
        <input type="text" />
      </div>
    </div>
    <WindowHandles />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WindowHandles from "../components/WindowHandles.vue";
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
}

.logo {
  height: 100%;
  width: 200px;
  // border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 80%;
  }
}

.container {
  flex: 1;
  // background-color: rgb(25, 193, 78);
  display: flex;
  justify-content: center;
  align-items: center;

  .searchBar {
    width: 280px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;
    .icon-SanMiAppoutlinei {
      width: 30px;
      height: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 2px;
      font-size: 26px;
    }
    input {
      height: 100%;
      width: 100%;
      border-radius: 20px;
      outline: none;
      border: 1px solid #000;
      padding-left: 40px;
      // background-color: pink;
    }
  }
}
</style>
