<template>
<div class="console-main">
    <!-- 头部 -->
    <home-head :tab-bar="3"></home-head>
    <!-- 主体部分 -->
    <div class="map-wrap h100">
        <!-- 地图左边部分 -->
        <div class="map-left fl over h100">
            <!-- 地图左边用户部分 -->
            <div class="user-container fl over">
                <div class="container-title-box">
                    <span class="container-title over" title="北京豪斯石油装备(库存2/总数2)">北京豪斯石油装备(库存2/总数2)</span>
                </div>
                <div class="toggle-btn"></div>
                <div class="cover-bg"></div>
                <div class="user-content">
                    <div class="console-search over bg-f fs-12">
                        <input class="console-input fl" placeholder="请输入客户名称或账号">
                        <span class="console-search-img fl"></span>
                    </div>
                    <div class="tree-scroll-wrap over">
                        <ul class="tree-scroll">
                            <li class="tree-scroll-item over fs-12">
                                <p class="item-img fl"></p>
                                <p class="item-name fl">北京豪斯石油装备(库存2/总数2)</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 地图左边装备部分 -->
            <div class="device-container fl over">
                <div class="container-title-box fs-12">
                    <div class="device-tab-item fl active figer"><span>全部(2)</span></div>
                    <div class="device-tab-item fl figer"><span>已关注(0)</span></div>
                </div>
                <div class="toggle-btn"></div>
                <div class="cover-bg bg-f"></div>
                <div class="device-content">
                    <div class="console-search over bg-f fs-12">
                        <input class="console-input fl" placeholder="IMEI/设备名称" v-model="search">
                        <span class="console-search-img fl" @click="searchDevice"></span>
                    </div>
                    <div class="tool-bar over">
                        <span class="icon fl fs-12 figer" @click="allGroup">全部</span>
                        <span class="create fr fs-12 figer" @click="creatNew" v-if="showSearch==0">新建分组</span>
                        <!-- <span class="sort fr fs-12 figer">排序</span> -->
                    </div>
                    <ul class="status-filter over fs-12">
                        <li class="status-list fl figer" v-for="(item,index) in status" :key="index"
                            :class="{'active color-f':index == stateShow }"
                            @click = "clickToggle(index)"
                        >{{item}}</li>
                    </ul>
                    <div class="tree-scroll-wrap device-tree">
                        <ul class="tree-scroll device-scroll" v-if="showSearch==0">
                            <li class="device-scroll-item" v-for="(item,index) in group" :key="index">
                                <div class="group-name-wrap over">
                                    <input type="checkbox" class="check-box fl" 
                                    @click="checkAll(item,index)"> 
                                    <span class="tran-img dis-b fl figer" 
                                        :class="{'tran-img-active':index==groupShow}" 
                                        @click="changeGroup(item,index)"></span>
                                    <span class="dis-b fl figer group-name over-ell" 
                                        @click="changeGroup(item,index)"
                                        :title="item.name">{{item.name}}
                                    </span>
                                    ({{item.number}})
                                    <div class="change-wrap fr figer">
                                        <span class="change figer" @click="changeGroupName(item)">修改</span>
                                        <span class="delete color-r figer" @click="deleteGroup(item)">删除</span>
                                    </div>
                                </div>
                                <ul class="group-wrap-hide bor-r4" :class="{'group-wrap-active':index==groupShow}">
                                    <li class="group-item bg-f bor-r4" v-for="(val,list) in item.list" :key="list">
                                        <div class="group-item-device over">
                                            <input type="checkbox" class="check-box device-check-box fl"
                                                :value="val.terminalid" @click="checkOne()">
                                            <div class="device-img-wrap fl"></div>
                                            <div class="device-info-wrap fl fs-12">
                                                <div class="device-info-top over w100">
                                                    <div class="device-name fl">{{val.name}}</div>
                                                    <div class="offline-time fr">离线时间>8天</div>
                                                </div>
                                                <div class="device-info">设备信息</div>
                                            </div>
                                        </div>
                                        <div class="group-item-nav text-c fs-12">
                                            <span class="item-nav-list fl figer">关注</span>
                                            <span class="item-nav-list fl figer" @click="guiji(val)">轨迹</span>
                                            <span class="item-nav-list fl figer">指令</span>
                                            <span class="item-nav-list fl figer">详情</span>
                                            <span class="item-nav-list fl figer" @click="moveTo(val)">移动</span>
                                        </div>
                                    </li>
                                    <div v-show="none" class="text-c">暂无数据</div>
                                </ul>
                            </li>
                        </ul>
                        <ul class="search-device-list bor-r4" v-if="showSearch==1">
                            <li class="group-item bg-f bor-r4" v-for="(item,index) in searchGroup" :key="index"> 
                                <div class="group-item-device over">
                                    <input type="checkbox" class="check-box device-check-box fl" :value="item.terminalid" @click="checkOne()">
                                    <div class="device-img-wrap fl"></div>
                                    <div class="device-info-wrap fl fs-12">
                                        <div class="device-info-top over w100">
                                            <div class="device-name fl">{{item.name}}</div>
                                            <div class="offline-time fr">离线时间>8天</div>
                                        </div>
                                        <div class="device-info">设备信息</div>
                                    </div>
                                </div>
                                <div class="group-item-nav text-c fs-12">
                                    <span class="item-nav-list fl figer">关注</span>
                                    <span class="item-nav-list fl figer" @click="guiji(item)">轨迹</span>
                                    <span class="item-nav-list fl figer">指令</span>
                                    <span class="item-nav-list fl figer">详情</span>
                                    <span class="item-nav-list fl figer" @click="moveTo(item)">移动</span>
                                </div>
                            </li>
                            <div v-show="none" class="text-c">暂无数据</div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 地图主体部分 -->
        <div class="map-content fs-12 h100">
            <div class="map-nav-wrap w100">
                <ul class="map-nav-left fl over">
                    <li class="map-nav-list fl" v-for="(item,index) in mapNav" :key="index">
                        <span class="map-nav-list-icon" :style="{backgroundColor:item.bgColor}"></span>
                        {{item.navTitle}}(0)
                    </li>
                </ul>
                <div class="map-nav-right fr">
                    <div class="fl p-r10 map-nav-check">
                        <span class="map-check-box bor-r4 va-m dis-ib"></span>
                        <span class="map-check-word va-m dis-ib over-ell" title="显示设备名称">显示设备名称</span>
                    </div>
                    <div class="fl p-r10 map-nav-check">
                        <span class="map-check-box bor-r4 va-m dis-ib"></span>
                        <span class="map-check-word va-m dis-ib over-ell" title="地址">地址</span>
                    </div>
                </div>
            </div>
            <div id="all-map" class="all-map"></div>
        </div>
    </div>
    <!-- mask部分 -->
    <div class="mask w100 h100" v-show="maskShow"> 
        <!-- 移动分组 -->
        <div class="move-group-wrap bg-f" v-show="toGroupShow">
            <div class="close figer" @click="close">X</div>
            <div class="move-group-title">移动到分组</div>
            <ul class="move-group-name-wrap">
                <li class="group-name-list figer over-ell" 
                    v-for="(item,index) in groupNameArry" :key="index"
                    @click="toGroup(item)"
                    :title="item.name">{{item.name}}
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
      
<script>
    import HomeHead from '../head'
    import BMap from 'BMap'
    export default {
        components: {
            HomeHead
        },
        data () {
            return {
                status:["全部","在线","离线"],
                stateShow:0,
                mapNav:[
                    {bgColor:"#418F02",navTitle:"行驶"},
                    {bgColor:"#DE3B3B",navTitle:"静止"},
                    {bgColor:"#666666",navTitle:"离线"},
                ],
                group:[],
                groupShow:0,
                none:false,
                search:'',
                showSearch:0,
                searchGroup:[],
                groupName:"",
                changeName:"",
                groupId:"",
                groupNameArry:[],
                deviceArry:[],
                // idStr:"",
                // 多选和全选
                isAll:-1,
                // mask部分
                maskShow:false,
                toGroupShow:false,
            }
        },
        mounted(){
            this.BaiduMap()
            this.getGroupList()
        },
        methods:{
            // 获取分组列表
            getGroupList () {
                this.$http.post(this.$store.state.shcPost+'/rstl/Group/selectAllGroup.do',{})
                .then(res => {
                    if(res.status == 200) {
                        this.group=res.data
                    }
                })
            },
            // 全部分组
            allGroup(){
                this.showSearch=0
                this.search=""
                this.getGroupList()
            },
            // 输入搜索
            searchDevice(){
                if(this.search!=""){
                    this.showSearch=1
                    this.$http.post(this.$store.state.shcPost+'/rstl/EquipmentController/selectGroupByIdOrName.do'
                    +"?name="+this.search,{})
                        .then(res => {
                            if(res.status == 200) {
                                this.searchGroup=res.data
                            }
                    })
                } 
            },
            // 新建分组
            creatNew(){
                this.$prompt('新建分组', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then((e) => {
                    if(e.value==""||e.value==null){
                        this.$message({
                            type: 'error',
                            message: "组名不能为空",
                            center: true,
                            duration:1000
                        });
                    }else{
                        this.$http.post(this.$store.state.shcPost+'/rstl/Group/addGroup.do'+"?name="+e.value,{})
                        .then(res => {
                            console.log(res)
                            if(res.status == 200) {
                                this.getGroupList()
                                this.$message({
                                    type: 'success',
                                    message: "添加成功",
                                    center: true,
                                    duration:1000
                                });
                            }
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消添加',
                        center: true,
                        duration:1000
                    });       
                });
            },
            // 修改分组名
            changeGroupName(val){
                if(val.name=="默认组"){
                    this.$message({
                        message: "默认组不能修改",
                        type:"error",
                        center: true,
                        duration:1000
                    });
                }else{
                    this.$prompt('请出入新的分组名', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputValue:val.name
                    }).then((e) => {
                        if(val.name==e.value){
                            this.$message({
                                type: 'info',
                                message: "未修改",
                                center: true,
                                duration:1000
                            })
                        }else if(e.value==""){
                            this.$message({
                                type: 'error',
                                message: "组名不能为空",
                                center: true,
                                duration:1000
                            });
                        }else{
                            this.$http.post(this.$store.state.shcPost+'/rstl/Group/updateGroup.do'+"?id="+val.id+"&name="+e.value,{})
                            .then(res => {
                                console.log(res)
                                if(res.status == 200) {
                                    this.getGroupList()
                                    this.$message({
                                        type: 'success',
                                        message: "修改成功",
                                        center: true,
                                        duration:1000
                                    });
                                }
                            })
                        }
                    }).catch(() => {});
                }
            },
            // 删除分组
            deleteGroup(e){
                console.log(e)
                if(e.name=="默认组"){
                    this.$message({
                        message: "默认组不能删除",
                        type:"error",
                        center: true,
                        duration:1000
                    });
                }else if(e.list.length==0){
                    this.$http.post(this.$store.state.shcPost+'/rstl/Group/deleteGroup.do'+"?id="+e.id,{
                        // id:e.id
                    })
                        .then(res => {
                            if(res.status == 200) {
                                console.log(res)
                                this.getGroupList()
                                this.$message({
                                    message: "删除成功",
                                    type:"success",
                                    center: true,
                                    duration:1000
                                });
                            }
                        })
                }else{
                    this.$message({
                        message: "分组内容不为空，不能删除分组",
                        type:"error",
                        center: true,
                        duration:1000
                    });
                }
            },
            // 切换状态
            clickToggle(e){
                this.stateShow=e
            },
            // 切换展开分组
            changeGroup(val,e){
                if(this.groupShow==e){
                    this.groupShow=-1
                }else{
                    this.groupShow=e
                    if(val.list.length==0){
                        this.none=true
                    }else{
                        this.none=false
                    }
                }
            },
            // 移动到组
            moveTo(val){
                this.maskShow=true
                this.toGroupShow=true
                this.groupId=val.id
                this.$http.post(this.$store.state.shcPost+'/rstl/Group/selectAllGroupNoEqui.do',{})
                .then(res => {
                    if(res.status == 200) {
                        this.groupNameArry=res.data
                    }
                })
            },
            toGroup(val){
                this.$http.post(this.$store.state.shcPost+'/rstl/EquipmentController/moveGroupById.do'
                +"?id="+this.groupId+"&grouping="+val.id,{})
                .then(res => {
                    if(res.status == 200) {
                        this.maskShow=false
                        this.toGroupShow=false
                        this.getGroupList()
                    }
                })
            },
            close(){
                this.maskShow=false
                this.toGroupShow=false
            },
            // 全选，全不选，单选
            checkAll(val,e){
                if(this.isAll==e){
                    this.isAll=-1
                    this.BaiduMap()
                }else{
                    this.isAll=e
                    if(val.list.length!=0){
                        var ids=val.list[0].terminalid
                        for(var i=1;i<val.list.length;i++){
                            ids=ids+","+val.list[i].terminalid
                        }
                        this.$http.post(this.$store.state.shcPost+'/rstl/Location/selectGpsByIds.do'+"?ids="+ids,{})
                        .then(res => {
                            if(res.status == 200) {
                                this.deviceArry=res.data
                                this.all()
                            }
                        })
                    }
                }
            },
            checkOne(){
                var checkBoxes=document.getElementsByClassName("device-check-box")
                // this.idStr=""
                var ids=""
                for(var i=0;i<checkBoxes.length;i++){
                    if(checkBoxes[i].checked){
                        ids=ids+","+checkBoxes[i].value
                    }
                }
                ids=ids.substr(1,ids.length)
                // if(this.idStr==""){
                //     this.idStr=e.terminalid
                // }else{
                //     this.idStr=this.idStr+","+e.terminalid
                // }
                if(ids.length!=0){
                    this.$http.post(this.$store.state.shcPost+'/rstl/Location/selectGpsByIds.do'+"?ids="+ids,{})
                        .then(res => {
                            if(res.status == 200) {
                                this.deviceArry=res.data
                                if(res.data.length!=0){
                                    this.all()
                                }
                            }
                        })
                }else{
                    this.BaiduMap()
                }
            },
            // 轨迹
            guiji(e){
                this.$store.state.terminalid=e.terminalid
                this.$router.push({path:"/locus"})
            },            
            // 创建地图
            all(){
                this.BaiduMap()
                this.addMarker()
            },
            BaiduMap(){
                /**地图初始化 */
                var map = new BMap.Map("all-map");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(108.95,34.28), 5);  // 初始化地图,设置中心点坐标和地图级别
                // 添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_NORMAL_MAP,
                        BMAP_SATELLITE_MAP,
                        BMAP_HYBRID_MAP
                    ]}));  
                map.addControl(new BMap.NavigationControl()); 
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                window.map = map;//将map变量存储在全局
            },
            addMarker(){
                var markerArr=this.deviceArry
                map.centerAndZoom(new BMap.Point(markerArr[0].longitude,markerArr[0].latitude), 8);
                var point = new Array();//定义数组标注经纬信息
                var marker = new Array();//定义数组点对象信息
                var info = new Array();//定义悬浮提示信息
                //设置icon信息
                var width = 32;
                var height = 32;
                var imgSrc = "../../../static/images/marker.png"; //引入icon图片
                // var imgSrc = "/rstl/static/images/marker.png"; //引入icon图片
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width,height));//配置icon
                for(var i = 0; i < markerArr.length; i++){//遍历
                    point[i] = new window.BMap.Point(markerArr[i].longitude,markerArr[i].latitude);
                    marker[i] = new window.BMap.Marker(point[i],{icon:myIcon});//把icon和坐标添加到Marker中
                    map.addOverlay(marker[i]);
                    var label = new window.BMap.Label(markerArr[i].name,{offset: new BMap.Size(-28, 32)});
                    label.setStyle({  //设置提示框的样式
                        color : "#000",
                        fontSize : "12px",
                        backgroundColor :"#fff",
                        border :"1px solid #ccc", 
                        borderRadius:"4px",
                        padding :"2px 6px",
                        
                    });
                    marker[i].setLabel(label);
                    info[i] = new window.BMap.InfoWindow(
                        "<div style='width:300px;'>"
                            +"<p>设备："+markerArr[i].name+"</p>"
                            +"<p>IMEI："+markerArr[i].terminalid+"</p>"
                            +"<p>速度："+markerArr[i].speed+"</p>"
                            +"<p>定位时间："+markerArr[i].locationdate+"</p>"
                            +"<p>通讯时间："+markerArr[i].insertdate+"</p>"
                            +"<p>总里程："+markerArr[i].mileage+"KM</p>"
                            +"<p>详细地址："+markerArr[i].address+"</p>"
                        +"</div>"
                    );//悬浮提示信息
                    this.addInfo(info[i],marker[i])
                }
            },
            addInfo(info,marker){
                marker.addEventListener("click", function(e){
                    var p = e.target
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
                    map.centerAndZoom(point, 14);
                    this.openInfoWindow(info)
                })
            },
        },
    }
</script>
<style scoped>
.map-wrap{
    padding-top:60px;
    height:100vh;
    min-height: 460px;
}
/* 地图左边部分  */
.map-left{
    background: #fff;
    /* width: 600px; */
    width: 300px;
    transition: all .3s;
}
/* 地图左边用户部分 */
.user-container,.device-container{
    position: relative;
    width: 300px;
    height: 100%;
}
.user-container{
    border-top: 1px solid #ccc;
    display:none;
}   
.container-title-box{
    background-color: aliceblue;
    box-shadow: inset 0 1px 0 #fff;
    padding: 4px 15px;
    border-bottom: 1px solid #ddd;
    color: #333;
    height: 40px;
    font-weight: bold;
    display:none;
}
.container-title{
    display: inline-block;
    width: 150px; 
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2;
}
.toggle-btn{
    position: absolute;
    right: 10px;
    top: 9px;
    width:16px;
    height:22px;
    border:1px solid#ccc;
    background: #fff url("../../../static/images/sanjiao.png") no-repeat 50% 50%;
    background-size: 14px 14px;
    display: none;
}
.cover-bg{
    width: 40px;
    position: absolute;
    left:0;
    top:40px;
    height: 360px;
    z-index:1000;
    display: none;
}
.user-content,.device-content{
    padding:10px;
}
.console-search{
    height: 22px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    box-sizing: content-box;
    line-height: 22px;
}
.console-input,.console-search-img{
    display: block;
    height: 22px;
}
.console-input{
    padding-left: 5px;
    width: 254px;
    border-right: 1px solid #ccc;
}
.console-search-img{
    width: 24px;
    background: url("../../../static/images/consoleSearch.png") no-repeat 50% 50%;
}
.tree-scroll-wrap{
    overflow-y: auto;
    height: 209px;
}   
.tree-scroll-wrap::-webkit-scrollbar{/* 定义了滚动条整体的样式 */
    width: 8px;
}   
.tree-scroll-wrap::-webkit-scrollbar-thumb{/* 轨块部分 */
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 4px;
    background: #999;
}  
.tree-scroll-wrap::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 4px;
    background: #ccc;
}
.tree-scroll{
    padding: 10px 5px 10px 23px;
    color: #333;
}
.tree-scroll-item{
    background-color: #FFE6B0;
    border: 1px #FFB951 solid;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: 5px;
    height: 20px;
    cursor: pointer;
}
.tree-scroll-item:last-of-type{
    margin-bottom: 0;
}
.tree-scroll-item>p{
    height:20px;
}
.item-img{
    width: 16px;
    background: url("../../../static/images/tree.png") no-repeat 50% 50%;
    background-position: 0 -307px;
    margin-right: 4px;
}
/* 地图左边装备部分 */
.device-container{
    border: 1px solid #ccc;
    border-top: none;
}
.device-container>.container-title-box{
    padding-bottom: 0;
}
.device-tab-item{
    display: block;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* margin-bottom: -1px; */
    padding: 7px 15px 11px;
    color: #666;
    border-radius: 3px 3px 0 0; 
    border: 1px solid transparent;
    border-bottom: none ;  
}
.container-title-box .active{
    background: #fff;
    border-color: #ccc;
}
.device-content .console-input{
    width:252px;
}
.device-content{
    /* height: calc(100% - 40px); */
    height: 100%;
}
.device-tree{
    /* height: calc(100% - 90px); */
    height: calc(100% - 60px);
}
.device-scroll-item{
    margin-bottom: 5px;
}
.device-scroll-item:last-of-type{
    margin-bottom: 0;
}
.tool-bar{
    margin-bottom: 5px;
}
.tool-bar>span{
    display: block;
}
.sort{
    padding-right: 9px;
    margin-right: 15px;
}
.create:hover{
    color:#0270b1;
}
.status-filter {
    padding: 5px 0;
    display:none;
}
.status-list{
    padding: 0 10px;
    line-height: 22px;
    border:1px solid #ccc;
}
.status-list:nth-of-type(2){
    border-left: 0;
    border-right: 0;
}
.status-filter>.active{
    background-color: #42aeed;
    border-color: #42aeed;
}
/* 分组部分 */
.device-scroll{
    padding:0;
}
.group-name-wrap{
    margin-bottom: 5px;
    line-height: 20px;
}
.group-name{
    max-width: 140px;
    margin-right: 2px;
}
.check-box{
    width: 16px;
    height: 16px;
    border: 1px solid #aaa;
    margin-top: 2px;
    margin-right: 4px;
}
.tran-img{
    width:14px;
    height: 14px;
    margin-top: 3px;
    background: url("../../../static/images/sanjiao.png") no-repeat 50% 50%;
    transform:rotate(180deg);
}
.change-wrap{
    display:none;
}
.group-name-wrap:hover .change-wrap{
    display: block;
}
.change{
    color: green;
}
.group-name-wrap .tran-img-active{
    transform:rotate(270deg);
}
.device-scroll-item .group-wrap-active{
    padding: 8px;
    height:auto;
    background: rgba(213, 220, 237);
}
.group-wrap-hide{
    height: 0;
    padding: 0;
    overflow: hidden;
}
.search-device-list{
    padding: 8px;
    height:auto;
    background: rgba(213, 220, 237);
}
.group-item{
    margin-bottom: 8px;
}
.group-item:last-of-type{
    margin-bottom: 0;
}
.group-item-device{
    padding: 15px 10px;
    color: gray;
}
.device-check-box{
    margin:8px 8px 0 0; 
}
.device-img-wrap{
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background: gray;
    margin-right: 10px;
}
.device-info-wrap{
    height: 32px;
    position: relative;
    width: 168px;
}
.device-info{
    position: absolute;
    left: 0;
    bottom: 0;
}
.device-info-top{
    line-height: 16px;
}
.group-item-nav{
    border-top: 1px solid #eee;
    line-height: 27px;
    height: 27px;
}
.item-nav-list{
    display: block;
    width: 20%;
    border-right: 1px solid #eee;
}
.item-nav-list:last-of-type{
    border-right: 0;
}
.item-nav-list:hover ,.group-name-list:hover{
    color: #42aeed;
}
/* 地图主体部分 */
.map-content{
    /* margin-left: 600px; */
    margin-left: 300px;
}
.map-nav-wrap{
    padding: 0 15px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fcfcfc;
    height: 41px;
    display:none;
}
.map-nav-left{
    padding-top: 9px;
}
.map-nav-list{
    padding: 5px 10px 5px 0;
}
.map-nav-list-icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    position: relative;
    border-radius: 50% 50% 0 50%;
    transform: rotate(45deg);
}
.map-nav-list-icon:before{
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6px;
    height: 6px;
    margin-top: -3px;
    margin-left: -3px;
    border-radius: 50%;
    background-color: #fff;
}
.map-nav-right{
    padding-top: 9px;
    zoom:1;
}
.map-nav-right:after{
    content:"";
    display:block;
    clear:both;
    visibility:hidden;
    height:0
}
.map-nav-check{
    line-height: 16px;
}
.map-check-word{
    max-width: 51px;
}
.map-check-box{
    width: 16px;
    height: 16px;
    border: 1px solid #aaa;
    margin-right: 2px;
}
/* 地图 */
.all-map{
    /* height: calc(100% - 41px); */
    height: 100%;
}
/* mask部分 */
.mask{
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,0.2);
    z-index: 10001;
}
.move-group-wrap{
    width: 400px;
    height: 250px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    padding: 10px;
}
.move-group-title{
    font-size: 22px;
}
.close{
    font-size: 24px;
    position: absolute;
    top: 10px;
    right:15px;
}
.move-group-name-wrap{
    padding: 10px;
    height: calc(100% - 40px);
    overflow-y: auto;
}
.group-name-list {
    font-size: 16px;
    margin-bottom: 10px;
    max-width: 300px;
}
.group-name-list:last-of-type{
    margin-bottom: 0;
}
</style>
      