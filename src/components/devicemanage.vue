<template>
    <div class="box" @click="windowClick">
        <!-- 固定头部 -->
        <home-head :tab-bar="1"></home-head>
        <!-- 主体 -->
        <div class="main">
            <!-- 设备管理导航栏部分 -->
            <div class="device-head color-b fs-12">
                <span class="device-head-item">北京豪斯石油装备</span>
                <span class="device-head-item"><span class="blod">账号：</span>豪斯石油</span>
                <span class="device-head-item"><span class="blod">客户类型：</span>代理商</span>
                <span class="device-head-item"><span class="blod">手机：</span></span>
                <span class="monitor dis-ib bg-f figer va-m">监控客户</span>
            </div>
            <!-- 设备管理的主体部分 -->
            <div class="device-content bg-f">
                <!-- 搜索部分 -->
                <div class="search-wrap">
                    <!-- 搜索输入部分 -->
                    <div class="search-input">
                        <!-- 基础搜索部分 -->
                        <div class="search-base">
                            <textarea class="service-imei bg-f over" 
                                :class="{'service-imei-click':IMEI==1}"
                                placeholder="请输入设备IMEI号(多个回车换行)"
                                @click="IMEIclick"
                            ></textarea>
                            <div class="imei-num bg-f fs-12" v-if="IMEI==1">IMEI计数：0</div>
                            <input placeholder="请输入">
                            <input placeholder="全部型号">
                            <span class="search dis-ib text-c color-f figer">搜索</span>
                            <span class="more dis-ib text-c color-f figer" @click="more">更多
                                <span class="carat" :class="{'more-carat':searchShow==true}"></span>
                            </span>
                            <span class="clear dis-ib text-c color-b figer bg-f">清空</span>
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
                        >{{item}}</span>
                    </div>
                </div>
                <!-- 设备详情部分 -->
                <div class="devive-details-wrap">
                    <div class="device-details-table">
                        <div class="details-table-bar">
                            <div class="details-btn fr"></div>
                        </div>
                        <div class="details-table-content">
                            <el-table :data="deviceDetails" border style="width: 100%">
                                <el-table-column prop="number" label="序号" width="110"></el-table-column>
                                <el-table-column prop="deviceName" label="设备名称" width="110"></el-table-column>
                                <el-table-column prop="IMEI" label="IMEI" width="110"></el-table-column>
                                <el-table-column prop="deviceType" label="设备类型" width="110"></el-table-column>
                                <el-table-column prop="activationTime" label="激活时间" width="110"></el-table-column>
                                <el-table-column prop="SIM" label="设备SIM卡号" width="110"></el-table-column>
                                <el-table-column prop="platformTime" label="平台到期时间" width="110"></el-table-column>
                                <el-table-column prop="clientTime" label="客户到期时间" width="110"></el-table-column>
                                <el-table-column prop="bootStatus" label="开机状态" width="110"></el-table-column>
                                <el-table-column prop="deviceGroup" label="设备分组" width="110"></el-table-column>
                                <el-table-column prop="bindClient" label="绑定客户" width="110"></el-table-column>
                                <el-table-column prop="bindTerminal" label="绑定终端" width="110"></el-table-column>
                                <el-table-column prop="saleTime" label="销售时间" width="110"></el-table-column>
                                <el-table-column prop="importTime" label="导入时间" width="110"></el-table-column>
                                <el-table-column prop="ownClient" label="所属客户" width="110"></el-table-column>
                                <el-table-column prop="clientName" label="客户名称" width="110"></el-table-column>
                                <el-table-column prop="ICCID" label="ICCID" width="110"></el-table-column>
                                <el-table-column prop="IMSI" label="IMSI" width="110"></el-table-column>
                                <el-table-column prop="driverName" label="司机名称" width="110"></el-table-column>
                                <el-table-column prop="driverPhone" label="司机电话" width="110"></el-table-column>
                                <el-table-column prop="numberPlate" label="车牌号" width="110"></el-table-column>
                                <el-table-column prop="idCard" label="身份证号" width="110"></el-table-column>
                                <el-table-column prop="SN" label="SN" width="110"></el-table-column>
                                <el-table-column prop="frameNumber" label="车架号" width="110"></el-table-column>
                                <el-table-column prop="electricMotor" label="电动机/发动机号" width="110"></el-table-column>
                                <el-table-column prop="salesman" label="业务员" width="110"></el-table-column>
                                <el-table-column prop="totalMileage" label="总里程" width="110"></el-table-column>                                
                                <el-table-column prop="" label="操作"></el-table-column>                                
                            </el-table>
                        </div>
                    </div>
                    <div class="device-btm fs-12">
                        <div class="pagination fl figer">上一页</div>
                        <div class="page-num fl color-f">1</div>
                        <div class="pagination fl figer">下一页</div>
                        <input class="fl pagination-input">
                        <div class="pagination fl figer">跳转</div>
                        <div class="select select-num fl figer" @click="select">
                            <span class="num">每页{{num}}条</span>
                            <span class="carat" :class="{'more-carat':numShow==true}"></span>
                            <ul class="select-num-list bg-f" v-show="numShow">
                                <li  class="num-item" 
                                    v-for="(item,index) in selectNum" :key="index"
                                    :class="{'active color-f': numActive==index}"
                                    @click="chosePage(item,index)"
                                >每页{{item}}条</li>
                            </ul>
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
            username: '豪斯石油',
            promptBtns: [
                "批量编辑",
                "上传图片",
                "销售",
                "设置用户到期时间",
                "导出",
                "发送指令",
                "本次查询全部发送指令",
                "设置工作模式",
                "本次查询全部设置工作模式",
                "停机",
                "本次查询全部停机",
                "开机",
                "本次查询全部开机",
                "油感设置",
                "增加播报次数",
                "查询当前播报次数",
                "移动到组",
                "禁止绑定终端",
                "允许绑定终端",
                "班次查询全部禁止绑定终端",
                "本次查询全部允许绑定终端",
                "批量导入亲情号和SOS",
                "平台充值"
                ],
            IMEI: 0,
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
            deviceDetails: [
                {
                    number: '序号',
                    deviceName: '设备名称',
                    IMEI: 'IMEI',
                    deviceType: '设备类型',
                    activationTime: '激活时间',
                    SIM: '设备SIM卡号',
                    platformTime: '平台到期时间',
                    clientTime: '客户到期时间',
                    bootStatus: '开机状态',
                    deviceGroup: '设备分组',
                    bindClient: '绑定客户',
                    bindTerminal: '绑定终端',
                    saleTime: '销售时间',
                    importTime: '导入时间',
                    ownClient: '所属客户',
                    clientName: '客户名称',
                    ICCID: 'ICCID',
                    IMSI: 'IMSI',
                    driverName: '司机名称',
                    driverPhone: '司机电话',
                    numberPlate: '车牌号',
                    idCard: '身份证号',
                    SN: 'SN',
                    frameNumber: '车架号',
                    electricMotor: '电动机/发动机号',
                    salesman: '业务员',
                    totalMileage: '总里程'
                }
            ],
            selectNum: [10,20,30,50],
            num: 10,
            numActive: 0,
            numShow: false,
        }
    },
    methods:{
        IMEIclick(){
            console.log(this.IMEI)
            if(this.IMEI==0){
                this.IMEI=1
            }
        },
        windowClick(){
            if(this.IMEI==1){
                this.IMEI=0
            }
        },
        more(){
            if(this.searchShow==false){
                this.searchShow=true
            }else{
                this.searchShow=false
            }
        },
        select(){
            if(this.numShow==true){
                this.numShow=false
            }else{
                this.numShow=true
            }
        },
        chosePage(value,e){
            this.num=value
            this.numActive=e
        }
    }
}
  </script>
<style scoped>
.main{
    padding-top: 60px;
}
/* 设备管理导航栏部分 */
.device-head{
    background-color: aliceblue;
    background-image: linear-gradient(#F1F5FD, #E9F0FF);
    box-shadow: inset 0 1px 0 #fff;
    padding: 4px 15px;
    border-bottom: 1px solid #ddd;
    height: 36px;
    line-height: 28px;
}
.device-head-item{
    margin-right: 15px;
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
.search-wrap,.search-input{
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
.search{
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
    /* padding-left: 10px; */
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
}
.prompt{
    margin: 6px 5px 6px 0;
}
/* 设备详情部分 */
.devive-details-wrap{
    min-height: 500px;
}
.details-table-bar{
    width: 100%;
    height: 48px;
    background: red;
}
.details-btn{
    margin-right: 15px;
    margin-top: 8px;
}
.device-btm{
    margin: 10px auto;
    zoom:1;
    line-height: 30px;
    width: 360px;
}
.device-btm:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
}
.device-btm>*{
    height: 30px;
    margin-right: 10px;
}
.select-num {
    width: 78px;
    margin-right: 0;
}
.num{
    padding-left: 5px;
}
.select-num-list{
    position: absolute;
    top:-125px;
    left: -1px;
    width: 78px;
    text-align: center;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 10;
}
.num-item{
    border-top: 1px solid #ccc;
}
.num-item:hover{
    background: #42AEED;
    color: #fff;
}
.active{
    background: #42AEED;
}
.pagination{
    padding: 0 10px;
    border: 1px solid #ccc;
}
.page-num{
    width: 30px;
    background: #42AEED;
    text-align: center;
}
.pagination-input{
    text-align: center;
    width: 40px;
    padding-left: 0;
}
</style>
<style>
.el-input{
    font-size: 12px!important;
    height: 30px!important;
}
.el-select-dropdown__item{
    font-size: 12px!important;
}
.el-input__inner{
    height: 28px!important;
    /* line-height: 28px!important; */
    border-radius: 0!important;
    border: none!important;
}
.el-select-dropdown{
    margin-top: 4px!important;
}
.el-input__icon{
    line-height: 10px !important;
}
</style>
  