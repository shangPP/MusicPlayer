<template>
  <div class="app">
    <Search></Search>
    <div class="mainBody">
      <LeftAside></LeftAside>
      <MusicList></MusicList>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Search from "./Search.vue";
import LeftAside from "./LeftAside.vue";
import MusicList from "./MusicList.vue";
import Footer from "./Footer.vue";
import { ref } from "vue";
</script>

<style lang="less" scoped>
.app {
  height: 100%;
}
.mainBody {
  display: flex;
  height: calc(100% - 60px - 80px);
}
</style>
