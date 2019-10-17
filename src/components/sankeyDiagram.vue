<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>

<script>
export default {
  name: "sankeyDiagram",
  props: {
    sankeyData: {
      default: {},
      type: Object
    },
    dataType: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      myChart: {},
    };
  },
  watch: {
    sankeyData: function(val) {
      this.drawLine(val.nodes, val.links);
    }
  },
  mounted() {
    var that = this;
    var myChart = that.$echarts.init(this.$refs["myChart"]);
    that.myChart = myChart;
    this.drawLine(this.sankeyData.nodes, this.sankeyData.links);
  },
  methods: {
    drawLine(nodes, links) {
      let $that = this
      this.myChart.clear(); //清空图表
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs["myChart"]);
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.barTitle,
          left:'center',
          textStyle: {
            fontSize: 16,
            fontWeight:'normal',
            color: '#333333',
            
          }
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter:function(params) {
            if($that.dataType === "2") {
              if(params.value){
                return params.name.replace('>','--') + '：' + (params.value*100).toFixed(2)+'%'
              }else{
                return params.name.replace('>','--') + '：' + '-'
              }
            }else{
              if(params.value){
                return params.name.replace('>','--') + '：' + params.value
              }else{
                return params.name.replace('>','--') + '：' + '-'
              }
            }
          }
        },
        toolbox: {
          show: true,
          right: 20,
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: "sankey",
            layout: "none",
            data: nodes,
            links: links,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#aaa"
              }
            },
            lineStyle: {
              normal: {
                color: "source",
                curveness: 0.5
              }
            }
          }
        ]
      });
    }
  },
  created() {},
  destroyed() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.echarts {
  background: #fff;
  width: 940px;
  height: 500px;
}
</style>

