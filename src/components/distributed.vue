<template>
    <div class="box">
        <home-head :tab-bar="3"></home-head>
        <div class="main hvh">
            <div class="distributed-head">
                <div class="title fl">设备分布图</div>
                <ul class="fr over fs-16">
                    <li class="title-list fl">总共：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">在线：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">离线：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">未激活：<span class="color-r">0</span>台</li>
                </ul>
            </div>
            <div class="map-wrap" id="all-map">
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
        };
    },
    mounted() {
        this.BaiduMap()
    },
    methods: {
        BaiduMap(){
            var map = new BMap.Map("all-map");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.46,39.92),6);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
            map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
            // map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            window.map = map;//将map变量存储在全局
        },
    }
}
</script>

<style scoped>
.distributed-head{
    background-color: aliceblue;
    background-image: linear-gradient(#F1F5FD, #E9F0FF);
    box-shadow: inset 0 1px 0 #fff;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    color: #333;
    height:47px;
    line-height: 47px;
}
.title{
    font-size: 18px;
    font-weight: 500;
}
.title-list {
    margin-right: 30px;
    color:#666;
}
.title-list :last-of-type{
    margin-right: 0;
}
.map-wrap{
    height: calc(100% - 47px);
    background: yellow;
}
</style>