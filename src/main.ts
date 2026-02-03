import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { router } from "./router";
import "./style.css";

library.add(
  Icons.faPen,
  Icons.faTrash,
  Icons.faPlay,
  Icons.faEllipsisVertical,
  Icons.faTimes,
);
createApp(App).component("Icon", FontAwesomeIcon).use(router).mount("#app");
