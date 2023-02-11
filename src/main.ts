import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/font/iconfont.css";
import "normalize.css";
import "@/assets/common.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
