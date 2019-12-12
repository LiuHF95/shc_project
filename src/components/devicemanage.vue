<template>
    <div class="box pos-r fs-12">
        <!-- 固定头部 -->
        <home-head :tab-bar="1"></home-head>
        <!-- 主体 -->
        <div class="main hvh">
            <!-- 设备管理的主体部分 -->
            <div class="device-content bg-f">
                <!-- 搜索部分 -->
                <div class="search-wrap">
                    <!-- 搜索输入部分 -->
                    <div class="search-input">
                        <!-- 基础搜索部分 -->
                        <div class="search-base">
                            <input class="service-imei bg-f over" v-model="terminalidinput" placeholder="请输入设备IMEI号">
                            <input v-model="name" placeholder="请输入设备名称">
                            <input v-model="equipmenttype" placeholder="全部型号">
                            <span class="search dis-ib text-c color-f figer" @click="search">搜索</span>
                            <!-- <span class="more dis-ib text-c color-f figer" @click="more">更多 -->
                                <!-- <span class="carat" :class="{'more-carat':searchShow==true}"></span> -->
                            </span>
                            <span class="clear dis-ib text-c color-b figer bg-f" @click="clearAll">清空</span>
                        </div>
                        <!-- 更多搜索部分 -->
                        <div class="search-more" v-show="searchShow">
                            <div class="search-more-item">
                                <div class="select-wrap figer">设备类别：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <input placeholder="请输入车牌号">
                                <input placeholder="请输入车架号">
                                <input placeholder="请输入SN">
                                <input placeholder="请输入SIM卡号">
                            </div>
                            <div class="search-more-item">
                                <div class="select-wrap figer">
                                    <el-select class="select select-time" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select select-time dis-ib">激活时间<span class="carat"></span></span> -->
                                </div>
                                <input placeholder="开始时间">
                                <input placeholder="结束时间">
                            </div>
                            <div class="search-more-item">
                                <div class="select-wrap figer">过期状态：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <div class="select-wrap figer">激活状态：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <div class="select-wrap figer">绑定状态：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <div class="select-wrap figer">设备类型：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <div class="select-wrap figer">设备分组：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                                <div class="select-wrap figer">是否绑定用户：
                                    <el-select class="select" v-model="value" placeholder="全部">
                                        <el-option
                                            v-for="item in deviceSort"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <span class="select dis-ib">全部<span class="carat"></span></span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 快捷按钮部分 -->
                    <div class="prompt-btns">
                        <span class="monitor prompt dis-ib bg-f figer va-m"
                        v-for="(item,index) in promptBtns" :key="index"
                        @click="getControl(index)"
                        >{{item}}</span>
                    </div>
                </div>
                <!-- 设备详情部分 -->
                <div class="devive-details-wrap">
                    <div class="device-details-table">
                        <el-table :data="deviceDetails" border style="width: 100%" 
                        @select='selectOne'
                        @selection-change="selectAll">
                            <el-table-column align="center" type="selection" width="40"></el-table-column>
                            <el-table-column align="center" prop="name" label="设备名称" width="110"></el-table-column>
                            <el-table-column align="center" prop="terminalid" label="IMEI" width="160"></el-table-column>
                            <el-table-column align="center" prop="activationtime" label="设备激活时间" width="110"></el-table-column>
                            <el-table-column align="center" prop="sim" label="设备SIM卡号" width="130"></el-table-column>
                            <el-table-column align="center" prop="platformdate" label="平台到期时间" width="110"></el-table-column>
                            <el-table-column align="center" label="开机状态" width="80">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.boottype==0">开机</span>
                                    <span v-if="scope.row.boottype==1">关机</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="groupname" label="分组名称" width="110"></el-table-column>
                            <el-table-column align="center" prop="insertdate" label="设备导入时间" width="110"></el-table-column>
                            <el-table-column align="center" prop="idcard" label="身份证号" width="190"></el-table-column>                                
                            <el-table-column align="center" prop="equipmenttype" label="设备类型" width="80"></el-table-column>                                
                            <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">详情</el-button>
                                    <el-button type="text" size="small" @click="maskShow(scope.row)">指令</el-button>
                                </template>
                            </el-table-column>                                
                        </el-table>
                    </div>
                    <div class="device-btm fs-12">
                        <div class="pagination fl figer" @click="provious">上一页</div>
                        <div class="page-num fl color-f">{{page}}</div>
                        <div class="pagination fl figer" @click="next">下一页</div>
                        <div class="count-num fl">共{{countPage}}页</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- mask框 -->
        <div class="mask-wrap pos-a w100 hvh pos-r" v-if="showMask==true">
            <div class="instruct-wrap bg-f pos-a">
                <div class="instruct-top fs-14">设备指令</div>
                <div class="close-btn fs-16 pos-a" @click="closeMask">X</div>
                <div class="instruct" v-if="showMask==true && showDetails==false">
                    <div class="device-info over" v-if="JSON.stringify(deviceInfo)!='{}'">
                        <div class="device-info-list fl">
                            <span class="info-title dis-ib">设备名称：</span>
                            <span>{{deviceInfo.name}}</span>
                        </div>
                        <div class="device-info-list fr">
                            <span class="info-title dis-ib">设备IMEI：</span>
                            <span>{{deviceInfo.terminalid}}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span class="info-title dis-ib">指令类型：</span>
                            <div class="dis-ib chose-instruct-wrap figer pos-r">
                                <div class="instruct-type pos-r" @click="choseType">
                                    {{instructType}}
                                    <div class="change-icon pos-a" :class="{'active-change':showTypeList==true}"></div>
                                </div>
                                <ul class="chose-instruct-type pos-a bg-f" v-if="showTypeList==true">
                                    <li class="instruct-type instruct-type-list" 
                                    v-for="(item,index) in instructTypeList" :key="index"
                                    :class="{'which-type':index==whichType}"
                                    @click="changeType(item,index)">{{item}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="instruct-details-wrap">
                            <div class="instruct-details">
                                <div class="instruct-details-top">
                                    <div class="details-title"> 
                                        <span class="details-title-list dis-ib figer"
                                        v-for="(item,index) in detailsTitle" :key="index"
                                        :class="{'title-active':whichDetails==index}"
                                        @click="changeDetails(index)">{{item}}</span>
                                    </div>
                                </div>
                                <div class="details-wrap">
                                    <!-- 工作模式 -->
                                    <div class="details-wrap-list" v-if="whichType==0">
                                        <div class="details-list" v-if="whichDetails==0">
                                            <!-- 省电模式 -->
                                            <span class="dis-ib details-list-title">唤醒时间：</span>
                                            <el-time-select
                                                v-model="wakeTime"
                                                :picker-options="{
                                                    start: '00:00',
                                                    step: '00:30',
                                                    end: '23:30'
                                                }"
                                                placeholder="选择时间">
                                            </el-time-select>
                                        </div>
                                        <div class="details-list" v-if="whichDetails==0">
                                            <span class="dis-ib details-list-title">上传间隔：</span>
                                            <el-select v-model="uploadTime1">
                                                <el-option
                                                  v-for="item in options"
                                                  :key="item"
                                                  :label="item"
                                                  :value="item">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <!-- 追踪模式 -->
                                        <div class="details-list" v-if="whichDetails==1">
                                            <span class="dis-ib details-list-title">上传间隔：</span>
                                            <input class="details-input" v-model="uploadTime2">
                                        </div>
                                        <div class="details-list" v-if="whichDetails==1">
                                            <span class="dis-ib details-list-title">持续时间：</span>
                                            <input class="details-input" v-model="continueTime">
                                        </div>
                                        <div class="details-list">
                                            <span class="dis-ib details-list-title">指令说明：</span>
                                            <span class="dis-ib details-list-title" v-if="whichDetails==0">省电模式</span>
                                            <span class="dis-ib details-describe" v-if="whichDetails==1">上传间隔范围（10～1800秒）持续时间（5~43200分钟）</span>
                                        </div>
                                    </div>
                                    <!-- SOS号码 -->
                                    <div class="details-wrap-list" v-if="whichType==1">
                                        <div class="details-list" v-if="whichDetails==0">
                                            <span class="dis-ib details-list-title">号码1：</span>
                                            <input class="details-input" v-model="phone1">
                                        </div>
                                        <div class="details-list" v-if="whichDetails==0">
                                            <span class="dis-ib details-list-title">号码2：</span>
                                            <input class="details-input" v-model="phone2">
                                        </div>
                                        <div class="details-list" v-if="whichDetails==0">
                                            <span class="dis-ib details-list-title">号码3：</span>
                                            <input class="details-input" v-model="phone3">
                                        </div>
                                        <div class="details-list" v-if="whichDetails==1">
                                            <span class="dis-ib details-list-title">号码：</span>
                                            <div class="dis-ib">
                                                <input type="checkbox" class="delete-check">号码1
                                                <input type="checkbox" class="delete-check">号码2
                                                <input type="checkbox" class="delete-check">号码3
                                            </div>
                                        </div>
                                        <div class="details-list">
                                            <span class="dis-ib details-list-title">指令说明：</span>
                                            <span class="dis-ib details-describe" v-if="whichDetails==0">填写手机号码用于接收报警短信以及接收SOS报警，支持3~20位数字的号码设置</span>
                                            <span class="dis-ib details-describe" v-if="whichDetails==1">删除对应的SOS号码</span>
                                        </div>
                                    </div>
                                    <!-- 拆卸报警 -->
                                    <div class="details-wrap-list" v-if="whichType==2">
                                        <div class="details-list" v-if="whichDetails==0">
                                            <span class="dis-ib details-list-title">上报方式：</span>
                                            <el-select v-model="firstMethod">
                                                <el-option
                                                  v-for="item in reportMethod"
                                                  :key="item"
                                                  :label="item"
                                                  :value="item">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="details-list" v-if="whichDetails==1">
                                            <span class="dis-ib details-list-title">指令说明：</span>
                                            <span class="dis-ib details-describe">关闭摘除报警</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="send-btn color-f figer text-c" @click="sendInstruct">发送指令</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HomeHead from './head'
export default {
    components: {
        HomeHead
    },
    data () {
        return {
            promptBtns: ["开机","全部开机","关机","全部关机","发送指令"],//快捷指令
            searchShow: false,
            deviceSort: [{
                    value: '选项1',
                    label: '全部'
                },{
                    value: '选项2',
                    label: '汽车'
                },{
                    value: '选项3',
                    label: '摩托'
                },{
                    value: '选项4',
                    label: '动物'
                },{
                    value: '选项5',
                    label: '人'
                },{
                    value: '选项6',
                    label: '导游机'
                },{
                    value: '选项7',
                    label: '无人机'
                },{
                    value: '选项8',
                    label: '其他'
            }],
            value: '选项1',
            
            promptBtns: ["开机","全部开机","关机","全部关机","发送指令"],//快捷指令
            deviceDetails: [],//设备详情
            countPage:0,//总页数
            page:1,//第几页
            name:"",//搜索时设备名称
            terminalidinput:"",//搜索时设备IMEI
            equipmenttype:"",//搜索时设备类型
            selectArry:[],//多选数组
            showMask:false,//显示mask
            deviceInfo:{},//单个设备信息
            instructType:"工作模式",//当前指令类型
            instructTypeList:["工作模式","SOS号码","拆卸报警"],//所有指令类型
            instructList:[
                ["工作模式","追踪模式"],
                ["SOS设置","删除SOS号码"],
                ["拆卸报警设置","关闭拆卸报警设置"],
            ],//不同指令类型下的指令模式数组
            whichType:0,//哪一个指令类型
            showTypeList:false,//是否显示指令类型列表
            detailsTitle:[],//指令模式数组
            whichDetails:0,//哪一种指令模式
            terminalid:"",//发送指令时设备IMEI
            wakeTime:"11:00",//唤醒时间
            uploadTime1:1,//上传间隔（省电）
            options: [1,2,3,4,5,6,8,12,14],//省电模式上传间隔数组
            uploadTime2:"",//上传间隔（追踪）
            continueTime:"",//持续时间
            phone1:"",//电话号码1
            phone2:"",//电话号码2
            phone3:"",//电话号码3
            serial1:"",//电话号码1的序号
            serial2:"",//电话号码2的序号
            serial3:"",//电话号码3的序号
            firstMethod:"平台+电话",//上报方式
            reportMethod:["仅GPRS","SMS+GPRS","GPRS+SMS+电话","平台+电话"],//上报方式数组
            // 设备详情部分
            showDetails:false
        }
    },
    mounted(){
        this.detailsTitle=this.instructList[0]
        this.getData()
    },
    methods:{
        // more(){
        //     if(this.searchShow==false){
        //         this.searchShow=true
        //     }else{
        //         this.searchShow=false
        //     }
        // },

        //查询设备
        getData(){
            this.$http.post(this.$store.state.shcPost+"/rstl/EquipmentController/selectAllEquipmentOrByLikeId.do",
            this.$qs.stringify({
                name:this.name, 
                Terminalid:this.terminalidinput, 
                equipmenttype:this.equipmenttype,
                page:this.page,
                Rows:10
            })).then((res)=>{
                this.countPage=Math.ceil(res.data.count/10)
                this.deviceDetails=res.data.equipment
            })
        },
        search(){
            this.page=1
            this.getData()
        },
        // 清空
        clearAll(){
            this.name="",
            this.terminalid="",
            this.equipmenttype=""
        },
        // 上一页
        provious(){
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
            if(this.page>=this.countPage){
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
        // 单个选择
        selectOne(rows, row) {
            this.selectArry=rows
        },
        //全选 
        selectAll(val){
            this.selectArry=val
        },
        // 快捷指令
        getControl(e){
            if(e==0 || e==2 || e==4){
                if(this.selectArry.length!=0){//开机
                    var ids=""
                    for(var i=0;i<this.selectArry.length;i++){
                        if(ids.length==0){
                            ids="'"+this.selectArry[i].id+"'"
                        }else{
                            ids=ids+",'"+this.selectArry[i].id+"'"
                        }
                    }
                    if(e==0){
                        this.$confirm('确认开机？', '提示', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.post(this.$store.state.shcPost+"/rstl/EquipmentController/updateBootUpEquipmentByIds.do",
                            this.$qs.stringify({
                                ids:ids
                            })).then((res)=>{
                                if(res.data>=1){
                                    this.getData()
                                    this.$message({
                                        type: 'success',
                                        message: '开机成功!',
                                        center: true,
                                        duration:1000
                                    })
                                }else if(res.data==0){
                                    this.$message({
                                        type: 'warning',
                                        message: '开机失败!',
                                        center: true,
                                        duration:1000
                                    })
                                }
                            })
                        }).catch(()=>{})
                    }else if(e==2){//关机
                        this.$confirm('确认关机？', '提示', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.post(this.$store.state.shcPost+"/rstl/EquipmentController/updateShutDownEquipmentByIds.do",
                            this.$qs.stringify({
                                ids:ids
                            })).then((res)=>{
                                if(res.data>=1){
                                    this.getData()
                                    this.$message({
                                        type: 'success',
                                        message: '关机成功!',  
                                        center: true,
                                        duration:1000
                                    })
                                }else if(res.data==0){
                                    this.$message({
                                        type: 'warning',
                                        message: '关机失败!',
                                        center: true,
                                        duration:1000
                                    })
                                }
                            })
                        }).catch(()=>{})
                    }else if(e==4){
                        this.showMask=true
                        for(var i=0;i<this.selectArry.length;i++){
                            if(this.terminalid.length==0){
                                this.terminalid=this.selectArry[i].terminalid
                            }else{
                                this.terminalid=this.terminalid+","+this.selectArry[i].terminalid
                            }
                        }
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请选择设备',
                        center: true,
                        duration:1000
                    })
                }
            }else if(e==1){//全部开机
                this.$confirm('确认全部开机？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.$store.state.shcPost+"/rstl/EquipmentController/updateAllBootUpEquipment.do",
                    this.$qs.stringify({
                        name:this.name, 
                        Terminalid:this.terminalid, 
                        equipmenttype:this.equipmenttype,
                    })).then((res)=>{
                        if(res.data>=1){
                            this.getData()
                            this.$message({
                                type: 'success',
                                message: '全部开机成功!',  
                                center: true,
                                duration:1000
                            })
                        }else if(res.data==0){
                            this.$message({
                                type: 'warning',
                                message: '全部开机失败!',
                                center: true,
                                duration:1000
                            })
                        }
                    })
                }).catch(()=>{})
            }else if(e==3){//全部关机
                this.$confirm('确认全部关机？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.$store.state.shcPost+"/rstl/EquipmentController/updateAllShutDownEquipment.do",
                    this.$qs.stringify({
                        name:this.name, 
                        Terminalid:this.terminalid, 
                        equipmenttype:this.equipmenttype,
                    })).then((res)=>{
                        if(res.data>=1){
                            this.getData()
                            this.$message({
                                type: 'success',
                                message: '全部关机成功!',  
                                center: true,
                                duration:1000
                            })
                        }else if(res.data==0){
                            this.$message({
                                type: 'warning',
                                message: '全部关机失败!',
                                center: true,
                                duration:1000
                            })
                        }
                    })
                }).catch(()=>{})
            }
        },
        // 显示mask
        maskShow(e){
            this.deviceInfo=e
            this.terminalid=e.terminalid
            this.showMask=true
        },
        // 关闭mask
        closeMask(){
            this.showMask=false
            // 恢复指令类型部分
            this.deviceInfo={}
            this.instructType="工作模式"
            this.whichType=0
            this.detailsTitle=this.instructList[0]
            this.whichDetails=0
            this.terminalid=""
            this.showTypeList=false
        },
        // 选择指令类型
        choseType(){
            if(this.showTypeList==false){
                this.showTypeList=true
            }else if(this.showTypeList==true){
                this.showTypeList=false
            }
        },
        // 改变类型
        changeType(val,e){
            this.instructType=val
            this.whichType=e
            this.detailsTitle=this.instructList[this.whichType]
            this.whichDetails=0
            this.showTypeList=false
        },
        // 选择类型详情
        changeDetails(e){
            this.whichDetails=e
        },
        // 发送指令
        sendInstruct(){
            this.$confirm('当前设备不在线，是否缓存指令?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.whichType==0){
                    if(this.whichDetails==0){
                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/sendOutInstructionsTwo.do",
                        this.$qs.stringify({
                            terminalid: this.terminalid,
                            t1: this.wakeTime,
                            t2: this.uploadTime1,
                            type: 2
                        })).then((res)=>{
                            if(res.data==0){
                                this.$message({
                                    type: 'warning',
                                    message: '缓存失败',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data>=1){
                                this.$message({
                                    type: 'success',
                                    message: '缓存成功',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data==-1){
                                this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updateOutInstructionsTwo.do",
                                    this.$qs.stringify({
                                        terminalid: this.terminalid,
                                        t1: this.wakeTime,
                                        t2: this.uploadTime1,
                                        type: 2
                                    })).then((res)=>{
                                        if(res.data==0){
                                            this.$message({
                                                type: 'warning',
                                                message: '缓存失败',
                                                center: true,
                                                duration:1000
                                            })
                                        }else if(res.data>=1){
                                            this.$message({
                                                type: 'success',
                                                message: '缓存成功',
                                                center: true,
                                                duration:1000
                                            })
                                        }
                                    })
                                }).catch(()=>{})
                            }
                        })
                    }else if(this.whichDetails==1){
                        if(this.uploadTime2==""||this.continueTime==""){
                            this.$message({
                                type: 'warning',
                                message: '上传间隔或持续时间不能为空',
                                center: true,
                                duration:1000
                            })
                        }else if(10<=this.uploadTime2<=1800 || 5<=this.continueTime<=43200){
                            this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/sendOutInstructionsOne.do",
                            this.$qs.stringify({
                                terminalid: this.terminalid, 
                                t1: this.uploadTime2,
                                t2: this.continueTime,
                                type: 1
                            })).then((res)=>{
                                if(res.data==0){
                                    this.$message({
                                        type: 'warning',
                                        message: '缓存失败',
                                        center: true,
                                        duration:1000
                                    })
                                }else if(res.data>=1){
                                    this.$message({
                                        type: 'success',
                                        message: '缓存成功',
                                        center: true,
                                        duration:1000
                                    })
                                }else if(res.data==-1){
                                    this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                        confirmButtonText: '确认',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updateOutInstructionsOne.do",
                                        this.$qs.stringify({
                                            terminalid: this.terminalid, 
                                            t1: this.uploadTime2,
                                            t2: this.continueTime,
                                            type: 1
                                        })).then((res)=>{
                                            if(res.data==0){
                                                this.$message({
                                                    type: 'warning',
                                                    message: '缓存失败',
                                                    center: true,
                                                    duration:1000
                                                })
                                            }else if(res.data>=1){
                                                this.$message({
                                                    type: 'success',
                                                    message: '缓存成功',
                                                    center: true,
                                                    duration:1000
                                                })
                                            }
                                        })
                                    }).catch(()=>{})
                                }
                            })
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '时间格式不正确',
                                center: true,
                                duration:1000
                            })
                        }
                    }
                }else if(this.whichType==1){
                    if(this.whichDetails==0){
                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/sendOutInstructionsTwo.do",
                        this.$qs.stringify({
                            terminalid: this.terminalid,
                            phone1: this.phone1,
                            phone2: this.phone2,
                            phone3: this.phone3,
                            type: 3
                        })).then((res)=>{
                            if(res.data==0){
                                this.$message({
                                    type: 'warning',
                                    message: '缓存失败',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data>=1){
                                this.$message({
                                    type: 'success',
                                    message: '缓存成功',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data==-1){
                                this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updateSOSInstructions.do",
                                    this.$qs.stringify({
                                        terminalid: this.terminalid,
                                        phone1: this.phone1,
                                        phone2: this.phone2,
                                        phone3: this.phone3,
                                        type: 3
                                    })).then((res)=>{
                                        if(res.data==0){
                                            this.$message({
                                                type: 'warning',
                                                message: '缓存失败',
                                                center: true,
                                                duration:1000
                                            })
                                        }else if(res.data>=1){
                                            this.$message({
                                                type: 'success',
                                                message: '缓存成功',
                                                center: true,
                                                duration:1000
                                            })
                                        }
                                    })
                                }).catch(()=>{})
                            }
                        })
                    }else if(this.whichDetails==1){
                        var checkBox=document.getElementsByClassName("delete-check")
                        if(checkBox[0].checked==true){
                            this.serial1=1
                        }else{
                            this.serial1=""
                        }
                        if(checkBox[1].checked==true){
                            this.serial2=2
                        }else{
                            this.serial2=""
                        }
                        if(checkBox[2].checked==true){
                            this.serial3=3
                        }else{
                            this.serial3=""
                        }
                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/deleteSOSInstructions.do",
                        this.$qs.stringify({
                            terminalid:this.terminalid,
                            Serial1:this.serial1,
                            Serial2:this.serial2,
                            Serial3:this.serial3,
                            type:4
                        })).then((res)=>{
                            if(res.data==0){
                                this.$message({
                                    type: 'warning',
                                    message: '缓存失败',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data>=1){
                                this.$message({
                                    type: 'success',
                                    message: '缓存成功',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data==-1){
                                this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updateDeleteSOSInstructions.do",
                                    this.$qs.stringify({
                                        terminalid:this.terminalid,
                                        Serial1:this.serial1,
                                        Serial2:this.serial2,
                                        Serial3:this.serial3,
                                        type:4
                                    })).then((res)=>{
                                        if(res.data==0){
                                            this.$message({
                                                type: 'warning',
                                                message: '缓存失败',
                                                center: true,
                                                duration:1000
                                            })
                                        }else if(res.data>=1){
                                            this.$message({
                                                type: 'success',
                                                message: '缓存成功',
                                                center: true,
                                                duration:1000
                                            })
                                        }
                                    })
                                }).catch(()=>{})
                            }
                        })
                    }
                }else if(this.whichType==2){
                    if(this.whichDetails==0){
                        var m=0
                        for(var i=0;i<this.reportMethod.length;i++){
                            if(this.firstMethod==this.reportMethod[i]){
                                m=i
                                break;
                            }
                        }
                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/addCallThePoliceInstructionsByPhone.do",
                        this.$qs.stringify({
                            terminalid: this.terminalid,
                            A: "ON/OFF",
                            M: m,
                            type: 6
                        })).then((res)=>{
                            if(res.data==0){
                                this.$message({
                                    type: 'warning',
                                    message: '缓存失败',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data>=1){
                                this.$message({
                                    type: 'success',
                                    message: '缓存成功',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data==-1){
                                this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updateCallThePoliceInstructionsByPhone.do",
                                    this.$qs.stringify({
                                        terminalid: this.terminalid,
                                        A: "ON/OFF",
                                        M: m,
                                        type: 6
                                    })).then((res)=>{
                                        if(res.data==0){
                                            this.$message({
                                                type: 'warning',
                                                message: '缓存失败',
                                                center: true,
                                                duration:1000
                                            })
                                        }else if(res.data>=1){
                                            this.$message({
                                                type: 'success',
                                                message: '缓存成功',
                                                center: true,
                                                duration:1000
                                            })
                                        }
                                    })
                                }).catch(()=>{})
                            }
                        })
                    }else if(this.whichDetails==1){
                        this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/closeCallThePoliceInstructionsByPhone.do",
                        this.$qs.stringify({
                            terminalid: this.terminalid,
                            type: 7
                        })).then((res)=>{
                            if(res.data==0){
                                this.$message({
                                    type: 'warning',
                                    message: '缓存失败',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data>=1){
                                this.$message({
                                    type: 'success',
                                    message: '缓存成功',
                                    center: true,
                                    duration:1000
                                })
                            }else if(res.data==-1){
                                this.$confirm('指令已存在，是否覆盖指令?', '提示', {
                                    confirmButtonText: '确认',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$http.post(this.$store.state.shcPost+"/rstl/InstructionsController/updatecloseCallThePoliceInstructionsByPhone.do",
                                    this.$qs.stringify({
                                        terminalid: this.terminalid,
                                        type: 7
                                    })).then((res)=>{
                                        if(res.data==0){
                                            this.$message({
                                                type: 'warning',
                                                message: '缓存失败',
                                                center: true,
                                                duration:1000
                                            })
                                        }else if(res.data>=1){
                                            this.$message({
                                                type: 'success',
                                                message: '缓存成功',
                                                center: true,
                                                duration:1000
                                            })
                                        }
                                    })
                                }).catch(()=>{})
                            }
                        })
                    }
                }
            }).catch(()=>{})
        }
    }
}
</script>
<style scoped>
.main{
    padding-top: 60px;
    overflow: hidden;
    overflow-y: auto;
}
.monitor{
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border: 1px solid #ccc;
}
.monitor:hover,.clear:hover{
    background-color: #e6e6e6;
    border-color: #adadad;
}
/* 搜索部分 */
.search-wrap{
    border-bottom:1px solid #ccc;
}
.search-input{
    padding: 10px 15px;
}
input,textarea{
    border: 1px solid #ccc;
    padding-left:12px;
}
/* 基础搜索部分 */
.search-base{
    height:30px;
    position: relative;
    padding-left: 330px;
}
.search-base>*,.search-more-item>*{
    height: 30px;
    float: left;
    font-size: 12px;
}
.search-base>input{
    margin-right: 5px;
}
.service-imei{
    width: 325px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 6px 12px;
    line-height: 1.5;
    color: #555;
}
.service-imei-click{
    height:200px!important;
}
.imei-num{
    position: absolute;
    top: 200px;
    left: 0;
    width: 325px;
    line-height: 30px;
    padding-left: 8px;
    border: solid #ccc;
    border-width: 0 1px 1px;
    box-shadow: 0 2px 2px rgba(0,0,0,.1);
}
.search-base>span{
    line-height: 30px;
}
.search,.clear{
    width: 80px;
}
.search,.page-num{
    background: #42AEED;
}
.search:hover{
    background: #3B9CD5;
}
.more{
    position: relative;
    width: 56px;
    text-align: left;
    padding-left: 12px;
    background: #67BEF0;
}
.more:hover{
    background-color: #3B9CD5;
}
.more-carat{
    margin-top: -10px !important;
    border-top: 5px solid transparent !important;
    border-bottom: 7px solid #666 !important;
}
.clear{
    border: 1px solid #ccc;
    margin-left: 5px;
}
/* 更多搜索部分 */
.search-more-item{
    height: 40px;
    padding-top: 10px;
}
.search-more-item>*{
    margin-right: 5px;
}
.select-wrap{
    line-height: 28px;
}
.select{
    position: relative;
    width: 98px;
    border: 1px solid #ccc;
    height: 30px;
}
.select-time{
    width: 158px;
}
.carat{
    position: absolute;
    top: 50%;
    border: 5px solid transparent;
    border-top: 7px solid #666;
    border-width: 6px 4px 4px;
    margin-top: -3px;
    right: 8px;
}
/* 快捷按钮部分 */
.prompt-btns{
    padding:5px 15px;
    padding-top: 0;
}
.prompt{
    margin: 6px 5px 6px 0;
}
/* 设备详情部分 */
.device-btm{
    margin: 10px auto;
    line-height: 28px;
    height: 30px;
    width: 230px;
}
.pagination{
    padding: 0 10px;
    border: 1px solid #ccc;
}
.page-num{
    padding: 0 10px;
    border: 1px solid #42aeed;
}
.pagination,.page-num{
    margin-right: 10px;
}
/* mask框 */
.mask-wrap{
    background: rgba(0,0,0,.3);
    top: 0;
    left: 0;
    z-index: 1001;
}
.instruct-wrap{
    width: 50%;
    height: 400px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.instruct-top{
    line-height: 39px;
    border-bottom: 1px solid #eee;
    padding-left: 15px;
    background: #F8F8F8;
}
.close-btn{
    top: 12px;
    right: 15px;
    cursor: pointer;
}
.instruct{
    padding: 20px 30px 0;
}
.device-info{
    padding-right: 20px;
}
.info-title{
    width: 70px;
    line-height: 30px;
}
.chose-instruct-wrap{
    height: 30px;
}
.chose-instruct-type,.chose-instruct-wrap{
    border: 1px solid #ccc;
    width: 150px;
}
.chose-instruct-type{
    border-top: 0;
    left: -1px;
    top: 29px;
    z-index: 10;
}
.instruct-type{
    line-height: 28px;
    padding-left: 10px;
}
.which-type{
    color: #fff;
    background: #42aeed;
}
.instruct-type-list:hover{
    background: #eee;
     color: #2c3e50;
}
.change-icon{
    width: 16px;
    height: 16px;
    background: url("../../static/images/sanjiao.png") no-repeat;
    transform:rotate(90deg);
    right: 10px;
    top: 6px;
}
.active-change{
    transform:rotate(270deg);
}
.instruct-details-wrap{
    padding: 10px  0 0 74px;
}
.instruct-details{
    height: 200px;
    border: 1px solid #ccc;
}
.instruct-details-top{
    border-bottom: 1px solid #ddd;
    height: 35px;
    background: #f4f4f4;
    padding: 5px 0 0 10px;
}
.details-title-list{
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    font-weight: bold;
}
.title-active{
    border: 1px solid #ddd;
    border-bottom: 0;
    background: #fff;
}
.details-wrap{
    padding-left: 40px;
}
.details-list{
    margin-top: 10px;
}
.details-list-title{
    width: 70px;
}
.details-describe,.details-list-title{
    line-height: 24px;
}
.details-input{
    line-height: 24px;
    padding-left: 6px;
}
/* 发送按钮 */
.send-btn{
    line-height: 30px;
    width: 100px;
    background: #42aeed;
    margin-top: 10px;
}
</style>
<style>
.el-input{
    font-size: 12px!important;
    /* height: 30px!important; */
}
.el-select-dropdown__item{
    font-size: 12px!important;
}
.el-input__inner{
    height: 28px!important;
    border-radius: 0!important;
    border: none!important;
}
.el-select-dropdown{
    margin-top: 4px!important;
}
.el-input__icon{
    line-height: 10px !important;
}
.el-date-editor,.el-select{
    width: 180px!important;
    border: 1px solid #ccc;
}
.el-checkbox__label{
    font-size: 12px;
}
</style>
  