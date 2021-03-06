// import Vue from 'vue'
import LayerPopupGroup from './components/LayerPopupGroup.vue'
import LayerPopup from './components/LayerPopup.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
    install.installed = true;
  Vue.component('LayerPopupGroup', LayerPopupGroup);
  Vue.component('LayerPopup', LayerPopup);
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {LayerPopupGroup, LayerPopup};
