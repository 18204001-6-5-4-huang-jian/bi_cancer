<template>
    <div>
      <cancer-user-widget>
         <div class="btns clearfix">
            <el-button type="primary" size="small" class="fr" @click="goto">添加用户</el-button>
         </div>
        <commonTable :tableData="tableData"></commonTable>
        <br>
        <el-pagination
            @size-change="pageSizeChange"
            @current-change="currentPageChange"
            :current-page="queryResult.pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="queryResult.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryResult.totalPageCount">
        </el-pagination>
         <br>
     </cancer-user-widget>
    </div>
</template>
<script>
import commonTable from '@/views/users/CommonTable'
import mixin from '@/mixins/mixins'
import URL from "@/plugin/serviceAPI.config.js"
  export default {
    mixins: [ mixin ],
    data () {
      return {
        tableData:[],
        //查询条件
        qc: {
          "searchDeptId": null,
          "searchRoleId": null,
          "searchFlag": null,
          "searchLoginName": null,
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
      }
    },
    components:{
      commonTable
    },
    created(){

    },
    mounted(){
      this.query();
    },
    methods: {
      query(pageNum,pageSize){
         this.$axios_http({
          url: URL.findUsersByCurrentDeptId,
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "searchDeptId":this.qc.searchDeptId,
                "searchRoleId":this.qc.searchRoleId,    
                "searchFlag":this.qc.searchFlag,
                "searchLoginName":this.qc.searchLoginName,
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.success){
            this.tableData=res.data.result.list;
            this.queryResult.totalPageCount=res.data.result.total;
          }
        })
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.queryResult.pageSize=pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.queryResult.pageNo=currentPage;
        this.query();
      },
      goto(){
        this.$router.push('/user/adduser');
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns button{
    // margin-bottom: 15px;
    margin-bottom: 25px;
}
</style>

