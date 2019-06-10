<template>
    <div class="box">
        <home-head :tab-bar="5"></home-head>
        <div class="main">
            <div class="tab-wrap fl h100">
                <div class="tab-item-box fs-12">
                    <div class="tab-item fl active figer"><span>区域警告</span></div>
                    <div class="tab-item fl figer"><span>标注点</span></div>
                    <div class="tab-item fl figer"><span>共享风险点</span></div>
                </div>
            </div>
            <div id="map" class="map h100"></div>
        </div>
    </div>
</template>
<script>
import HomeHead from "./head"
export default {
    components: {
        HomeHead
    },
    data() {
        return {
        };
    },
    mounted(){
        this.BaiduMap()
    },
    methods:{
        BaiduMap(){
            var map = new BMap.Map("map");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.83,38.30), 11);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_SATELLITE_MAP,
                    BMAP_HYBRID_MAP
                ]}));  
            map.addControl(new BMap.NavigationControl()); 
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        },
    }
}
</script>
<style scoped>
.main{
    position: relative;
    height: 100vh;
    min-height: 460px;
}
.tab-wrap{
    width: 300px;
    border-right: 1px solid #ccc;
    background: yellow;
}
.map{
    margin-left: 300px;
    background: red;
}
.tab-item-box{
    background-color: aliceblue;
    box-shadow: inset 0 1px 0 #fff;
    padding: 4px 15px;
    border-bottom: 1px solid #ddd;
    color: #333;
    height: 40px;
    font-weight: bold;
}
</style>