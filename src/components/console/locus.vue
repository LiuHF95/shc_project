<template>
    <div>
        <div class="locus-main hvh">
            <div class="locus-head fs-12 w100 bg-f pos-r">
                <div class="head-top fs-12 pos-r">
                    <span class="font-w">轨迹回放</span>
                    <span class="device font-w">{{deviceName}}  (IMEI：{{terminalid}})</span>
                    <span class="tip">温馨提示：可查询最近6个月记录</span>
                    <!-- <div class="top-btn fr text-c figer bg-f">行车记录</div> -->
                    <div class="close-btn figer pos-a"
                    :class="{'close-down':closeBtn==1,'close-top':closeBtn==0}"
                    @click="close"></div>
                </div>
                <div class="head-bar" v-show="closeBtn==1">
                    <div class="chose-time fl">
                        <el-date-picker
                            v-model="start"
                            type="datetime"
                            placeholder="选择开始时间"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        <el-date-picker
                            v-model="end"
                            type="datetime"
                            placeholder="选择结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                    <span class="confirm dis-b fl figer" @click="getData">确定</span>
                    <div class="playback-wrap fl">
                        <span class="playBtns play dis-b fl figer" @click="dynamicLine"></span>
                        <span class="playBtns stop dis-b fl figer" @click="timeOut"></span>
                        <span class="playBtns replay dis-b fl figer" @click="replay"></span>
                        <div class="speed-wrap fl pos-r color-b figer">
                            <span class="dis-b" @click="choseSpeed">{{speed}}</span>
                            <span class="arrow dis-b pos-a" :class="{'arrow-active':showSpeed==true}"></span>
                            <ul class="speed-list-wrap pos-a bg-f text-c" v-show="showSpeed">
                                <li class="speed-list" 
                                v-for="(item,index) in speedList" :key="index"
                                @click="changeSpeed(item,index)">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 地图 -->
            <div id="baidu-map" class="baidu-map w100"
            :class="{'baidu-map-expand':closeBtn==1,'baidu-map-close':closeBtn==0}"></div>
        </div>
    </div>
</template>
<script>
import BMap from 'BMap'
import BMapLib from "BMapLib"
export default{
    data(){
        return{
            start:"",
            end:"",
            terminalid:"",
            deviceName:"",
            closeBtn:1,
            arrPoints:[],
            points:[],
            i:0,
            speed:"1倍速",
            speedList:["1倍速","1.5倍速","2倍速"],
            showSpeed:false,
            time:2500
        }
    },
    mounted(){
        this.terminalid=this.$store.state.terminalid
        this.deviceName=this.$store.state.deviceName 
        this.BaiduMap()
    },
    methods:{
        // 折叠面板
        close(){
            if(this.closeBtn==1){
                this.closeBtn=0
            }else{
                this.closeBtn=1
            }
        },
        //接收数据
        getData(){
            if(this.start==""||this.end==""||this.start==null||this.end==null){
                this.$message({
                    type: 'error',
                    message: "请选择开始时间或结束时间",
                    center: true,
                    duration:2000
                });
            }else{
                this.$http.post(this.$store.state.shcPost+'/rstl/Location/selectGpsByLocationDate.do'
                    +"?startDate="+this.start
                    +"&endDate="+this.end
                    +"&terminalid="+this.terminalid,{})
                .then(res => {
                    console.log(res.data)
                    if(res.data.length!=0){
                        this.arrPoints=res.data
                        this.replay()
                    }else{
                        this.$message({
                            type: 'error',
                            message: "该时间段内没有运动轨迹",
                            center: true,
                            duration:2000
                        });
                    }
                })
            }
        },
        // 创建地图
        BaiduMap(){
            var map = new BMap.Map("baidu-map");
            map.centerAndZoom(new BMap.Point(108.95,34.28), 5);
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_SATELLITE_MAP,
                    BMAP_HYBRID_MAP
                ]}));  
            map.addControl(new BMap.NavigationControl()); 
            map.setCurrentCity("北京");
            map.enableScrollWheelZoom(true);
            window.map = map;//将map变量存储在全局
        },
        //画折线
        driveline(points){
            // map.addOverlay(new BMap.Polyline(points, {
            //     strokeColor: "lightgreen",
            //     strokeWeight: 2,
            //     strokeOpacity: 1
            // }));
            map.addOverlay(new BMapLib.CurveLine(points, {
                strokeColor: "red",
                strokeWeight: 2,
                strokeOpacity: 1,
            }))
        },
        //根据点信息实时更新地图显示范围，让轨迹完整显示。设置新的中心点和显示级别
        setZoom(bPoints){
            var view = map.getViewport(eval(bPoints));
            var centerPoint = view.center;
            map.centerAndZoom(centerPoint, 10);
        },
        //执行方法
        dynamicLine(){
            if (this.arrPoints.length==this.i){
                this.$message({
                    type: 'success',
                    message: '轨迹回放播放完成',
                    center: true,
                    duration:1000
                }); 
            }
            if(this.arrPoints.length==this.i) return;
            var lat=this.arrPoints[this.i].latitude
            var lng=this.arrPoints[this.i].longitude
            var mpiont=new BMap.Point(lng,lat)
            this.points.push(mpiont);
            var mkr = new BMap.Marker(this.points[this.i]);
            map.addOverlay(mkr); //标点  
            // var label = new BMap.Label(this.arrPoints[this.i].longitude, {
            //     offset: new BMap.Size(20, -10)
            // });
            // label.setStyle({  //设置提示框的样式
            //     color : "#000",
            //     fontSize : "12px",
            //     backgroundColor :"#fff",
            //     border :"1px solid #ccc", 
            //     borderRadius:"4px",
            //     padding :"2px 6px",
            // });
            // mkr.setLabel(label);
            var info = new window.BMap.InfoWindow(
                "<div style='width:300px;'>"
                +"<p>速度："+this.arrPoints[this.i].speed+"KM/h</p>"
                +"<p>详细地址："+this.arrPoints[this.i].address+"</p>"
                +"</div>"
            );//悬浮提示信息
            this.addInfo(info,mkr)
            this.setZoom(this.points);
            this.driveline(this.points);
            this.i++;
            var timer=setTimeout(()=>{
                this.dynamicLine()
            },this.time);
            window.timer=timer
        },
        addInfo(info,marker){
            marker.addEventListener("click", function(e){
                var p = e.target
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
                this.openInfoWindow(info)
            })
        },
        timeOut(){
            clearTimeout(timer)
        },
        replay(){
            this.points=[]
            this.i=0
            this.BaiduMap()
            this.dynamicLine()
        },
        choseSpeed(){
            if(this.showSpeed==false){
                this.showSpeed=true
            }else{
                this.showSpeed=false
            }
        },
        changeSpeed(val,e){
            if(e==0){
                this.time=2500
            }else if(e==1){
                this.time=1500
            }else{
                this.time=500
            }
            this.speed=val
            this.showSpeed=false
        }
    }
}
</script>
<style scoped>
.head-top{
    height: 40px;
    background-image: linear-gradient(#F1F5FD, #E9F0FF);
    box-shadow: inset 0 1px 0 #fff;
    border-bottom: 1px solid #ddd;
    padding: 0 15px;
    line-height: 40px;
}
.head-bar{
    padding: 10px 15px;
    zoom:1;
    border-bottom: 1px solid #ccc;
}
.head-bar:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
}
.baidu-map{
    height:calc(100% - 124px);
}
.device{
    color: #009934;
    margin-left: 15px;
}
.tip{
    color: #F19B04;
    margin-left: 8px;
}
.top-btn{
    width: 70px;
    line-height: 26px;
    border: 1px solid #ccc;
    margin-top: 5px;
}
.confirm{
    background:#3B9CD5;
    color:#fff;
    line-height: 36px;
    padding: 0 15px;
    border-radius: 5px;
    margin-left:10px; 
}
.playback-wrap{
    margin-left: 200px;
}
.playBtns{
    width: 38px;
    height: 38px;
    border-radius: 100%;
    border: 1px solid #ccc;
    margin-left: 10px;
}
.play{
    background: url("../../../static/images/play.png") no-repeat center center;
    background-size: 20px 20px;
}
.stop{
    background: url("../../../static/images/stop.png") no-repeat center center;
    background-size: 28px 28px;
}
.replay{
    background: url("../../../static/images/replay.png") no-repeat center center;
    background-size: 20px 20px;
}
.speed-wrap {
    width: 80px;
    margin-left:20px;
    padding: 0 10px;
    line-height: 36px;
    border: 1px solid #ccc;
}
.arrow{
    width: 16px;
    height: 16px;
    background: url("../../../static/images/sanjiao.png") no-repeat;
    top: 50%;
    margin-top: -8px;
    right:10px;
    transform:rotate(270deg);
}
.speed-wrap .arrow-active{
    transform:rotate(90deg);
}
.speed-list-wrap{
    width: 80px;
    border: 1px solid #ccc;
    top: 100%;
    left: -1px;
    z-index: 10;
}
.speed-list:hover{
    color:#3B9CD5
}
.close-btn{
    width: 60px;
    height: 20px;
    left: 50%;
    margin-left: -30px;
    border: 1px solid #ccc;
    z-index: 10;
}
.close-down{
    bottom: -1px;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    background: #fff url("../../../static/images/down.png") no-repeat center center;
    background-size: 14px 6px;
}
.close-top{
    top: 40px;
    border-top: none;
    border-radius: 0 0 5px 5px;
    background: #fff url("../../../static/images/top.png") no-repeat center center;
    background-size: 14px 6px;
}
.baidu-map-expand{
    height:calc(100% - 101px);
}
.baidu-map-close{
    height:calc(100% - 40px);
}
</style>