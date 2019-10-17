<template>
<div>
  <div id="nav" :class="{homeNav:isHome}">
      <div class="con clearfix">
        	<div class="logo fl">
			    	  <img src="../../assets/img/logo.png" alt="logo">
				  </div>
          <ul class="nav fl">
            <router-link :to="{path:'/index'}" tag="li">指挥舱</router-link>
            <router-link :to="{path:'/progress'}" tag="li">项目进度</router-link>
            <router-link :to="{path:'/result'}" tag="li">项目绩效</router-link>
            <router-link :to="{path:'/risk'}" tag="li">流行特征分布</router-link>
            <li>帮助</li>
            <!-- <router-link :to="{path:'/'}" tag="li">帮助</router-link> -->
          </ul>
        <div class="fr top">
          <router-link :to="{path:'/user/index'}">
            <span class="el-icon-menu" title="用户管理"></span>
          </router-link>
          <span class="inline-span"></span>

          <span class="avatar-wrapper" v-if="!deptNameChange">
            尊敬的{{deptName}} - {{loginName}}，您好
          </span>
          <span class="avatar-wrapper" v-if="deptNameChange">
            尊敬的{{deptNameChange | deptNameChangeFilter}} - {{loginName}}，您好
          </span>
          <span class="inline-span" v-if="deptNum>1"></span>
          <el-dropdown @command="handleCommand" v-if="deptNum>1">
            <span class="el-icon-setting"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="role">切换角色</el-dropdown-item>
              <!-- <el-dropdown-item :disabled="true">切换项目</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
           <span class="inline-span"></span>
          <span class='login-out' @click="logout"><i></i>&nbsp;退出</span>
        </div>
      </div>
  </div>
  <!-- 选择角色弹窗 -->
    <check-project :dialogVisible="dialogVisible" @closeDialog="closeDialog" v-on:checkNum="checkNum"></check-project>
</div>
  
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import { deptNameChangeFilter } from "@/filters/filter"
import CheckProject from "@/components/SelectProject.vue"
import axios from 'axios'
  export default {
    props: {
      imgShow: {
        type: Boolean,
        default: false
      },
      deptName: {
        type: String,
        default: null
      },
      loginName: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dialogVisible:false,
        deptNum:null,         //角色数量
        activeIndex:'1',
        isHome:false,    //是否为首页
      }
    },
    components:{
      CheckProject,
    },
    computed: {
      ...mapState('common', ['deptNameChange']),
    },
    watch: {
      $route(to,from){
        if(to.path === '/') {
          this.isHome = true
        } else {
          this.isHome = false
        }
      }
    },
    methods: {
      handleCommand(command) {
        if(command=='role'){
          this.dialogVisible=true;
        }
      },
      checkNum(val){
        this.deptNum=val;
        this.$emit('deptNum',val)
      },
        //   关闭树弹窗
      closeDialog(val){
        this.dialogVisible=val;
      },
      // 退出二次确认
      logout() {
        this.$confirm('您确认要退出登录吗？', '退出登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method:'POST',
            url:SERVER_NAME_BIGPLATFORM+"/auth/loginout",
            data:{},
            withCredentials:true,
          }).then( res => {
            if(res.data.status === 'SUCCESS'){
              window.location.href=BIGPLATFORM_URL
              window.localStorage.clear();
              window.sessionStorage.clear();
              this.$store.commit('common/menuList',[]);
            }
          }).catch( res => {
          })
        }).catch(function(err){
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#nav.homeNav{
  box-shadow: 0 2px 4px 0 rgba(1,178,231,0.13);
  padding-left:14%;
  padding-right: 14%; 
  .con{
    width:100%;
    min-width: 1200px;
  }
}
  #nav {
    width:100%;
    padding-left: 5%;
    padding-right: 5%;
    height:64px;
    overflow-y: hidden;
    background: #2b2a57;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 33;
    overflow-x: hidden;
      .line{
        display:inline-block;
        width: 1px;
        height:20px;
        float: left;
        background: #E9EDF0;
        margin-top: 25.5px;
        margin-right: 8px;
      }
     .logo{
      display: inline-block;
      width: 257px;
      height: 26px;
      margin-top:22px;
      img{
        width: 215px;
      }
    }
    .top{
      line-height: 64px;
      color: #fff;
      font-size: 14px;
    }
    .login-out{
      cursor: pointer;
      i{
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url('../../assets/img/quit.png') no-repeat;
        background-size: 14px 14px;
        vertical-align: middle;
      }
      &:hover{
        color: #317ef7;
        i{
           background: url('../../assets/img/quit_active.png') no-repeat;
           background-size: 14px 14px;
        }
      }
    }
  }
  .con{
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
.logoSub{
  position: absolute;
  width: 275px;
  top: 17px;
  left: 40px;
  height:32px;
}
.help{
  margin-right:12px;
  overflow: hidden;
  vertical-align: middle;
  span{
    display: inline-block;
    float:left;
    width: 18px;
    height: 18px;
    margin-top: 23px;
    background: url('../../assets/img/help.png') no-repeat;
    background-size: 18px 18px;
    cursor: pointer;
  }
}
.el-dropdown{
  font-size: 18px;
  vertical-align: middle;
}
.inline-span{
  display: inline-block;
  width: 1px;
  height: 14px;
  vertical-align: middle;
  background: #e4e4e4;
  margin:0 5px;
}
.nav{
  position: absolute;
  left: 50%;
  left: 258px;
  width: 40%;
  height:64px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  li{
    float: left;
    height: 64px;
    line-height: 64px;
    color:#fff;
    cursor: pointer;
  }
  li:last-child{
    cursor: default;
  }
  .router-link-active{
    color: #338BF7;
  }
}
.el-icon-setting{
  color:#fff;
}
</style>


