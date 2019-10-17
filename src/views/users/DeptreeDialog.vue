<template>
  <el-dialog
    title="选择部门"
    :visible.sync="deptreeDialogVisable"
    width="30%"
    :before-close="closeDialog">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import URL from "@/plugin/serviceAPI.config.js"
  export default {
    props:['deptreeDialogVisable','index'],
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'child',
          label: 'deptName'
        },
        rowData:null,
      };
    },
    created(){
      this.getDeptree();
    },
    methods: {
        // 查找所属机构树
      getDeptree(){
        this.$axios_http({
          url: URL.deptree,
          data: {},
          vueObj: this
          }).then((res)=> {
            if(res.data.success){
              this.data.push(res.data.result)
            }
          })
      },
      // 点击树，获取值
      handleNodeClick(data) {
        this.rowData=null;
        this.rowData=data;
        this.rowData.index=this.index;
      },
      // 点击确定传值
      submit(){
        this.$emit('rowData',this.rowData);
        this.$emit('closeDialog',false);
      },
      closeDialog(){
        this.$emit('closeDialog',false);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

