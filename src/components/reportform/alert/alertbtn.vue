<template>
    <div class="box">
        <div class="alert-wrap over pos-r">
            <div class="alert-btn fr figer" @click="getAlertData"></div>
            <div class="alert-detail-wrap w100 fr">
                <div class="alert-top over">
                    <span class="dis-ib ft-w fl">告警管理</span>
                    <span class="dis-ib ft-w fr figer">X</span>
                    <span class="alright-read dis-ib fr figer">全部标记为已读</span>
                </div>
                <div class="alert-table">
                    <el-table :data="alertData" border style="width: 100%">
                        <el-table-column align="center" prop="device_name" label="设备名称" width="100"></el-table-column>
                        <el-table-column align="center" prop="alarm" label="报警信息" width="180"></el-table-column>
                        <el-table-column align="center" prop="alarm_time" label="报警时间" width="150"></el-table-column>
                        <el-table-column align="center" label="已读状态" width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.read_type==1">已读</span>
                                <span v-if="scope.row.read_type==0" class="color-r">未读</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="处理状态" width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.handle_type==1">已处理</span>
                                <span v-if="scope.row.handle_type==0" class="color-r">未处理</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="processing_contents" label="处理内容" width="180"></el-table-column>
                        <el-table-column align="center" prop="handler" label="处理者" width="80"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" v-if="scope.row.read_type==0">标记已读</el-button>
                                <el-button size="mini" type="primary" v-if="scope.row.handle_type==0">处理</el-button>
                            </template>
                        </el-table-column>
                      </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        alertData: [],
        showAlertDetail:true,
      }
    },
    methods:{
        getAlertData(){
            this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/selectNoDealAlarm.do",
            this.$qs.stringify({
                handle_type:0
            })).then((res)=>{
                this.alertData=res.data
            })
        }
    }
  }
</script>
<style scoped>
.alert-btn{
  width: 30px;
  height: 30px;
  background: #fff url("../../../../static/images/alerticon.png") no-repeat center center;
  background-size: 20px 20px;
  box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0,0,0,.2);
  margin-bottom: 5px;
}
.alert-wrap{
    width: 1100px;
}
.alert-detail-wrap{
    height: 350px;
    background: #fff;
    box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0,0,0,.2);
}
.alert-top{
    line-height: 30px;
    background: #F1F5FD;
    padding: 0 15px;
}
.alright-read{
    margin-right: 40px;
    color: #42aeed;
}
.alright-read:hover{
    color: #1075af;
}
.alert-table{
    height: calc(100% - 30px);
    overflow: auto;
}
</style>