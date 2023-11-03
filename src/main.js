import { createApp } from "vue";
import App from "./App.vue";

import "./style.scss";

import { db } from "./firebase";
import { createPinia } from "pinia";

console.log(db);

createApp(App).use(createPinia()).mount("#app");
