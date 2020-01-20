<template>
    <div class="box">
        <div class="alert-wrap over pos-r">
            <div class="alert-btn fr figer" @click="clickAlertBtn"></div>
            <div class="alert-detail-wrap w100 fr pos-r" v-if="showAlertDetail==true">
                <div class="alert-top over">
                    <span class="dis-ib ft-w fl">告警管理</span>
                    <span class="dis-ib ft-w fr figer" @click="close">X</span>
                    <span class="alright-read dis-ib fr figer" @click="alrightReadAll">全部标记为已读</span>
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
                                <el-button size="mini" type="primary" v-if="scope.row.read_type==0"
                                @click="alrightReadOne(scope.row.id)">标记已读</el-button>
                                <el-button size="mini" type="primary" v-if="scope.row.handle_type==0"
                                @click="handle(scope.row.id)">处理</el-button>
                            </template>
                        </el-table-column>
                      </el-table>
                </div>
                <div class="mask pos-a w100 h100" v-if="showHandle==true">
                    <div class="handle-wrap bg-f pos-a">
                        <div class="alert-top over">
                            <span class="dis-ib ft-w fl">标记为处理</span>
                            <span class="dis-ib ft-w fr figer" @click="closeHandle">X</span>
                        </div>
                        <div class="handle-info over">
                            <span class="fl dis-ib handle-title">处理者(<span class="color-r">*</span>)：</span>
                            <input class="fl fs-12 handle-input handler" placeholder="请输入处理者" maxlength="25"
                            v-model="handler">
                        </div>
                        <div class="handle-info over">
                            <span class="fl dis-ib handle-title" dis-ib handle-title>处理内容(<span class="color-r">*</span>)：</span>
                            <textarea class="fl handle-input content" placeholder="请输入处理内容" maxlength="255"
                            v-model="hadleContent"></textarea>
                        </div>
                        <div class="handle-btns-wrap fr over">
                            <span class="dis-ib handle-btns figer confirm color-f" @click="sureHandle">确认</span>
                            <span class="dis-ib handle-btns figer" @click="closeHandle">取消</span>
                        </div>
                    </div>
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
        showAlertDetail:false,
        alertId:"",
        alertIds:"",
        showHandle:false,
        handler:"",
        hadleContent:"",
      }
    },
    methods:{
        // 点击告警按钮
        clickAlertBtn(){
            var q=document.getElementsByClassName("alert-wrap")[0]
            if(this.showAlertDetail==true){
                this.close()
            }else{
                q.style.width=1100+"px"
                this.getAlertData()
                this.showAlertDetail=true
            }
        },
        // 获取告警列表
        getAlertData(){
            this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/selectNoDealAlarm.do",
            this.$qs.stringify({
                handle_type:0
            })).then((res)=>{
                this.alertData=res.data
            })
        },
        // 关闭告警列表
        close(){
            var q=document.getElementsByClassName("alert-wrap")[0]
            this.showAlertDetail=false
            this.alertId=""
            this.alertIds=""
            q.style.width=40+"px"
            if(this.showHandle==true){
                this.closeHandle()
            }
        },
        //标记全部已读
        alrightReadAll(){
            if(this.alertData.length==0){
                this.$message({
                    type: 'warning',
                    message: '暂时没有告警数据',
                    center: true,
                    duration:1500
                })
            }else{
                this.$confirm('确认全部标记为已读?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.alertData.length;i++){
                        if(this.alertIds.length==0){
                            this.alertIds="'"+this.alertData[i].id+"'"
                        }else{
                            this.alertIds=this.alertIds+",'"+this.alertData[i].id+"'"
                        }
                    }
                    this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/updateAllReadTypeAlarmByIds.do",
                    this.$qs.stringify({
                        ids:this.alertIds,
                        read_type:1
                    })).then((res)=>{
                        if(res.data>0){
                            this.$message({
                                type: 'success',
                                message: '全部标记已读成功',
                                center: true,
                                duration:1500
                            })
                            this.getAlertData()
                        }else if(res.data==0){
                            this.$message({
                                type: 'warning',
                                message: '全部标记已读失败',
                                center: true,
                                duration:1500
                            })
                        }
                    })
                }).catch(() => {});
            }
        },
        // 单个标记已读
        alrightReadOne(e){
            this.$confirm('确认标记为已读?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.alertId=e
                this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/updateReadTypeAlarmById.do",
                this.$qs.stringify({
                    id:this.alertId,
                    read_type:1
                })).then((res)=>{
                    if(res.data==1){
                        this.$message({
                            type: 'success',
                            message: '标记已读成功',
                            center: true,
                            duration:1500
                        })
                        this.getAlertData()
                    }else if(res.data==0){
                        this.$message({
                            type: 'warning',
                            message: '标记已读失败',
                            center: true,
                            duration:1500
                        })
                    }
                })
            }).catch(() => {});
        },
        // 处理
        handle(e){
            this.alertId=e
            this.showHandle=true
        },
        // 确认处理
        sureHandle(e){
            if(this.handler.length==0||this.hadleContent.length==0){
                this.$message({
                    type: 'warning',
                    message: '处理者或处理内容不能为空！',
                    center: true,
                    duration:1500
                })
            }else{
                this.$confirm('确认标记为已处理?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/updateReadTypeAlarmById.do",
                    this.$qs.stringify({
                        id:this.alertId,
                        handle_type:1,
                        handler:this.handler,
                        processing_contents:this.hadleContent
                    })).then((res)=>{
                        if(res.data==1){
                            this.$message({
                                type: 'success',
                                message: '标记已处理成功',
                                center: true,
                                duration:1500
                            })
                            this.getAlertData()
                            this.closeHandle()
                        }else if(res.data==0){
                            this.$message({
                                type: 'warning',
                                message: '标记已处理失败',
                                center: true,
                                duration:1500
                            })
                        }
                    })
                }).catch(() => {});
            }
        },
        //关闭处理
        closeHandle(){
            this.showHandle=false
            this.handler=""
            this.hadleContent=""
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
    /* width: 1100px; */
    /* width: 1100px; */
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
.mask{
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1001;
    background: rgba(0,0,0,.5)
}
.handle-wrap{
    width: 400px;
    height: 200px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.handle-input{
    border: 1px solid #ddd;
    padding-left: 6px;
    width: 220px;
}
.handle-title{
    line-height: 20px;
}
.handle-title{
    width: 80px;
}
.handle-info{
    padding: 10px 15px 0;
}
.handler,.handle-title{
    line-height: 20px;
}
.content{
    height: 80px;
    padding-top: 6px;
}
.handle-btns-wrap{
    margin-top: 10px;
}
.handle-btns{
    margin-right: 10px;
    line-height: 28px;
    border: 1px solid #ddd;
    padding: 0 15px;
}
.confirm{
    background: #42aeed;
    border-color: #42aeed;
}
</style>