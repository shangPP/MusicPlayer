<template>
  <div class="main">
    <div class="title">默认列表</div>
    <ul class="btns">
      <li @click="handleMuch()" :class="currbtn == '批量操作' ? 'active' : ''">
        <div class="iconfont icon-piliangcaozuo"></div>
        <span>批量操作</span>
      </li>
      <li @click="addMusicFile()" v-show="!isShowCheckBox">
        <div class="iconfont icon-SanMiAppoutlinei1"></div>
        <span>添加</span>
      </li>
      <li @click="delMuchMusic()" v-show="isShowCheckBox">
        <div class="iconfont icon-SanMiAppoutlinei1"></div>
        <span>删除</span>
      </li>
    </ul>
    <div class="music-list">
      <div class="list-head">
        <div class="music-choose" v-show="isShowCheckBox">
          <el-checkbox
            v-model="isCheckBoxAll"
            @change="toggleCheckBoxAll"
            label=""
          />
        </div>
        <div class="music-name">歌曲名</div>
        <div class="music-singer">歌手</div>
        <div class="music-from">专辑</div>
        <div class="music-time">时长</div>
      </div>
      <div class="list-body">
        <!-- 本地歌曲 -->
        <template v-if="keywords == ''">
          <div
            class="list-body-item"
            v-for="(item, i) of musicFilesPath"
            :key="item.id"
            @mouseenter="handleEnter(item)"
            @mouseleave="handleLeave(item)"
            :class="{ activeMusic: item.id === currentMusic.id }"
          >
            <div class="music-choose" v-show="isShowCheckBox">
              <el-checkbox
                v-model="item.isCheckBox"
                @change="toggleChoose(item)"
                label=""
              />
            </div>
            <div class="music-name">
              <div class="name-text" :title="item.name">
                {{ item.name }}
              </div>
              <div
                class="music-btns"
                v-show="isShowMusicBtns && item.id === currentId"
              >
                <div
                  class="iconfont icon-play"
                  title="播放"
                  @click="handlePlay(item)"
                ></div>
                <div
                  class="iconfont icon-delete"
                  title="删除"
                  @click="handleDelete(item)"
                ></div>
              </div>
            </div>
            <div class="music-singer" :title="item.singer">
              {{ item.singer }}
            </div>
            <div class="music-from">专辑名</div>
            <div class="music-time">{{ convertDuration(item.time) }}</div>
          </div>
        </template>
        <!-- 搜索歌曲 -->
        <template v-else>
          <div
            class="list-body-item"
            v-for="(item, i) of searchLists"
            :key="item.id"
            @mouseenter="handleEnter(item)"
            @mouseleave="handleLeave(item)"
            :class="{ activeMusic: item.id === currentMusic.id }"
          >
            <div class="music-choose" v-show="isShowCheckBox">
              <el-checkbox
                v-model="item.isCheckBox"
                @change="toggleChoose(item)"
                label=""
              />
            </div>
            <div class="music-name">
              <div class="name-text" :title="item.name">
                {{ item.name }}
              </div>
              <div
                class="music-btns"
                v-show="isShowMusicBtns && item.id === currentId"
              >
                <div
                  class="iconfont icon-play"
                  title="播放"
                  @click="handlePlay(item)"
                ></div>
                <div
                  class="iconfont icon-delete"
                  title="添加"
                  @click="handleAdd(item)"
                ></div>
              </div>
            </div>
            <div class="music-singer" :title="item.singer">
              {{ item.singer }}
            </div>
            <div class="music-from">专辑名</div>
            <div class="music-time">{{ convertDuration(item.time) }}</div>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="searchMusicTotal"
              @current-change="handleCurrentChange"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw, watch, computed } from "vue";
import bus from "@/utils/eventBus.js";
import { convertDuration } from "@/utils/helper.js";
import { useMusicStore } from "@/stores/index.js";
const store = useMusicStore();

let musicFilesPath = ref([]);
onMounted(async () => {
  musicFilesPath.value = await myApi.getMusic();
});
// 添加音乐获取到音乐文件并渲染出来
const addMusicFile = async () => {
  musicFilesPath.value = await myApi.addMusic();
};

let currentId = ref("");
let currentMusic = reactive(store.getCurrentMusic);
let isShowMusicBtns = ref(true);
// 鼠标移入
const handleEnter = (item) => {
  currentId.value = item.id;
};
// 鼠标移出
const handleLeave = (item) => {
  currentId.value = "";
};

// 音乐播放
const handlePlay = async (item) => {
  if (keywords.value == "") {
    currentMusic = item;
    currentId.value = item.id;
    await store.setCurrMusic(item);
    store.setTogglePlay(true);
    store.toggleMusic();
  } else {
    const res = await myApi.playSearchMusic(toRaw(item));
    const result = JSON.parse(res.slice(res.indexOf("{"), -2));
    console.log(result);
    if (result.status == 1) {
      const data = result.data;
      const music = {
        fileName: `${data.song_name} - ${data.author_name}`,
        id: data.hash,
        lyrics: data.lyrics,
        music_from: data.album_name,
        music_img: data.img,
        name: data.song_name,
        path: data.play_url,
        singer: data.author_name,
        time: data.timelength / 1000,
        timelength: data.timelength / 1000,
        type: data.play_url.slice(-3),
      };
      store.setCurrMusic(music);
      store.setTogglePlay(true);
      store.toggleMusic();
      currentMusic = item;
      currentId.value = item.id;
    }
  }
};
// 音乐删除
const handleDelete = async (item) => {
  musicFilesPath.value = await myApi.delMusic(toRaw(item).id);
};
// 音乐添加--添加到歌单
const handleAdd = () => {};

// 是否展示checkbox
const isShowCheckBox = ref(false);
// 是否勾选全部
const isCheckBoxAll = ref(false);
// 当前按钮
const currbtn = ref("");
// 存放要删除的数据
const delMusicArr = ref([]);
// 批量操作点击
const handleMuch = () => {
  isShowCheckBox.value = !isShowCheckBox.value;
  currbtn.value = currbtn.value == "" ? "批量操作" : "";
  delMusicArr.value = [];
  musicFilesPath.value.forEach((item) => {
    item.isCheckBox = false;
  });
};
// 批量操作--删除
const delMuchMusic = () => {
  delMusicArr.value.forEach((item) => {
    handleDelete(item);
  });
};
// 点击切换checkbox状态
const toggleChoose = (val) => {
  if (val.isCheckBox) {
    delMusicArr.value.push(val);
  } else {
    const index = delMusicArr.value.indexOf(val);
    delMusicArr.value.splice(index, 1);
  }
};
// 点击切换表头全部checkbox状态
const toggleCheckBoxAll = (val) => {
  musicFilesPath.value.forEach((item) => {
    item.isCheckBox = val;
  });
  if (val) {
    delMusicArr.value = [...musicFilesPath.value];
  } else {
    delMusicArr.value = [];
  }
};

// 计算是否全部勾选
watch(
  () => delMusicArr.value.length,
  (val) => {
    isCheckBoxAll.value = val == musicFilesPath.value.length;
  }
);

// 监听当前播放音乐
watch(
  () => store.getCurrentMusic,
  (val) => {
    currentMusic = val;
    currentId.value = val.id;
  },
  { deep: true }
);

// 搜索关键词
const keywords = ref(store.getSearchWords);
// 搜索歌曲列表
const searchLists = ref([]);
// 搜索歌曲总数
const searchMusicTotal = ref(0);
bus.on("searchMusicLists", (res) => {
  // console.log(res);
  searchMusicTotal.value = res.total;
  keywords.value = store.getSearchWords;
  searchLists.value = res.lists.map((item) => {
    return {
      FileHash: item.FileHash,
      AlbumID: item.AlbumID,
      name: item.SongName,
      singer: item.SingerName,
      music_from: item.AlbumName,
      time: item.Duration,
    };
  });
});
const handleCurrentChange = async (val) => {
  const res = await myApi.searchMusic(keywords.value, val);
  if (res.status == 1) {
    searchMusicTotal.value = res.data.total;
    keywords.value = store.getSearchWords;
    searchLists.value = res.data.lists.map((item) => {
      return {
        FileHash: item.FileHash,
        AlbumID: item.AlbumID,
        name: item.SongName,
        singer: item.SingerName,
        music_from: item.AlbumName,
        time: item.Duration,
      };
    });
  }
};
</script>

<style lang="less" scoped>
@import url(@/assets/gundongtiao.less);
.main {
  width: calc(100% - 200px);
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  -webkit-app-region: no-drag;
}
.title {
  font-size: 26px;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
}
.btns {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 0;
  li {
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 0 8px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #999;
    color: #fff;
    cursor: pointer;
    > div {
      width: 18px;
      height: 18px;
      font-size: 16px;
      margin-right: 3px;
    }
    > span {
      font-size: 12px !important;
    }
    &:hover,
    &.active {
      background-color: #27c448;
    }
  }
}
.music-list {
  height: calc(100% - 60px - 40px);
  // background-color: rgb(197, 52, 52);
  padding: 5px 10px;

  .music-item() {
    display: flex;
    .music-choose {
      width: 40px;
    }
    .music-name {
      // flex: 3;
      width: calc(50% - 40px);
      padding-left: 5px;
      .name-text {
        float: left;
        width: calc(80% - 5px - 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .music-btns {
        float: right;
        width: 20%;
        display: flex;
        margin-right: 20px;
        > div {
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
    .music-singer {
      // flex: 2;
      width: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .music-from {
      // flex: 2;
      width: 20%;
    }
    .music-time {
      // flex: 1;
      width: 10%;
    }
  }
  .list-head {
    height: 40px;
    line-height: 40px;
    .music-item();
  }
  .list-body {
    height: calc(100% - 40px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    .gundongtiao;
    .list-body-item {
      height: 30px;
      line-height: 30px;
      .music-item();
      &.activeMusic,
      &:hover {
        background-color: #e3e3e3;
      }
    }
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
