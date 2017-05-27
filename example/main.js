import 'prismjs/prism'
import 'prismjs/themes/prism.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMarkdown from 'vue-markdown'
import vmc from '../src/index'
import App from './App.vue'
import pages from './config.json'

Vue.use(VueRouter)
Vue.use(vmc, {})
Vue.component('vue-markdown', VueMarkdown)
Vue.component('layout', require('./components/layout.vue'))

const route = [{
  name: 'index',
  path: '/',
  component: require('./pages/index.vue'),
  meta: {
    title: 'vue mobile components'
  }
}, {
  name: 'doc',
  path: '/doc/:type',
  component: require('./pages/doc.vue'),
  meta: {
    title: '文档'
  }
}]

pages.forEach((page) => {
  if (page.type !== 'doc') {
    route.push({
      name: page.name,
      path: page.path,
      component: require(`./pages${page.path}.vue`),
      meta: {
        title: page.title
      }
    })
  }
})

route.push({
  path: '*',
  redirect: '/'
})

const router = new VueRouter({
  routes: route
})

router.beforeEach((route, redirect, next) => {
  document.title = route.meta.title
  next()
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
