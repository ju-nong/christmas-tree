import { createApp } from "vue";
import App from "./App.vue";

import "./style.scss";

import { db } from "./firebase";
import { createPinia } from "pinia";

import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

console.log(db);

createApp(App).use(createPinia()).mount("#app");
