/**
* created by leicj on 2018/12/24.
*/
// global.SERVER_NAME="http://192.168.1.161:55555"
//  //大平台-仅用于退出接口调用
// global.SERVER_NAME_BIGPLATFORM="http://192.168.1.161:50006"
//  大平台IP-用于退出跳转
 global.BIGPLATFORM_URL="http://localhost:8888/#/"

 /**
 * 内网测试环境
 */
global.SERVER_NAME="http://192.168.1.11:55555"
//大平台-仅用于退出接口调用
global.SERVER_NAME_BIGPLATFORM="http://211.103.176.186:30004"
// 大平台IP-用于退出跳转
// global.BIGPLATFORM_URL="http://192.168.1.11/page/#/"

 /**
 * 外网测试环境
 */
// global.SERVER_NAME="http://211.103.176.186:30021"
//大平台-仅用于退出接口调用
// global.SERVER_NAME_BIGPLATFORM="http://211.103.176.186:30004"
// 大平台IP-用于退出跳转
// global.BIGPLATFORM_URL="http://211.103.176.186:30002/page/#/"

/**
 * 正式环境
 */
// global.SERVER_NAME="http://111.202.40.134:55555"
//大平台-仅用于退出接口调用
// global.SERVER_NAME_BIGPLATFORM="http://111.202.40.140:80"
// 大平台IP-用于退出跳转
// global.BIGPLATFORM_URL="http://111.202.40.140/page/#/"

const URL={
    dataStatistic:SERVER_NAME+'/statistical/data',
    riskFactors:SERVER_NAME+'/statistical/riskFactors',   //危险因素
    riskFactorsSankey:SERVER_NAME+'/statistical/riskFactorsSankey',  //桑基图
    findUsersByCurrentDeptId:SERVER_NAME+'/sys/user/findUsersByCurrentDeptId',  //查询用户列表
    resetPassword:SERVER_NAME+'/sys/user/resetPassword',  //重置密码
    findAllRolesByFlag:SERVER_NAME+'/sys/role/findAllRolesByFlag/0',  //用户列表
    findUserInfoAndRoleInfo:SERVER_NAME+'/sys/user/findUserInfoAndRoleInfo',  //查看用户基本信息
    upload:SERVER_NAME+"/file/uploadfile",     //下载
    updateUserInfo:SERVER_NAME+"/sys/user/updateUserInfo",     //修改用户信息
    addUserInfo:SERVER_NAME+"/sys/user/addUserInfo",     //添加用户信息
    deptree:SERVER_NAME+"/sys/user/find/deptree",     //查找所属机构树
    deptrole:SERVER_NAME+"/system/find/deptrole",     //查询角色
    menu:SERVER_NAME+"/auth/get/menu",     //查询用户
    resources:SERVER_NAME+"/system/find/resources",     //查询资源
    queryHomeDataByType:SERVER_NAME+"/statistical/queryHomeDataByType",     //查询首页数据
    queryAllDataCode:SERVER_NAME+"/statistical/queryAllDataCode",     //查询数据字典

} 

module.exports = URL