<template>
  <div id="app" :class="{blue:active}">
    <lay-out></lay-out>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import LayOut from '@/views/layout/Layout'
export default {
  name: 'App',
  data() {
    return {
      active: false
    }
  },
   components: {
			LayOut
    },
    watch: {
      $route(to,from){
        if(to.path === '/' || to.path === '/index' ) {
          document.body.style.background='#23224f'
          this.active = true
        } else {
          document.body.style.background='#eaeef1'
          this.active = false
        }
      }
    }
}
</script>

<style lang="scss">
 @import './assets/css/reset.scss';
 .blue{
  background: #23224f;
 }
</style>
