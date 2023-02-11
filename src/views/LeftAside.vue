<template>
  <div class="aside">
    <div class="list">
      <div class="list-title">
        <div class="iconfont icon-bofangduilie"></div>
        <span>我的音乐</span>
      </div>
      <ul>
        <li class="currLi">默认列表</li>
        <li>默认列表</li>
      </ul>
    </div>
    <div class="setting">
      <div class="iconfont icon-shezhi"></div>
      <span>设置</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="less" scoped>
.aside {
  width: 200px;
  height: 100%;
  background-color: #fff;
  padding-top: 0px;
  // border-right: 2px solid #eee;
  box-shadow: 2px 0px 2px #eee;
  z-index: 9;

  -webkit-app-region: no-drag;
  .list {
    height: 90%;
    background-color: #fff;
    .list-title {
      height: 40px;
      line-height: 40px;
      font-size: 22px;
      font-weight: bold;
      display: flex;
      padding-left: 30px;
      .iconfont {
        width: 24px;
        display: flex;
        justify-content: center;
        align-self: center;
        font-size: 22px;
      }
    }
    ul {
      height: calc(100% - 40px);
      list-style: none;
      // background-color: rgb(213, 36, 233);
      margin-top: 0;
      li {
        padding-left: 10px;
        height: 30px;
        width: 120px;
        line-height: 30px;
        // border: 1px solid #f00;
        margin-bottom: 5px;
        color: #000;
        cursor: pointer;
        &.currLi {
          background-color: #e3e3e3;
          border-radius: 10px;
        }
      }
    }
  }
  .setting {
    height: 10%;
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    padding-left: 30px;
    cursor: pointer;
    .iconfont {
      width: 24px;
      display: flex;
      justify-content: center;
      align-self: center;
      font-size: 22px;
    }
  }
}
</style>
