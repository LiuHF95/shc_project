<template>
    <div class="box fs-12">
        <home-head :tab-bar="3"></home-head>
        <div class="main hvh over pos-r">
            <div class="h100 nav-left fl bg-f">
                <div class="figer new-btn" @click="createArea">新建区域</div>
                <div class="nav-list fs-12" v-for="(item,index) in areaInfo" :key="index">
                    <el-radio @change="choseArea(item)" v-model="radio" :label="index">{{item.areaName}}&nbsp;（{{item.equipmentNumber}}）</el-radio>
                    <span class="delete dis-ib fr figer" @click="deleteArea(item)"></span>
                </div>
                <div class="has-none text-c" v-if="areaInfo.length==0">暂无区域，请新建区域</div>
            </div>
            <div class="content-right h100 fl">
                <div class="map-wrap w100 h100 fl" id="all-map" :class="{'chose-map-wrap':mapSize==1}">
                </div>
                <div v-show="mapSize==1" class="fl">
                    <div id="myChart-pie" :style="{width: '400px', height: '250px'}"></div>
                    <div class="pos-r">
                        <div id="myChart-bar" :style="{width: '400px', height: '300px'}"></div>
                        <div class="pos-a change-data">
                            <span class="figer dis-ib chose-data">{{barFirst}}</span>
                            <span class="dis-ib change-icon"></span>
                            <ul class="data-list-wrap text-c pos-a bg-f">
                                <li class="data-list figer" 
                                v-for="(item,index) in barList" 
                                :key="index">{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mask-wrap pos-a w100 hvh" v-if="newChange==1">
                <div class="create-area pos-a bg-f">
                    <div class="mask-top">
                        <span class="mask-top-title">新建区域</span>
                        <span class="color-r">（*）为必填项</span>
                        <span class="close fr figer" @click="closeNewChange">X</span>
                    </div>
                    <div class="area-info-wrap">
                        <div class="ares-info-list">
                            <span class="color-r">*</span><span class="dis-ib ares-title">区域名称：</span>
                            <input class="area-info" v-model="areaName">
                        </div>
                        <div class="ares-info-list">
                            <span class="color-r">*</span><span class="dis-ib ares-title">区域半径：</span>
                            <input class="area-info" v-model="radius" disabled>
                            <span>米</span>
                        </div>
                        <div class="ares-info-list">
                            <span class="color-r">*</span><span class="dis-ib ares-title">区域中心经度：</span>
                            <input class="area-info" v-model="lat" disabled>
                        </div>
                        <div class="ares-info-list">
                            <span class="color-r">*</span><span class="dis-ib ares-title">区域中心纬度：</span>
                            <input class="area-info" v-model="lon" disabled>
                        </div>
                        <div class="save-btn color-f figer text-c" @click="saveArea">保存</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HomeHead from "./head"
import BMap from 'BMap'
export default {
    components: {
        HomeHead
    },
    data() {
        return {
            radio: "",//选择某一个区域
            areaName:"",//区域名称
            radius:"",//区域半径
            lat:"",//圆心纬度
            lon:"",//圆心经度
            newChange:0,//0不显示 1新建 2修改
            areaInfo:[],//区域信息
            pointArry:[],//所有设备当前定位点的信息
            mapSize:0,//判断地图大小 0全屏 1半屏
            styleOptions:{//画圆区域样式
                strokeColor: "red",    //边线颜色。
                fillColor: "#DDD3D1",  //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 2,       //边线的宽度，以像素为单位。
                strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                strokeStyle: "solid",  //边线的样式，solid或dashed。
            },
            barData:[],//柱状图数据
            pieData:[],//饼状图数据
            barFirst:"告警统计",
            barList:[
                {name:"告警统计",type:0},
                {name:"电量统计",type:1}
            ]
        }
    },
    mounted() {
        this.getAllGaps()//获取所有的定位点信息
        this.getAreadata()//获取区域信息
    },
    methods: {
        // 获取所有的定位点信息
        getAllGaps(){
            this.$http.post(this.$store.state.shcPost+"/rstl/RegionalStatistics/selectAllGps.do",{})
            .then((res)=>{
                var map = new BMap.Map("all-map",{enableMapClick: false}) 
                window.map = map//将map变量存储在全局
                var poi = new BMap.Point(116.307852,40.057031)
                map.centerAndZoom(poi,5)
                map.enableScrollWheelZoom()
                this.pointArry=res.data
                this.createAllMarker()
            })
        },
        // 显示所有设备的当前定位点
        createAllMarker(){
            var myIcon = new BMap.Icon("../../static/images/red.png", new BMap.Size(25, 25))
            for(var i=0;i<this.pointArry.length;i++){
                var point=new BMap.Point(this.pointArry[i].longitude,this.pointArry[i].latitude)
                var marker = new BMap.Marker(point,{icon: myIcon})
	            map.addOverlay(marker)
            }
        },
        // 新建区域
        createArea(){
            var that=this
            that.mapSize=0
            that.radio=""
            this.$message({
                type: 'info',
                message: '请点击地图上画圆工具划定区域',
                center: true,
                duration:2000
            })
            map.clearOverlays()
            that.createAllMarker()
            //画圆
            var drawingManager = new BMapLib.DrawingManager(map,{
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: true, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5,5), //偏离值
                    drawingModes: [BMAP_DRAWING_CIRCLE], //设置只显示画圆的模式
                },
                circleOptions: this.styleOptions, //圆的样式
            })
            drawingManager.addEventListener('overlaycomplete',function(e){
                drawingManager.close()//关闭画图
                that.lon=e.overlay.getCenter().lng 
                that.lat=e.overlay.getCenter().lat
                that.radius=e.overlay.getRadius().toFixed(2)
                that.newChange=1
                that.createAllMarker()
            })
        },
        // 获取区域信息
        getAreadata(){
            this.$http.post(this.$store.state.shcPost+"/rstl/RegionalStatistics/selectCircular.do",{})
            .then((res)=>{
                this.areaInfo=res.data
            })
        },
        // 选择某个区域
        choseArea(e){
            var drawInfo=""
            for(let i=0;i<e.gpsList.length;i++){
                if(drawInfo.length==0){
                    drawInfo="'"+e.gpsList[i].terminalid+"'"
                }else{
                    drawInfo=drawInfo+",'"+e.gpsList[i].terminalid+"'"
                }
            }
            this.mapSize=1
            this.getBar(drawInfo)
            this.getPie(drawInfo)
            this.drawPie()
            map.clearOverlays()
            this.createAllMarker() 
            var mPoint=new BMap.Point(e.lon,e.lat)
            map.centerAndZoom(mPoint, 10)
            var circle = new BMap.Circle(mPoint,e.radius,this.styleOptions)
            map.addOverlay(circle)
            window.circle=circle
        },
        // 获得柱状图信息
        getBar(drawInfo){
            var that=this
            var barXdata=[]
            var barYdata=[]
            // that.$http.post(that.$store.state.shcPost+"/rstl/RegionalStatistics/selectAlarmStatistics.do",
            that.$http.post(that.$store.state.shcPost+"/rstl/RegionalStatistics/selectElectricStatistics.do",
            that.$qs.stringify({
                ids:drawInfo
            })).then((res)=>{
                that.barData=res.data.arrayList
                for(var i in that.barData){
                    barXdata[i]=that.barData[i].alarm
                    barYdata[i]=that.barData[i].number
                }
                that.drawBar(barXdata,barYdata)
            })
        },
        // 画柱状图
        drawBar(barXdata,barYdata){
            var that=this
            let myChartBar = that.$echarts.init(document.getElementById('myChart-bar'))
            myChartBar.setOption({
                title: { 
                    text: '设备电量统计图:',
                    textStyle: {
                        fontSize:14,
                        fontWeight: 'bold',
                    },  
                    top:15,
                    left:10,
                },
                xAxis: {
                    // type: 'category',
                    data: barXdata,
                    axisTick: {//刻度
                        show: false//不显示刻度线
                    },
                    axisLabel: {  
                        interval: 0,  
                        formatter:function(value){  
                            var ret="";//拼接加\n返回的类目项  
                            var maxLength=0;//每项显示文字个数  
                            var valLength=value.length;//X轴类目项的文字个数 
                            if(valLength<=6){
                                maxLength=3
                            }else{
                                maxLength=4
                            }
                            var rowN=Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                            if(rowN>1){   //如果类目项的文字大于3,  
                                for (var i = 0; i < rowN; i++) {  
                                    var temp = "";//每次截取的字符串  
                                    var start = i * maxLength;//开始截取的位置  
                                    var end = start + maxLength;//结束截取的位置  
                                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                    temp = value.substring(start, end) + "\n";  
                                    ret += temp; //凭借最终的字符串  
                                }  
                                return ret;  
                            }else{  
                                return value;  
                            }  
                        }  
                    } 
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    data: barYdata,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#27D1F2',//设置柱子颜色
                        }
                    },
                    barWidth: 15//设置柱子宽度，单位为px
                }]
            })
            // 防止多次触发点击事件，则绑定之前需要清除绑定
            if(myChartBar._$handlers.click){
                myChartBar._$handlers.click.length = 0;
            }
            // 点击某一柱在左边地图显示相对应的点
            myChartBar.on('click', function (params) {
                map.clearOverlays()
                map.addOverlay(circle)
                that.createAllMarker() 
                var selectArry=that.barData[params.dataIndex].ids
                that.getLight(selectArry)
                // var selectPoints=[]
                // var myIcon = new BMap.Icon("../../static/images/yellow.png", new BMap.Size(25, 25))
                // for(var i=0;i<selectArry.length;i++){
                //     for(var j=0;j<that.pointArry.length;j++){
                //         if(that.pointArry[j].terminalid==selectArry[i].terminalid){
                //             selectPoints.push(that.pointArry[j])
                //         }
                //     }
                // }
                // for(var i=0;i<selectPoints.length;i++){
                //     var point=new BMap.Point(selectPoints[i].longitude,selectPoints[i].latitude)
                //     var marker = new BMap.Marker(point,{icon: myIcon})
                //     map.addOverlay(marker)
                // }
            })
        },
        // 获得饼状图信息
        getPie(drawInfo){
            var that=this
            var legendData=[]
            var drawPieData=[]
            that.$http.post(that.$store.state.shcPost+"/rstl/RegionalStatistics/selectOfflineOrOnline.do",
            that.$qs.stringify({
                ids:drawInfo
            })).then((res)=>{
                that.pieData=res.data.arrayList
                for(var i=0;i<that.pieData.length;i++){
                    legendData.push(that.pieData[i].alarm)
                    drawPieData.push(
                        {
                            value:that.pieData[i].number,
                            name:that.pieData[i].alarm
                        }
                    )
                }
                that.drawPie(legendData,drawPieData)
            })
        },
        // 画饼状图
        drawPie(legendData,drawPieData){
            var that=this
            let myChartPie = that.$echarts.init(document.getElementById('myChart-pie'))
            myChartPie.setOption({
                title: { 
                    text: '设备电量统计图:',
                    textStyle: {
                        fontSize:14,
                        fontWeight: 'bold',
                    },  
                    top:15,
                    left:10,
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}'
                },
                legend: {
                    orient: 'horizontal',
                    right: 10,
                    bottom:20,
                    data: legendData
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: drawPieData
                    }
                ]
            })
            // 防止多次触发点击事件，则绑定之前需要清除绑定
            if(myChartPie._$handlers.click){
                myChartPie._$handlers.click.length = 0;
            }
            // 点击某一柱在左边地图显示相对应的点
            myChartPie.on('click', function (params) {
                map.clearOverlays()
                map.addOverlay(circle)
                that.createAllMarker() 
                var selectArry=that.pieData[params.dataIndex].ids
                that.getLight(selectArry)
            })
        },
        // 点亮效果
        getLight(selectArry){
            var selectPoints=[]
            var myIcon = new BMap.Icon("../../static/images/yellow.png", new BMap.Size(25, 25))
            for(var i=0;i<selectArry.length;i++){
                for(var j=0;j<this.pointArry.length;j++){
                    if(this.pointArry[j].terminalid==selectArry[i].terminalid){
                        selectPoints.push(this.pointArry[j])
                    }
                }
            }
            for(var i=0;i<selectPoints.length;i++){
                var point=new BMap.Point(selectPoints[i].longitude,selectPoints[i].latitude)
                var marker = new BMap.Marker(point,{icon: myIcon})
                map.addOverlay(marker)
            }
        },
        // 保存新建区域
        saveArea(){
            if(this.areaName==""||this.radius==""||this.lon==""||this.lat==""){
                this.$message({
                    type: 'warning',
                    message: '必填项不能为空！',
                    center: true,
                    duration:1000
                })
            }else{
                // if(this.newChange==1){
                    this.$http.post(this.$store.state.shcPost+"/rstl/RegionalStatistics/addCircular.do",
                    this.$qs.stringify({
                        lat:this.lat,					
                        lon:this.lon,					
                        areaName:this.areaName,		    
                        radius:this.radius			
                    })).then((res)=>{
                        if(res.data==1){
                            this.$message({
                                type: 'success',
                                message: '新增区域成功',
                                center: true,
                                duration:1000
                            })
                            map.clearOverlays()
                            this.createAllMarker() 
                            this.getAreadata()
                            this.newChange=0
                            this.areaName=""
                        }else if(res.data==0){
                            this.$message({
                                type: 'warning',
                                message: '新增区域失败',
                                center: true,
                                duration:1000
                            })
                        }
                    })
                // }
            }
        },
        // 关闭新建区域
        closeNewChange(){
            this.newChange=0
            this.lon=""
            this.lat=""
            this.areaName=""
            this.radius=""
            map.clearOverlays()
            this.createAllMarker()
        },
        // 删除区域
        deleteArea(e){
            this.$confirm('是否确认删除当前区域', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$store.state.shcPost+"/rstl/RegionalStatistics/deleteCircular.do",
                this.$qs.stringify({
                    id:e.id
                })).then((res)=>{
                    if(res.data==1){
                        this.$message({
                            type: 'success',
                            message: '删除成功',
                            center: true,
                            duration:1000
                        })
                        this.radio=""
                        this.getAreadata()
                        this.getAllGaps()
                    }else if(res.data==0){
                        this.$message({
                            type: 'warning',
                            message: '删除失败',
                            center: true,
                            duration:1000
                        })
                    }
                })                
            }).catch(()=>{})
        },
    }
}
</script>
<style scoped>
.nav-left{
    width: 200px;
    border-right: 1px solid #ddd;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
}
.content-right{
    width: calc(100% - 200px);
    overflow-y: auto;
}
.chose-map-wrap{
    width: calc(100% - 400px);
    /* height: 60%; */
}
.new-btn{
    color:#42aeed;
    margin-bottom: 15px;
}
.nav-list{
    margin-bottom: 10px;
}
.delete{
    width: 16px;
    height: 16px;
    background: url(../../static/images/delete.png) no-repeat;
    display: none;
}
.nav-list:hover .delete{
    display: block;
}
.mask-wrap{
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 1001;
}
.create-area{
    width: 450px;
    height: 300px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.mask-top{
    line-height: 39px;
    border-bottom: 1px solid #ddd;
    padding: 0 15px;
    font-weight: bold;
    background: #F8F8F8;
}
.area-info-wrap{
    padding: 20px 40px;
}
.ares-info-list{
    margin-bottom: 10px;
}
.area-info{
    line-height: 32px;
    border: 1px solid #ddd;
    padding-left: 6px;
}
.ares-title{
    width: 100px;
}
.save-btn {
    background: #42aeed;
    padding: 10px 0;
    width: 80px;
}
.data-list-wrap,.change-data{
    border: 1px solid #ccc;
    width: 150px;
}
.change-data{
    top: 15px;
    right: 15px;
    height: 30px;
}
.data-list-wrap{
    border-top: 0;
    top: 29px;
    left: -1px;
}
.data-list{
    line-height: 30px;
}
.chose-data{
    line-height: 28px;
}
</style>
<style>
.el-radio__label{
    font-size: 12px!important;
}
.el-radio__inner{
    width: 12px;
    height: 12px;
}
</style>