
<template>
 <!-- 表格 -->
      <el-dialog
        title=""
        :visible.sync="tableDialog"
        width="535px"
        :before-close="closeDialog">
        <div class="table-wrap">
          <table class="fix-table-tr" v-if="tableData.length>10">
                <tr>
                    <td>{{th1}}</td>
                    <td>{{th2}}</td>
                    <td v-if="th21">{{th21}}</td>
                </tr>
            </table>
          <div class="table">
            <div v-if="tableData.length>0">
                <table class="fix-table" v-if="tableData[0].length>10">
                  <tr>
                    <td>{{th1}}</td>
                    <td>{{th2}}</td>
                     <td v-if="th21">{{th21}}</td>
                  </tr>
              </table>
            </div>
            <div class="content-table">
                <table>
                  <tr class="tr">
                    <td>{{th1}}</td>
                    <td>{{th2}}</td>
                    <td v-if="th21">{{th21}}</td>
                  </tr>
                  <tr v-for="(item,index) in tableData" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.value}}</td>
                    <td v-if="th21">{{item.woman}}</td>
                  </tr>
                </table>
            </div>  
        </div>
        </div>
      </el-dialog>
</template>
<script>
export default {
  props: {
    tableData: {
      default: [],
      type: Array
    },
    tableDialog: {
        default: false,
        type: Boolean
    },
    th1: {
      default: null,
      type: String
    },
    th2: {
      default: null,
      type: String
    },
    th21:{
      default: null,
      type: String
    },
    params:{
      default: null,
      type: String
    }
  },
  data() {
    return {
      tableData:[],
    };
  },
  watch: {
    indexarr: function(val) {
      this.getMapData();
    },
    tableData:function(val){
      //  console.log(val)
    }
  },
  mounted() {

  },
 
  methods: {
   closeDialog() {
        this.$emit('closeDialog', false)
    },
  }
};
</script>
<style scoped>
.table {
  margin: 0 auto;
  max-height: 500px;
  overflow-y: auto;
  position: relative;
}
table {
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  width: 470px;
}
td {
  border: 1px solid #ebeef5;
  padding: 0 10px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  width: 235px;
  color: #282D32;
  text-align: center;
}
.fix-table {
  background: #338BF7;
  width: 470px;
  position: absolute;
  top: 0px;
  left: 0;
  box-shadow: 0 0px 2px #f0f0f0;
}
.fix-table td{
   color: #fff;
}
/* add */
.content-table .tr td:not(:nth-child(1)){
   background: #338BF7;
   box-shadow: 0 0px 2px #f0f0f0;
}
.content-table .tr td{
  color: #fff;
}
.table-wrap {
  position: relative;
  width: 98%;
  margin: 0 auto;
  max-height: 500px;
}
.fix-table-tr {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.fix-table-tr td {
  background: #338BF7;
  color: #fff;
}
</style>
