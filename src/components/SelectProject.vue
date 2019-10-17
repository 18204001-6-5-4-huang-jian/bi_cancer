<template>
    <el-dialog title="选择机构" :visible.sync="dialogVisible" :before-close="closeDialog" top="25vh">
        <el-select v-model="deptroleThis" placeholder="请选择选择机构">
          <el-option :value="item.deptId+','+item.roleId" :key="item.deptId+','+item.roleId" :label="item.deptRoleName" v-for="item in deptrole" ></el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="submit" size="small">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
// import {mapMutations} from 'vuex' //引入mapMutations
import URL from "@/plugin/serviceAPI.config.js"
  export default {
    props:["dialogVisible"],
    data () {
      return {
        deptroleThis:null,
        deptrole:[],
      }
    },
    mounted(){
     this.deptroleFun();
    },
    methods: {
      // ...mapMutations(['setAuthResource','add']),
      //查询角色
         deptroleFun(){
         this.$axios_http({
          url: URL.deptrole,
          data: {},
          vueObj: this
        }).then((res) => {
        if(res.data.success){
          this.deptrole=res.data.result;
          this.deptrole.filter(item=>{
            item.deptRoleName=item.deptName+' - '+item.roleName
          })
          this.$emit('checkNum',res.data.result.length);
          if(res.data.result.length==1){
            this.$emit('deptroleThisFun',this.deptrole)
          }
        }
        })
      },
      // 选择角色
      submit(){
        let deptId_roleId=this.deptroleThis;
        let _deptId=deptId_roleId.split(',')[0];
        let _roleId=deptId_roleId.split(',')[1];
        let obj;
        this.deptrole.filter(item=>{
          if(item.roleId==_roleId && item.deptId==_deptId){
            obj=item;
          }
        })
        // 存储登录人的机构
        sessionStorage.setItem('deptName',obj.deptName);  
        this.$store.commit('common/deptNameChange',obj.deptName);
         this.$axios_http({
          url: URL.resources,
          data: obj,
          vueObj: this
        }).then((res)=> {
          if(res.data.success){
            this.$emit('closeDialog',false);  
            this.$router.push('/');
             this.$store.commit('common/menuList',res.data.result.resourceAttr.menu.child);
          }
        })
      },
      hasAuth(authName){
            localStorage.setItem(authName,authName)
      },
      // 关闭弹窗
      closeDialog(){
        this.$emit('closeDialog',false);
      }
    }
  }
</script>