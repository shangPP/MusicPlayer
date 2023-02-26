import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "@/assets/font/iconfont.css";
import "normalize.css";
import "@/assets/common.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
