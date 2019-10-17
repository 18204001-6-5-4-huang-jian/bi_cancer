<template>
  <el-table 
      :data="tableData"
      border
      style="width:100%">
      <el-table-column
      type="index"
      label="序号"
      width="60">
      </el-table-column>
      <el-table-column
      prop="loginName"
      label="账号名称"
      >
      </el-table-column>
      <el-table-column
      prop="trueName"
      label="真实姓名"
      width="80"
      >
      </el-table-column>
      <el-table-column
      prop="phone"
      label="联系电话">
      </el-table-column>
      <!-- <el-table-column
      prop="phone"
      label="所属项目">
      </el-table-column> -->
      <el-table-column
      prop="deptName"
      label="所属机构">
      </el-table-column>
      <el-table-column
      prop="roleName"
      label="账号角色">
      </el-table-column>
      <el-table-column
          label="操作"
          fixed="right"
      >
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="resetPassword(scope.row)">重置密码</el-button>
          </template>
      </el-table-column>
  </el-table>
</template>
<script>
import URL from "@/plugin/serviceAPI.config.js"
  export default {
    props:["tableData"],
    data () {
      return {
     
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
      // 重置密码
      resetPassword(row){
        this.$axios_http({
          url: URL.resetPassword,
          data: {
                "id":row.userId,
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.success){
            this.$message({
                type:'success',
                message:'重置密码成功，重置密码为000000',
              })
          }
        })
      },
      // 查看跳转
      see(row){
        if(this.$route.path.indexOf('/user/index')>-1){
          this.$router.push({path:'/user/adduser',query:{deptId:row.deptId,id:row.userId,flag:'0'}})
        }else{
          this.$router.push({path:'/usergj/adduser',query:{deptId:row.deptId,id:row.userId,flag:'0'}})
        }
      },
      //编辑跳转
      edit(row){
        if(this.$route.path.indexOf('/user/index')>-1){
          this.$router.push({path:'/user/adduser',query:{deptId:row.deptId,id:row.userId,flag:'1'}})
        }else{
          this.$router.push({path:'/usergj/adduser',query:{deptId:row.deptId,id:row.userId,flag:'1'}})
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns button{
    margin-bottom: 15px;
}
</style>
<style lang="scss">
  .el-table--medium td{
  padding: 5px 0;
}
</style>

