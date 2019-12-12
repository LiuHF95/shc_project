<template>
    <div class="box">
        <div class="alert-overview-wrap w100 fa-12">
            <div class="alert-overview-top">
                <div class="dis-ib">
                    <span>开始时间：</span>
                    <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="startTime"
                        :clearable="false"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="dis-ib end-time">
                    <span>结束时间：</span>
                    <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="endTime"
                        :clearable="false"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <input class="search search-input fs-12" placeholder="请输入设备的IMEI(输入多个请用英文','隔开)" v-model="IMEI">
                <span class="dis-ib search search-btn color-f figer" @click="search">搜索</span>
            </div>
            <div class="alert-table-wrap">
                <el-table :header-cell-style="rowClass" :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" align="center" fixed label="设备名称"></el-table-column>
                    <el-table-column prop="name" align="center" label="IMEI"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警信息"></el-table-column>
                    <el-table-column prop="name" align="center" label="是否已读"></el-table-column>
                    <el-table-column prop="name" align="center" label="定位时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="处理状态"></el-table-column>
                    <el-table-column prop="name" align="center" label="处理内容"></el-table-column>
                    <el-table-column prop="name" align="center" label="处理时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="处理者"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警定位地点"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警开始时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警结束时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="定位开始时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="定位结束时间"></el-table-column>
                    <el-table-column prop="name" align="center" label="报警信息类型"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            startTime:"",
            endTime:"",
            IMEI:"",
            IMEIs:"",
            page:1,
            totalPage:0,
            tableData: 
            [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        }
    },
    mounted(){
        this.getTime()
        this.getData()
    },
    methods:{
        getTime(){
            var date = new Date()
            var year =date.getFullYear()  //获取完整的年份(4位,1970-????)
            var month = date.getMonth()+1  //获取当前月份(0-11,0代表1月)
            var day = date.getDate()       //获取当前日(1-31)
            this.startTime=year+"-"+month+"-"+day+" 00:00:00"
            this.endTime=year+"-"+month+"-"+day+" 11:00:00"
        },
        getData(){
            this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/selecAlltAlarm.do",
            this.$qs.stringify({
                ids:this.IMEIs,						
                alarmStartdate:this.startTime,			
                alarmEnddate:this.endTime,			
                page:this.page,					
                rows:10					
            })).then((res)=>{
                console.log(res)
                this.totalPage=res.data.total/10
            })
        },
        search(){
            this.IMEIs=""
            var reg=/^[0-9,]+$/
            if((!reg.test(this.IMEI))&&(this.IMEI.length!=0)){
                this.$message({
                    type: 'warning',
                    message: '输入设备IMEI格式不正确',
                    center: true,
                    duration:1500
                })
            }else{
                var res=this.IMEI.split(",")
                for(var i=0;i<res.length;i++){
                    if(res[i]!=""){
                        if(this.IMEIs.length==0){
                            this.IMEIs="'"+res[i]+"'"
                        }else{
                            this.IMEIs=this.IMEIs+",'"+res[i]+"'"
                        }
                    }
                }
                this.getData()
            }
        },
        rowClass() {
            return 'background: #F2F7FB;font-weight: blod;height: 30px;'
        },
    }
}
</script>
<style scoped>
.alert-overview-top{
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}
.end-time,.search{
    margin-left: 10px;
}
.search{
    line-height: 28px;
    border: 1px solid #ddd;
}
.search-input{
    width: 290px;
    padding-left: 4px;
}
.search-btn{
    padding: 0 15px;
    background: #42aeed;
    border-color: #42aeed;
}
</style>
<style>
.el-input__inner{
    height: 30px;
}
.el-input__icon{
    line-height: 30px;
}
.el-input__prefix{
    left: 0;
}
.el-table{
    font-size: 12px;
}
.el-table .cell{
    line-height: 35px;
}
.el-table td, .el-table th{
    padding: 0;
}
</style>