import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App";
import router from "./router/router.js";
import store from "./store/store.js";

/*
 *  Lodash library
 */
/*
 *  Components with name BaseName.vue are registered globally
 */
const requireComponent = require.context(
   "./components/base_components", // Path
   false, // Don't search in subdirectories
   /Base[A-Z]\w+\.(vue|js)$/ // Regex for the search
);

requireComponent.keys().forEach(fileName => {
   const componentConfig = requireComponent(fileName);
   const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")) // Pascal Case conversion
   );

   Vue.component(componentName, componentConfig.default || componentConfig); // Components registered globally
});

/*
 *  Icons in the folder /assets/icons are registered globally
 */
const requireIcons = require.context(
   "./assets/icons", // Path
   false, // Don't search in subdirectories
   /[A-Z]\w+\.(vue|js)$/ // Regex for the search
);

requireIcons.keys().forEach(fileName => {
   const componentConfig = requireIcons(fileName);
   const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")) // Pascal Case conversion
   );

   Vue.component(componentName, componentConfig.default || componentConfig); // Components registered globally
});

if (!process.env.IS_WEB) {
   Vue.use(require("vue-electron"));
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
   components: {App},
   router,
   store,
   template: "<App/>",
}).$mount("#app");
