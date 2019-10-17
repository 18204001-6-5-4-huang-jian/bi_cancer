import URL from "@/plugin/serviceAPI.config.js"
export default {
  methods: {
    // 获取用户列表
    async getDeptroleData () {
      const {data: {success, result}} = await this.$axios_http({
        url:URL.findAllRolesByFlag,
        data: {}
      })
      if (success) {
        this.deptroleList = [...result]
      }
    }
  }
}