<template>
  <div class="cancer-wrap fl" :class="{'cancer-margin--b15': isBorder}">
    <div class="cancer-wrap-box">
      <P class="cancer-wrap__title" :class="{'cancer-margin--b15': isBorder}">
        <slot name="title"></slot>
      </P>
      <p class="cancer-wrap__pre-button">
        <slot name="pre-button"></slot>
      </p>
      <div class="cancer-wrap__button">
        <slot name="sub-button"></slot>
      </div>
      <div class="cancer-wrap__content">
        <slot></slot>
      </div>
      <p class="cancer-wrap__button">
        <slot name="bottom-button"></slot>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cancer-widget',
    props: {
      isBorder: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {

      }
    },
  }
</script>
<style scoped lang="scss">
  .cancer-wrap {
    background: #fff;
    box-sizing: border-box;
    padding: 18px 20px 18px;
    margin: 17px 0 3px 20px;
    width: 990px;
    box-shadow: 0 2px 4px 0 rgba(206,211,215,0.50);
  }
  .cancer-wrap__title {
    font-size: 16px;
    color: #333333;
  }
  .cancer-wrap__button {
    display: flex;
    justify-content: flex-end;
    .el-button--small {
      position: relative;
      z-index: 9;
    }
  }
  .cancer-wrap__pre-button {
    display: flex;
    justify-content: space-between;
  }
</style>