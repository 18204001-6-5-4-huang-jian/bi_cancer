/**
* created by leicj on 2018/1/8.
* 定义混合对象
*/
import URL from "@/plugin/serviceAPI.config.js";
let mixin = {
  methods: {
       /**
       * 通用，获取图表名称
       * @returns String
       */
    getChartName() {
      let indexName='',wd1Name='',wd2Name='',tag='',cancerTypes='';
      let i=0;
      //指标
        this.$refs.indexarr && this.$refs.indexarr.filter( item=> {
          if(item.$el._prevClass.indexOf('is-checked')>-1) {
            if(item.name.charAt(item.name.length-1)==='性'){
              indexName = item.name.replace('率','').replace('性','')
            }else{
              indexName = item.name.replace('率','')
            }
          }
        })
        //维度一 
        this.$refs.wd1 && this.$refs.wd1.filter( item=> {
          if(item.$el._prevClass.indexOf('is-checked')>-1) {
            wd1Name = '各'+item.name
          }
        })
  
         //维度二
         this.$refs.wd2 && this.$refs.wd2.filter( item=> {
          if(item.$el._prevClass.indexOf('is-checked')>-1) {
            i++;
            wd2Name = '各'+item.name
          }
          if(i==0){
            wd2Name = ''
          }
        })
        //数量or比率
        if(this.formData.dataType==='1'){
          if(indexName == '风险评估'){
            tag='数（人）'
          }else{
            tag='数（例）'
          }
        }else{
          tag='率（%）'
        }
  
        // 癌种
        this.$refs.cancerTypes.$children.filter( item=> {
          if(item.active) {
              cancerTypes = item.$attrs.name
            }
          })
        this.barTitle=cancerTypes+wd1Name+wd2Name+indexName+tag;
    },

      /**
       * 通用，获取图表名称-人群分布
       * @returns String
       */
      getRiskChartName() {
        let indexName=null,wd1Name=null,wd2Name=null,tag=null;
        let i=0;
        //指标
        // this.$refs.indexarr && this.$refs.indexarr.filter(item=> {
        //   if(item.$el._prevClass.indexOf('is-checked')>-1) {
        //     indexName = item.name.replace('人群','')
        //   }
        // })
        switch(this.activeIndex){
              case '1':
                  indexName = '风险评估';
                  break
              case '2-1':
                  indexName = '肺癌';
                  break
              case '2-2':
                  indexName = '乳腺癌';
                  break
              case '2-3':
                  indexName = '结直肠癌';
                  break
              case '2-4':
                  indexName = '肝癌';
                  break
              case '2-5':
                  indexName = '胃癌';
                  break
              case '2-6':
                  indexName = '食管癌';
        }
        //维度一
        this.$refs.wd1 && this.$refs.wd1.filter( item=> {
          if(item.$el._prevClass.indexOf('is-checked')>-1) {
            wd1Name = item.label
          }
        })
  
        //数量or比率
        if(this.formData.dataType==='1'){
            // tag='数（例）'
            tag = '';
        }else{
          //  tag='率（%）'
          tag = '';
        }
        // this.barTitle='该项目各'+wd1Name+'参加'+indexName+tag;
        this.barTitle=indexName+'人群流行特征分布'+tag;
      },

      // 查询数据字典
      async queryAllDataCode() {
        const { data: { success, result } } = await this.$axios_http({
          url:`${URL.queryAllDataCode}`,
          method: "post",
          data: {},
          vueObj: this
        });
        if (success) {
          this.province = result[16];
          this.age = result[3];
          // this.sex = result[4];
        }
      },
  }
}

export default mixin