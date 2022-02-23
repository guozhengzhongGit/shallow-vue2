import Vue from "./instance/index.js";
import { initGlobalAPI } from './global-api/index';

initGlobalAPI(Vue); // 给 Vue 本身扩展静态方法
Vue.version = '2.0.0'

export default Vue;
