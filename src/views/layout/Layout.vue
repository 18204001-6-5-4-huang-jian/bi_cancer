<template>
	<div class="app-wrapper">
    <div class="nav-wrapper">
      <nav-bar :loginName="loginName" :deptName="deptName" @deptNum="deptNum"></nav-bar>
    </div>
    <div class="breadBox" v-if="$route.path!='/index'">
      	<!-- 切换角色，面包屑 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
				<!-- <el-breadcrumb-item :to="{ path: '/' }">指挥舱</el-breadcrumb-item> -->
				<el-breadcrumb-item separator = '/' v-for = "(item,index) in breadlist" :key = 'index' :to="item.path?{path: item.path,query:item.query}:''">
					{{item.name}}
				</el-breadcrumb-item>
			</el-breadcrumb>
    </div>
			<app-main></app-main>
	</div>
</template>

<script>
import { NavBar, AppMain } from "@/views/layout";
import URL from "@/plugin/serviceAPI.config.js";
export default {
  name: "layout",
  components: {
    NavBar,
    AppMain
  },
  data() {
    return {
      breadlist: [],
      totalData: [{}], //左侧菜单
      loginName: null,
      deptName: null
    };
  },
  mounted() {
    if (window.location.href.indexOf("/progress")) {
      this.breadlist = [{ name: "项目进度", path: "/progress", query: {} }];
    } else if (window.location.href.indexOf("/result")) {
      this.breadlist = [{ name: "项目绩效", path: "/result", query: {} }];
    } else if (window.location.href.indexOf("/risk")) {
      this.breadlist = [{ name: "流行特征分布", path: "/risk", query: {} }];
    }
    // 刷新页面获取面包屑
    this.breadlist = JSON.parse(localStorage.getItem("breadcrumb"));
  },
  watch: {
    $route() {
      if (this.$route.meta.routeList) {
        this.breadlist = this.$route.meta.routeList;
      }
    }
  },
  methods: {
    deptNum(val) {
      if (val) {
        this.getMenu();
      }
    },
    getMenu() {
      this.$axios_http({
        url: URL.menu,
        data: {},
        vueObj: this
      }).then(res => {
        if (res.data.success) {
          this.loginName = res.data.result.user.loginName;
          this.deptName = res.data.result.user.deptRoleRelationDto.deptName;
          localStorage.setItem(
            "allAuthResource",
            JSON.stringify(res.data.result.resourceAttr.menu.child)
          );
          sessionStorage.setItem("loginName", res.data.result.user.loginName),
            sessionStorage.setItem("token", res.data.result.user.token),
            sessionStorage.setItem("trueName", res.data.result.user.trueName),
            this.$store.commit(
              "common/menuList",
              res.data.result.resourceAttr.menu.child
            );
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  .logo {
    // background: #2653A6;
    background: rgb(48, 65, 86);
    height: 64px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .img-change {
      width: 40px;
      height: 16px;
    }
  }
  .nav-wrapper {
    width: 100%;
    z-index: 2;
    overflow: hidden;
    transition: all 0.28s ease-out;
  }
}
.breadBox{
  width: 100%;
  background: #2b2a57;
  margin-top: 64px;
  height: 39px;
  line-height: 39px;
  box-sizing: border-box;
  border-top: 1px solid #405165;
  overflow: hidden;
}
.breadcrumb {
  width: 1200px;
  margin:0 auto;
  padding-left: 276px;
  box-sizing: border-box;
  height: 39px;
  line-height: 39px;
}
</style>
<style>
.breadcrumb .el-breadcrumb__inner.is-link {
  color: #ffffff !important;
  font-weight: normal;
}
.breadcrumb span {
  color: #ffffff !important;
}
.breadcrumb .el-breadcrumb__separator {
  color: #ffffff !important;
}
</style>

