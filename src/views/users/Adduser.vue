<template>
    <div>
      <cancer-user-widget>
          <p class="title">基本信息</p>
        <el-form ref="formInline" :model="formData" label-width="90px" :rules="formInlinelist" class="formBlock">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="账号名称:" prop="loginName">
                       <el-input size="small" :disabled="disabledShow"  v-model.trim="formData.loginName" placeholder="请输入新增机构名称或选择" clearable ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="初始密码:">
                       <el-input size="small"  v-model="pwd" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话:" prop="phone">
                       <el-input size="small" :disabled="disabledShow" v-model.trim="formData.phone" placeholder="请输入11位手机号"  clearable ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="真实姓名:" prop="trueName">
                       <el-input size="small" :disabled="disabledShow" v-model.trim="formData.trueName" :placeholder="disabledShow?'':'请输入2-20个汉字'" clearable ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证号:"  prop="idCard">
                       <el-input size="small" :disabled="disabledShow"  v-model.trim="formData.idCard" clearable :placeholder="disabledShow?'':'请输入'" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-for="(x,index) in formData.userRoleDtoList" :key="index">
                <el-form :inline="true" :model="x" class="formAddJS" :ref="'formInlinelist'+index" :rules="formInlinelist">
                    <el-row>
                         <el-col :span="8" v-if="!jg" style="position: relative;">
                            <span v-if="x.deptName" class="red" style="font-size:12px;color:#f56c6c;position: absolute;left:0;top:13px;">*</span>
                            <el-form-item label="所属机构:"  :prop="x.deptName?'':'deptName'" ref="items" :class="{'pad':x.deptName}" label-width="90px">
                                <el-input size="small"  v-model="x.deptName" :readonly="true" :disabled="x.disabled" clearable>
                                    <template slot="append"  size="small" ><el-button @click="openDeptDialog(index)" v-if="!x.disabled" size="small">选择</el-button></template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                            <el-form-item label="账户角色:"  prop="roleId" label-width="90px">
                            <el-select size="small" v-model="x.roleId" placeholder="请选择" clearable :disabled="x.disabled">
                                <el-option :label="item.name" :value="item.id" v-for="item in deptroleList" :key="item.roleId"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="角色范围:"  prop="dataLevel" label-width="90px">
                            <el-select size="small" v-model="x.dataLevel" placeholder="请选择" clearable  :disabled="x.disabled">
                                <el-option :label="item.name" :value="item.id" v-for="item in dataLevel" :key="item.id"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-button type="text" v-if="!disabledShow" size="small" @click="add" class="addBtn" title="添加" ><i class="el-icon-plus"></i></el-button>
                            <el-button type="text" size="small" @click="del(index)" v-if="$route.query.id && !x.disabled" title="删除"><i class="el-icon-delete"></i></el-button>
                            <el-button type="text" size="small" @click="del(index)" v-if="!$route.query.id && delBtnShow" title="删除"><i class="el-icon-delete"></i></el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>
            <el-form-item class="btns" v-if="!disabledShow" >
                <el-button type="primary" size="small" @click="submit" >确定</el-button>
                <el-button size="small" @click="cancel">取消</el-button>
            </el-form-item>
            </el-form>
     </cancer-user-widget>
     <!-- 选择部门弹窗 -->
     <DeptreeDialog :deptreeDialogVisable="deptreeDialogVisable" :index="index" @closeDialog="closeDialog" @rowData="rowData"></DeptreeDialog>
    </div>
</template>
<script>
import deptrole from '@/views/users/deptrole'
import DICTIONARY from '@/utils/dictionary'
import VALIDATE from '@/utils/validate'
import DeptreeDialog from '@/views/users/DeptreeDialog'
import URL from "@/plugin/serviceAPI.config.js"
  export default {
      mixins: [ deptrole ],
    data () {
      return {
        deptreeDialogVisable:false,
        disabledShow:false,
        jg:false,    //控制机构按钮显示隐藏
        index:null,    //机构索引值
        formData: {
          loginName: null,
          phone: null,
          idCard:null,
          idCardPositive:null,
          idCardNegative:null,
          userRoleDtoList:[{
              dataLevel:null,
              roleId:null,
              deptName:null,
              deptId:null,
            }],             
          },
        filePositive: [{url: require('@/assets/img/avatarTC.png')}],
        fileNegative: [{url: require('@/assets/img/avatarTC.png')}],
        pwd:'000000',
        deptroleList:[],
        imageUrl: '',
        serverName:SERVER_NAME,
        dataLevel:DICTIONARY.dataLevel,
        delBtnShow:false,   //控制删除按钮
        disabled:false,   //查看
        formInlinelist:{
            loginName:[
                { required: true, message: '必填', trigger: 'blur' },
            ],
            phone:[
                { required: true, message: '必填', trigger: 'blur' },
                { message: '请输入11位手机号', trigger: 'blur', validator: VALIDATE.checkPhone}
            ],
            deptName:[
                { required: true, message: '必填', trigger: 'change' },
            ],
            roleId:[
                { required: true, message: '必填', trigger: 'change' },
            ],
            dataLevel:[
                { required: true, message: '必填', trigger: 'change' },
            ],
            trueName:[
                { required: true, message: '必填', trigger: 'blur' },
                { message: '请输入2-20个汉字', trigger: 'blur', validator: VALIDATE.checkFont}
            ],
            idCard:[
                { message: '身份证号格式不对', trigger: 'blur', validator: VALIDATE.idCard}
            ]
        }
      }
    },
    components:{
        DeptreeDialog
    },
    created(){
        this.getDeptroleData();
        // 查看
        if(this.$route.query.id){
            this.findUserInfo();
        }else{
            this.filePositive=[];
            this.fileNegative=[];
        }
        if(this.$route.query.flag=='0'){
            this.disabledShow=true;
        }
        // 角色判断
        if(this.$route.path.indexOf('/user/adduser')>-1){
            // this.jg=true;
            // bi 测试国家
            this.jg=false;  
        }
        
    },
    mounted(){
        // flag-0,查看
        if(this.$route.query.flag=='0'){
            this.disabled=true;
        }
    },
    methods: {
     // 查看用户基本信息
      findUserInfo(){
        this.$axios_http({
          url: URL.findUserInfoAndRoleInfo,
          data: {
                "id":this.$route.query.id,
                "deptId":this.$route.query.deptId
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.success){
            this.formData=res.data.result;
            this.formData.userRoleDtoList.filter(item => {
                item.disabled=true;
            })
            this.disabled=true;
            if(this.formData.idCardPositive){
                this.filePositive[0].url=SERVER_NAME+'/base/file/downfile?filePath='+this.formData.idCardPositive;
            }
            if(this.formData.idCardNegative){
                this.fileNegative[0].url=SERVER_NAME+'/base/file/downfile?filePath='+this.formData.idCardNegative
            }
          }
        })
    },
     uploadUrl(){
          return URL.upload
      },
      handleAvatarSuccessPositive(res, file) {
          if(res.status=='SUCCESS'){
              this.formData.idCardPositive=res.result;
          }
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccessNegative(res, file) {
          if(res.status=='SUCCESS'){
            this.formData.idCardNegative=res.result;
          }
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleRemoveNegative(file, fileList) {
        this.formData.idCardNegative=null;
      },
      handleRemovePositive(file, fileList) {
        this.formData.idCardPositive=null;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 <= 200;
        if (!isLt2M) {
          this.$message.error('文件大小不超过200K');
        }
        return isLt2M;
      },
      del(index){// 删除账户信息
        // 控制删除按钮显示隐藏
        if(this.formData.userRoleDtoList.length<=2){
          this.delBtnShow=false;
        }
        this.formData.userRoleDtoList.splice(index,1)
      },
     add(){// 添加账户信息
        this.formData.userRoleDtoList.push({
              dataLevel:null,
              roleId:null
            });
        // 控制删除按钮显示隐藏
        this.delBtnShow=true;
      },
      submit(){
        // 校验是否全部通过
        let validd = true
        this.$refs.formInline.validate((valid) => {
        if (!valid){
            validd = false
          }
        })
         if(this.formData.userRoleDtoList && this.formData.userRoleDtoList.length){
            for(var i=0;i<this.formData.userRoleDtoList.length;i++){
                this.$refs['formInlinelist'+i][0].validate((valid) => {
                if (!valid){
                    validd = false
                }
                })
            }
        }
        //提交审核
        if (validd) {
          this.submitUsrInfo();
        } else {
          return false;
        }
      },
     //   提交请求
      submitUsrInfo(){
          let _url=null;
          if(this.$route.query.id){
            //   修改
            _url=URL.updateUserInfo
          }else{
            _url=URL.addUserInfo
          }
        this.$axios_http({
            url: _url,
            data: this.formData,
            vueObj: this
        }).then((res)=> {
            if(res.data.success){
            this.$message({
                type:'success',
                message:'保存成功',
              })
               this.$router.go(-1);
            }
        })
      },
      cancel(){
          this.$router.go(-1);
      },
      // 打开部门树
     openDeptDialog(index){
         this.deptreeDialogVisable=true;
         this.index=index;
     },
    //   关闭部门树弹窗
      closeDialog(val){
          this.deptreeDialogVisable=val;
      },
    //   获取部门树弹窗传来的点击的值
      rowData(val){
          this.formData.userRoleDtoList[val.index].deptName=val.deptName;
          this.formData.userRoleDtoList[val.index].deptId=val.id;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader .el-upload {
    cursor: pointer;
    overflow: hidden;
  }
  .cancer-wrap__content .el-upload--picture-card i{
      font-size: 50px;
      color: #D2D2D2;
      position: absolute;
      margin-left: 35px;
      margin-top: 35px;
  }
  .cancer-wrap__content .el-upload--picture-card span{
      display: inline-block;
      margin-top: 50px;
      font-size: 14px;
      color: #999999;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-form-item .el-input ,.el-select{
    max-width: 200px;
}
.btns{
    margin-top: 30px;
    margin-left: -15px;
}
.label-sub{
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
    border-top:1px dashed #F4F4F4;
    padding-top: 20px;
}
.title{
    font-size: 18px;
    border-bottom: 1px solid #F4F4F4;
    padding-bottom: 20px;
    padding-left:20px ;
}
.formBlock{
    padding: 20px;
}
.el-icon-delete{
    color: #999;
    font-weight: bold;
    font-size: 18px;
}
.addBtn .el-icon-plus{
    background: #999999;
    color:#ffffff;
    border-radius: 2px;
    font-size: 18px;
}
.tips{
    margin-top: 20px;
    p{
        font-size: 14px;
        color: #666666;
    }
}
.cards{
    min-height:300px;
}
.seeImg{
    margin-bottom: 20px;
}
.imgBlock{
    width:240px;
    height: 148px;
    border:1px solid #F4F4F4;
    box-sizing:border-box;
    float: left;
    overflow: hidden;
}
.imgBlock img{
    width: 100%;
}
</style>
<style rel="stylesheet/scss" lang="scss" >
.formBlock .el-input.is-disabled .el-input__inner{
    background:#f9f9f9;
    color:#666;
}
</style>


