<template>
  <div class="cancer-search fl">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'cancer-search',
    props: {
      isBorder: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style scoped>
  .cancer-search {
    width: 188px;
    background: #fff;
    /* height: 800px; */
    box-shadow: 3px 2px 4px 0 rgba(206,211,215,0.50);
  }
</style>