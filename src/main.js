import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import lang from "@/helper/lang";
import rules from "@/helper/rules";
import urls from "@/helper/urls";
import keys from "@/helper/keys";

import globalMixin from "@/helper/mixins/global-mixin";
import NavigatorText from "@/components/global_components/NavigatorText.vue";


loadFonts();

const app = createApp(App);
app.mixin(globalMixin);
app.config.globalProperties.$lang = lang;
app.config.globalProperties.$rules = rules;
app.config.globalProperties.$urls = urls;
app.config.globalProperties.$keys = keys;
app.use(router);
app.use(store);
app.use(vuetify);
app.component('navigator-text', NavigatorText)
app.mount("#app");
