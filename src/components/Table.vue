<template>
    <div>
      <div class="top">
        <p class="table-title">{{barTitle}}</p>
        <el-button type="success" @click="handleDownload" size="small">导出EXCEL</el-button>
      </div>
        <div class="table-wrap">
          <table class="fix-table-tr" v-if="tableData.length>10">
                <tr>
                    <td v-for="(col,indexCol) in tableData[0]" :key="indexCol">{{col}}</td>
                </tr>
            </table>
          <div class="table">
            <div v-if="tableData.length>0">
                <table class="fix-table" v-if="tableData[0].length>10">
                  <tr v-for="(row,index) in tableData" :key="index">
                      <td>{{row[0]}}</td>
                  </tr>
              </table>
            </div>
            <div class="content-table">
                <table>
                    <tr v-for="(row,index) in tableData" :key="index">
                        <td v-for="(col,indexCol) in row" :key="indexCol">{{col}}</td>
                    </tr>
                </table>
            </div>  
        </div>
        </div>
        
        
    </div>
</template>

<script>
import mixin from "@/mixins/mixins";
export default {
  props: {
    dataList: {
      default: [],
      type: Array
    },
    barTitle: {
      default: null,
      type: String
    },
    indexarr: {
      default: null,
      type: String
    },
    dimension1: {
      default: null,
      type: String
    },
    dimension2: {
      default: null,
      type: String
    },
    dataType: {
      default: null,
      type: String
    }
  },
  mixins: [mixin],
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    dataList: function(val) {
      this.initTableData();
    },
    dataType: function(val) {}
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    initTableData() {
      this.tableData = [];
      let first = Array.from(
        new Set(this.arrayMerge(this.dataList, this.dimension2))
      );
      if (first.length === 1 && !first[0]) {
        if (this.dataType == "1") {
          first = ["数量"];
        } else {
          first = ["比率"];
        }
      }
      let firstRow = new Array();
      first.filter(item => {
        firstRow.push(item);
      });
      firstRow.unshift(" ");
      this.tableData.push(firstRow);
      let newobj = [];
      if (this.dimension2) {
        if (this.dimension1 === "YEAR") {
          if (this.dataType === "2") {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                YEAR: item.YEAR,
                data: this.arrayMergeAutoFloat(
                  item.data,
                  this.indexarr,
                  first,
                  this.dimension2
                )
              };
              newobj.push(newItem);
            });
          } else {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                YEAR: item.YEAR,
                data: this.arrayMergeAuto(
                  item.data,
                  this.indexarr,
                  first,
                  this.dimension2
                )
              };
              newobj.push(newItem);
            });
          }
          newobj.filter(item => {
            item.data.unshift(item.YEAR + "年度");
            this.tableData.push(item.data);
          });
        } else {
          if (this.dataType === "2") {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                NAME: item[this.dimension1],
                data: this.arrayMergeAutoFloat(
                  item.data,
                  this.indexarr,
                  first,
                  this.dimension2
                )
              };
              newobj.push(newItem);
            });
          } else {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                NAME: item[this.dimension1],
                data: this.arrayMergeAuto(
                  item.data,
                  this.indexarr,
                  first,
                  this.dimension2
                )
              };
              newobj.push(newItem);
            });
          }
          newobj.filter(item => {
            item.data.unshift(item.NAME);
            this.tableData.push(item.data);
          });
        }
      } else {
        if (this.dimension1 === "YEAR") {
          if (this.dataType === "2") {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                YEAR: item.YEAR,
                data: this.arrayMergeFloat(item.data, "SUMDATA")
              };
              newobj.push(newItem);
            });
          } else {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                YEAR: item.YEAR,
                data: this.arrayMerge(item.data, "SUMDATA")
              };
              newobj.push(newItem);
            });
          }
          newobj.filter(item => {
            item.data.unshift(item.YEAR + "年度");
            this.tableData.push(item.data);
          });
        } else {
          if (this.dataType === "2") {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                NAME: item[this.dimension1],
                data: this.arrayMergeFloat(item.data, "SUMDATA")
              };
              newobj.push(newItem);
            });
          } else {
            this.objectMerge(this.dataList, this.dimension1).filter(item => {
              let newItem = {
                NAME: item[this.dimension1],
                data: this.arrayMerge(item.data, "SUMDATA")
              };
              newobj.push(newItem);
            });
          }
          newobj.filter(item => {
            item.data.unshift(item.NAME);
            this.tableData.push(item.data);
          });
        }
      }
    },
    // 导出excel
    handleDownload() {
      let that = this
        import('@/excel/Export2Excel').then(excel => {
          const tHeader = this.tableData[0]
          const filterVal = Object.keys(this.tableData[1]);
          const list = this.tableData.slice(1)
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: that.barTitle,
            autoWidth: true
          })
        })
      },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>

<style scoped>
.table {
  margin: 0 auto;
  max-height: 500px;
  overflow-y: auto;
  position: relative;
}
.content-table {
  overflow-x: auto;
}
table {
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  width: 929px;
}
td {
  border: 1px solid #ebeef5;
  padding: 0 10px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  min-width: 82px;
}
.table-title {
  text-align: center;
  margin-bottom: 10px;
}
.fix-table {
  background: #fff;
  width: 82px;
  position: absolute;
  top: 0px;
  left: 0;
  box-shadow: 0 0px 2px #f0f0f0;
}
.table-wrap {
  position: relative;
  width: 98%;
  margin: 0 auto;
  max-height: 500px;
}
.fix-table-tr {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.fix-table-tr td {
  background: #fff;
}
.top{
  position: relative;
}
.top button{
  position: absolute;
  right: 10px;
  top: -5px;
  border-radius: 0;
}
</style>