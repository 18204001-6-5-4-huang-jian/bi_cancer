<template>
  <div class="cancer-user-wrap" :class="{'cancer-margin--b15': isBorder}">
    <div class="cancer-user-wrap-box">
      <P class="cancer-user-wrap__title" :class="{'cancer-margin--b15': isBorder}">
        <slot name="title"></slot>
      </P>
      <p class="cancer-user-wrap__pre-button">
        <slot name="pre-button"></slot>
      </p>
      <div class="cancer-user-wrap__button">
        <slot name="sub-button"></slot>
      </div>
      <div class="cancer-user-wrap__content cancer-margin--t15">
        <slot></slot>
      </div>
      <p class="cancer-user-wrap__button">
        <slot name="bottom-button"></slot>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cancer-user-widget',
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
<style scoped lang="scss">
  .cancer-user-wrap {
    background: #fff;
    box-sizing: border-box;
    padding: 15px 20px 10px;
    margin: 20px;
  }
  .cancer-user-wrap__title {
    font-size: 16px;
    color: #606266;
  }
  .cancer-user-wrap__button {
    display: flex;
    justify-content: flex-end;
    .el-button--small {
      position: relative;
      z-index: 9;
    }
  }
  .cancer-user-wrap__pre-button {
    display: flex;
    justify-content: space-between;
  }
</style>