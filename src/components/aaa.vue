<template>
    <div>
        <span class="figer" @click="dynamicLine">播放</span>
        <span class="figer" @click="zanting">暂停</span>
        <span class="figer" @click="reset">重置</span>
        <div v-for="(item,index) in speed" :key="index" @click="changeSpeed(index)">{{item}}</div>
        <div id="mymap"></div>
    </div>
</template>
<script>
import BMap from "BMap"
import BMapLib from "BMapLib"
export default{
    data(){
        return{
            arrPoints:[
                {lat:22.54608, lng:113.96062}, 
                {lat:22.54402, lng:113.95819},
                {lat:22.54608, lng:113.96062}, 
                {lat:22.54624, lng:113.95852},
                {lat:22.54824, lng:113.95952},
                {lat:22.54224, lng:113.95552},
            ],
            i:0,
            points:[],
            time:500,
            speed:[1,1.5,2]
        }
    },
    mounted(){
        this.intMap()
    },
    methods:{
        intMap(){
            // 初始化
            var map = new BMap.Map("mymap"); // 创建Map实例
            map.centerAndZoom(new BMap.Point(113.953162, 22.532701), 16); // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_SATELLITE_MAP,
                    BMAP_HYBRID_MAP
                ]})); 
            map.setCurrentCity("高新园"); // 设置地图中心显示的城市 new！
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            map.addControl(new BMap.NavigationControl()); //缩放按钮
            window.map = map;//将map变量存储在全局
        },
        //画折线
        driveline(points){
            console.log(points)
            // map.addOverlay(new BMap.Polyline(points, {
            //     strokeColor: "lightgreen",
            //     strokeWeight: 2,
            //     strokeOpacity: 1,
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
            map.centerAndZoom(centerPoint, 16);
        },
        //执行方法
        dynamicLine(){
            if (this.arrPoints.length==this.i){
                this.$message({
                    type: 'success',
                    message: '轨迹回放播放完成',
                    center: true,
                    duration:2500
                }); 
            }
            if (this.arrPoints.length==this.i) return;
            var lat=this.arrPoints[this.i].lat
            var lng=this.arrPoints[this.i].lng
            var mpiont=new BMap.Point(lng,lat)
            this.points.push(mpiont);
            var mkr = new BMap.Marker(this.points[this.i]);
            map.addOverlay(mkr); //标点  
            var label = new BMap.Label(this.arrPoints[this.i].lat, {
                offset: new BMap.Size(20, -10)
            });
            mkr.setLabel(label);
            this.setZoom(this.points);
            this.driveline(this.points);
            this.i++;
            var a=setTimeout(()=>{
                this.dynamicLine()
            },this.time);
            window.a = a;//将map变量存储在全局
        },
        zanting(){
            console.log(1)
            clearTimeout(a)
        },
        reset(){
            this.points=[]
            this.i=0
            this.intMap()
            this.dynamicLine()
        },
        changeSpeed(e){
            console.log(e)
            if(e==0){
                this.time=2500
            }else if(e==1){
                this.time=1500
            }else{
                this.time=500
            }
        },
    }
}
</script>
<style scoped>
    #mymap{
        width: 100%;
        height: 400px;
    }
</style>
