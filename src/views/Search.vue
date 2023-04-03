<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="" />
    </div>

    <div class="container">
      <div class="searchBar">
        <el-input
          v-model="searchValue"
          class="w-50 m-2"
          placeholder="搜索"
          :prefix-icon="Search"
          clearable
          @change="searchValueChange"
        />
      </div>
    </div>
    <WindowHandles />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WindowHandles from "../components/WindowHandles.vue";
import { Search } from "@element-plus/icons-vue";

// 搜索关键词
const searchValue = ref("");
const searchValueChange = (value) => {
  console.log(value);
  console.log(searchValue.value);
};
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
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px #999999 inset;
    }
  }
}
</style>
