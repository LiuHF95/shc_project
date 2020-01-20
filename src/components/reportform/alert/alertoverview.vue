<template>
    <div class="box h100">
        <div class="alert-overview-wrap h100 w100 fa-12" ref="wrap">
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
                <div class="dis-ib search pos-r search-wrap">
                    <input class="search-input fs-12" placeholder="请输入设备的IMEI(输入多个请用英文','隔开)" v-model="IMEI">
                    <span class="dis-ib pos-a search-icon figer" @click="searchGroup"></span>
                    <div class="device-wrap pos-a" v-if="showGroup==true">
                        <ul class="device-group-wrap">
                            <li class="device-group" v-for="(item,index) in deviceArry" :key="index">
                                <div class="over">
                                    <span class="sanjiao-icon dis-ib fl figer"
                                    @click="choseGroup(index)"
                                    :class="{'sanjiao-icon-active':showWhichGroup==index}"></span>
                                    <span class="fl">{{item.name}}&nbsp;({{item.number}})</span>
                                </div>
                                <ul class="device-list-wrap" v-show="showWhichGroup==index">
                                    <li class="device-list over" v-for="(val,e) in item.list" :key="e">
                                        <input class="chose-device-btn fl" type="checkbox"
                                        :value="val.terminalid"
                                        @click="checkOne()">
                                        <span class="fl">{{val.name}}&nbsp;({{val.terminalid}})</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="search-bottom-wrap">
                            <div class="chose-all-wrap fl over">
                                <input class="fl chose-all-btn" type="checkbox" @click="checkAll">
                                <span class="fl">全选</span>
                            </div>
                            <div class="fr">
                                <span class="search-btm-btn dis-ib color-f confirm-btn figer" @click="confirm">确定</span>
                                <span class="search-btm-btn dis-ib figer" @click="cancel">取消</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="dis-ib search search-btn color-f figer" @click="search">搜索</span>
            </div>
            <div class="alert-table-wrap">
                <el-table :header-cell-style="rowClass" :data="alertData" :height="tableHeight" border style="width: 100%">
                    <el-table-column align="center" width="50" fixed prop="SerialNumber" label="序号"></el-table-column>
                    <el-table-column align="center" width="100" fixed prop="device_name" label="设备名称"></el-table-column>
                    <el-table-column align="center" width="125" fixed prop="terminalid" label="IMEI"></el-table-column>
                    <el-table-column align="center" width="80" prop="sos求救" label="SOS求救"></el-table-column>
                    <el-table-column align="center" width="80" prop="断电报警" label="断电报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="震动报警" label="震动报警"></el-table-column>
                    <el-table-column align="center" width="85" prop="进围栏报警" label="进围栏报警"></el-table-column>
                    <el-table-column align="center" width="85" prop="出围栏报警" label="出围栏报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="超速报警" label="超速报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="位移报警" label="位移报警"></el-table-column>
                    <el-table-column align="center" width="110" prop="进gps盲区报警" label="进GPS盲区报警"></el-table-column>
                    <el-table-column align="center" width="110" prop="出gps盲区报警" label="出GPS盲区报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="开机报警" label="开机报警"></el-table-column>
                    <el-table-column align="center" width="135" prop="gps第一次定位报警" label="GPS第一次定位报警"></el-table-column>
                    <el-table-column align="center" width="100" prop="外电低电报警" label="外电低电报警"></el-table-column>
                    <el-table-column align="center" width="125" prop="外电低电保护报警" label="外电低电保护报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="换卡报警" label="换卡报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="关机报警" label="关机报警"></el-table-column>
                    <el-table-column align="center" width="180" prop="外电低电保护后飞行模式报警" label="外电低电保护后飞行模式报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="拆卸报警" label="拆卸报警"></el-table-column>
                    <el-table-column align="center" width="60" prop="门报警" label="门报警"></el-table-column>
                    <el-table-column align="center" width="100" prop="低电关机报警" label="低电关机报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="声控报警" label="声控报警"></el-table-column>
                    <el-table-column align="center" width="85" prop="伪基站报警" label="伪基站报警"></el-table-column>
                    <el-table-column align="center" width="80" prop="开盖报警" label="开盖报警"></el-table-column>
                    <el-table-column align="center" width="60" prop="acc开" label="ACC开"></el-table-column>
                    <el-table-column align="center" width="60" prop="acc关" label="ACC关"></el-table-column>
                </el-table>
            </div>
            <div class="page-btn-wrap text-c">
                <span class=" dis-ib page-btns prvious color-f figer" @click="prvious">上一页</span>
                <span class=" dis-ib page-btns page">{{page}}</span>
                <span class=" dis-ib page-btns next color-f figer" @click="next">下一页</span>
                <span class=" dis-ib page-btns total-page">共{{totalPage}}页</span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            tableHeight:0,//表格固定高度
            // startTime:"",
            // endTime:"",
            startTime:"2019-11-27 00:00:00",
            endTime:"2019-11-29 00:00:00",
            IMEI:"",
            IMEIs:"",
            page:1,
            totalPage:0,
            alertData: [],
            deviceArry:[],//分组及分组下的设备信息
            showGroup:false,//是否展示分组
            showWhichGroup:0,//展开某个分组
        }
    },
    mounted(){
        // this.getTime()
        this.tableHeight=this.$refs.wrap.offsetHeight - 102
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
                this.alertData=res.data.alarm
                this.totalPage=Math.ceil(res.data.total/10)
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
        // 查看分组
        searchGroup(){
            if(this.showGroup==false){
                this.showGroup=true
                this.$http.post(this.$store.state.shcPost+'/rstl/Group/selectAllGroup.do',{})
                .then((res)=>{
                    this.deviceArry=res.data
                })
            }else if(this.showGroup==true){
                this.showGroup=false
                this.deviceArry=[]
            }
        },
        // 展开某个分组
        choseGroup(e){
            if(this.showWhichGroup==e){
                this.showWhichGroup=-1
            }else{
                this.showWhichGroup=e
            }
        },
        // 确定
        confirm(){
            var ones=document.getElementsByClassName("chose-device-btn")
            this.IMEI=""
            for(var i=0;i<ones.length;i++){
                if(ones[i].checked==true){
                    if(this.IMEI.length==0){
                        this.IMEI=ones[i].value
                    }else{
                        this.IMEI=this.IMEI+","+ones[i].value
                    }
                }
            }
            this.showGroup=false
        },
        // 取消
        cancel(){
            this.showGroup=false
            this.showWhichGroup=0
        },
        // 选每个
        checkOne(){
            var sureAll=1
            var all=document.getElementsByClassName("chose-all-btn")[0]
            var ones=document.getElementsByClassName("chose-device-btn")
            for(var i=0;i<ones.length;i++){
                if(ones[i].checked==false){
                    sureAll=0
                    break;
                }
            }
            if(sureAll==0){
                all.checked=false
            }else{
                all.checked=true
            }
        },
        // 全选
        checkAll(){
            var all=document.getElementsByClassName("chose-all-btn")[0]
            var ones=document.getElementsByClassName("chose-device-btn")
            if(all.checked==true){
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=true
                }
            }else{
                for(var i=0;i<ones.length;i++){
                    ones[i].checked=false
                }
            }
        },
        // 上一页
        prvious(){
            if(this.page<=1){
                this.$message({
                    type: 'warning',
                    message: '已经是第一页了',
                    center: true,
                    duration:1000
                })
            }else{
                this.page-=1
                this.getData()
            }
        },
        // 下一页
        next(){
            if(this.page>=this.totalPage){
                this.$message({
                    type: 'warning',
                    message: '已经是最后一页了',
                    center: true,
                    duration:1000
                })
            }else{
                this.page+=1
                this.getData()
            }
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
.search-input{
    width: 290px;
    padding-left: 4px;
}
.search-btn{
    padding: 0 15px;
    background: #42aeed;
    border-color: #42aeed;
}
.search,.search-wrap{
    border-radius: 4px;
}
.search-input,.search-btn,.page-btns{
    line-height: 28px;
}
.page-btns,.device-wrap,.search,.search-wrap,.search-btm-btn{
    border: 1px solid #ddd;
}
.search-input{
    width: 260px;
    padding-left: 4px;
}
.search-btn{
    padding: 0 15px;
}
.search-wrap,.device-wrap{
    width: 288px;
}
.search-icon{
    width: 28px;
    height: 28px;
    border-left: 1px solid #ddd;
    right: 0;
    top: 0;
    background: url("../../../../static/images/search.png") no-repeat center center;
}
.device-wrap{
    height: 240px;
    left: 0;
    top: 31px;
    border-radius: 4px;
    background: #fff;
    z-index: 10;
}
.device-group-wrap{
    height: 197px;
    border-bottom: 1px solid #ddd;
    overflow: auto;
    padding: 4px;
}
.device-group{
    margin-top: 4px;
}
.device-group:first-of-type{
    margin-top: 0;
}
.sanjiao-icon{
    width: 16px;
    height: 16px;
    background: url("../../../../static/images/sanjiao.png")no-repeat center center;
    transform: rotate(180deg);
}
.sanjiao-icon-active{
    transform: rotate(270deg);
}
.device-list-wrap{
    padding-left: 16px;
}
.search-bottom-wrap{
    padding: 10px 10px;
}
.chose-all-btn{
    width: 16px;
    height: 16px;
}
.search-btm-btn{
    line-height: 20px;
    padding: 0 10px;
}
.confirm-btn,.prvious,.next,.search-btn{
    background: #42aeed;
    border-color: #42aeed;
}
.page-btn-wrap{
    margin-top: 10px;
}
.total-page{
    border: 0;
}
.prvious,.next,.page{
    padding: 0 10px;
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