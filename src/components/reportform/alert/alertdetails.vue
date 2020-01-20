<template>
    <div class="box h100">
        <div class="alert-overview-wrap h100 w100 fa-12" ref="wrap">
            <div class="alert-overview-top">
                <div class="time-wrap">
                    <div class="dis-ib">
                        <span>告警时间：</span>
                        <el-date-picker
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="alertStartTime"
                            placeholder="选择开始时间">
                        </el-date-picker>
                        <el-date-picker
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="alertEndTime"
                            placeholder="选择结束时间">
                        </el-date-picker>
                    </div>
                    <div class="dis-ib position-time">
                        <span>定位时间：</span>
                        <el-date-picker
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="posStartTime"
                            placeholder="选择开始时间">
                        </el-date-picker>
                        <el-date-picker
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="posEndTime"
                            placeholder="选择结束时间">
                        </el-date-picker>
                    </div>
                </div>
                <el-select v-model="status" placeholder="请选择" @change="choseStatus">
                    <el-option
                        v-for="(item,index) in statusList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
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
                <div class="easy-btn-wrap">
                    <span class="easy-btns dis-ib figer" 
                    v-for="(item,index) in easyBtns" :key="index"
                    @click="choseEasy(index)">{{item}}</span>
                </div>  
                <!-- :height="tableHeight" -->
                <el-table :header-cell-style="rowClass" :data="tableData" border style="width: 100%">
                    <el-table-column type="selection" fixed width="35"></el-table-column>
                    <el-table-column prop="device_name" align="center" fixed label="设备名称" width="120"></el-table-column>
                    <el-table-column prop="terminalid" align="center" label="IMEI" width="140"></el-table-column>
                    <el-table-column prop="alarm" align="center" label="报警信息" width="240"></el-table-column>
                    <el-table-column prop="alarm_time" align="center" label="报警时间" width="150"></el-table-column>
                    <el-table-column align="center" label="已读状态" width="80">
                        <template slot-scope="scope">
                            <span class="color-r" v-if="scope.row.read_type==0">未读</span>
                            <span v-if="scope.row.read_type==1">已读</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="处理状态" width="80">
                        <template slot-scope="scope">
                            <span class="color-r" v-if="scope.row.handle_type==0">未处理</span>
                            <span v-if="scope.row.handle_type==1">已处理</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="processing_contents" align="center" label="处理内容"></el-table-column>
                    <el-table-column prop="handler" align="center" label="处理者"></el-table-column>
                    <el-table-column prop="processing_time" align="center" label="处理时间"></el-table-column>
                </el-table>
            </div>
            <div class="page-btn-wrap text-c">
                <span class=" dis-ib page-btns prvious color-f figer" @click="prvious">上一页</span>
                <span class=" dis-ib page-btns page">{{page}}</span>
                <span class=" dis-ib page-btns next color-f figer" @click="next">下一页</span>
                <span class=" dis-ib page-btns total-page">共{{totalPage}}页</span>
            </div>
        </div>
        <div class="mask pos-a w100 hvh" v-show="showAlertType">
            <div class="alert-type-wrap bg-f pos-a">
                <div class="type-top pos-r">
                    <span class="type-top-word dis-ib">选择告警类型</span>
                    <span class="close dis-ib pos-a figer" @click="close">X</span>
                </div>
                <div class="type-list-wrap">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="typeCheckAll" @change="handleCheckAll">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedTypes" @change="handleCheckOne">
                        <el-checkbox class="type-list" v-for="item in alertType" :label="item.alarm_type" :key="item.alarm_type">{{item.alarm}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="type-btn-wrap over">
                    <span class="type-btns dis-ib figer fr" @click="close">取消</span>
                    <span class="type-btns dis-ib figer fr save color-f" @click="save">保存</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            tableHeight:"",
            alertStartTime:"",//告警开始时间
            alertEndTime:"",//告警结束时间
            posStartTime:"",//定位开始时间
            posEndTime:"",//定位结束时间
            statusList:[
                {
                    value: 2,
                    label: '全部'
                },{
                    value: 0,
                    label: '未读'
                },{
                    value: 1,
                    label: '已读'
                }
            ],//已读状态
            status:"全部",//已读状态为全部
            whichStatus:2,//已读状态为全部
            IMEI:"",//输入的IMEI
            IMEIs:"",//处理加引号后的IMEI，接口传
            page:1,//第几页
            totalPage:0,//总页数
            tableData:[],//告警信息
            deviceArry:[],//分组及分组下的设备信息
            showGroup:false,//是否展示分组
            showWhichGroup:0,//展开某个分组
            easyBtns:["全部标记已读","标记已读","全部处理","处理","选择告警类型"],//快捷键
            showAlertType:false,//选择报警类型
            alertType:[],//告警类型列表
            typeCheckAll: false,
            checkedTypes: [],
            isIndeterminate: true
        }
    },
    mounted(){
        // this.tableHeight=this.$refs.wrap.offsetHeight - 172
        this.getData()
    },
    methods:{
        // 选择读写状态
        choseStatus(e){
            this.whichStatus=e
        },
        // 获取告警列表
        getData(){
            this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/selecAllPracticalAlarm.do",
            this.$qs.stringify({
                ids:this.IMEIs,						
                alarmStartdate:this.alertStartTime,		
                alarmEnddate:this.alertEndTime,													
                locationStartdate:this.posStartTime,		
                locationEnddate:this.posEndTime,
                read_type:this.whichStatus,							
                page:this.page,					
                rows:10,												
            })).then((res)=>{
                this.tableData=res.data.alarm
                this.totalPage=Math.ceil(res.data.total/10) 
            })
        },
        // 选择告警时间、定位时间及输入IMEI查询告警列表
        search(){
            this.IMEIs=""
            var reg=/^[0-9,]+$/
            if((this.alertStartTime!=""&&this.alertEndTime=="")||(this.alertStartTime==""&&this.alertEndTime!="")){
                this.$message({
                    type: 'warning',
                    message: '告警时间开始和结束不能有空！',
                    center: true,
                    duration:1500
                })
            }else if((this.posStartTime!=""&&this.posEndTime=="")||(this.posStartTime==""&&this.posEndTime!="")){
                this.$message({
                    type: 'warning',
                    message: '定位时间开始和结束不能有空！',
                    center: true,
                    duration:1500
                })
            }else if((!reg.test(this.IMEI))&&(this.IMEI.length!=0)){
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
        // 表头样式
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
        // 选择快捷键
        choseEasy(e){
            if(e==4){
                this.checkedTypes=[]
                this.showAlertType=true
                this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/selectAlarmType.do",{})
                .then((res)=>{
                    this.alertType=res.data
                    for(var i=0;i<this.alertType.length;i++){
                        if(this.alertType[i].type==1){
                            this.checkedTypes.push(this.alertType[i].alarm_type)
                        }
                    }
                    if(this.checkedTypes.length==this.alertType.length){
                        this.typeCheckAll =  true;
                        this.isIndeterminate = false;
                    }
                })
            }
        },
        handleCheckAll(val) {
            this.typeCheckAll =  !!this.typeCheckAll;
            let checked = this.alertType.map(function(item){return item.alarm_type;});
            this.checkedTypes = this.typeCheckAll ? checked : [];
            this.isIndeterminate = false;
        },
        handleCheckOne(value) {
            let checkedCount = value.length;
            this.typeCheckAll = checkedCount === this.alertType.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.alertType.length;
        },
        // 关闭选择告警类型
        close(){
            this.showAlertType=false
        },
        save(){
            var saveArry=[]
            var ids=""
            for(var i=0;i<this.checkedTypes.length;i++){
                for(var j=0;j<this.alertType.length;j++){
                    if(this.checkedTypes[i]==this.alertType[j].alarm_type){
                        saveArry.push(this.alertType[j])
                    }
                }
            }
            for(var i=0;i<saveArry.length;i++){
                if(ids.length==0){
                    ids="'"+saveArry[i].id+"'"
                }else{
                    ids=ids+",'"+saveArry[i].id+"'"
                }
            }
            this.$http.post(this.$store.state.shcPost+"/rstl/Alarm/updateAlarmType.do",
            this.$qs.stringify({
                ids:ids
            })).then((res)=>{
                if(res.data==0){
                    this.$message({
                        type: 'warning',
                        message: '保存失败',
                        center: true,
                        duration:1500
                    })
                }else if(res.data>0){
                    this.$message({
                        type: 'success',
                        message: '保存成功',
                        center: true,
                        duration:1500
                    })
                    this.getData()
                    this.showAlertType=false
                }
            })
        },
    }
}
</script>
<style scoped>
.alert-overview-top{
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}
.time-wrap{
    margin-bottom: 5px;
}
.position-time,.search{
    margin-left: 10px;
}
.search,.search-wrap{
    border-radius: 4px;
}
.search-input,.search-btn,.page-btns{
    line-height: 28px;
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
.page-btns,.device-wrap,.search,.search-wrap,.search-btm-btn{
    border: 1px solid #ddd;
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

/* 快捷键 */
.easy-btn-wrap{
    padding: 5px 15px;
}
.easy-btns{
    line-height: 22px;
    padding: 0 10px;
    border: 1px solid #ddd;
    margin-right: 8px;
}

/* mask */
.mask{
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 10001;
}
.alert-type-wrap{
    width: 540px;
    height: 380px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.type-top{
    font-weight: bold;
    background: #F8F8F8;
    padding: 0 15px;
}
.type-top-word{
    line-height: 40px;
}
.close{
    right: 15px;
    top: 13px;
}
.type-list-wrap{
    height: 300px;
    overflow-y: auto;
    padding: 15px ;
}
.type-list{
    width: 43%;
}
.type-btn-wrap{
    padding: 0 15px;
}
.type-btns{
    line-height: 28px;
    border: 1px solid #ddd;
    padding: 0 15px;
}
.save{
    background: #42aeed;
    border-color: #42aeed;
    margin-right: 10px;
}
</style>
<style>
.el-input__inner{
    height: 30px;
}
.el-input__icon{
    line-height: 30px;
}
.el-select{
    width: 100px;
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