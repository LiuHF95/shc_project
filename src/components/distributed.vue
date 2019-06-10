<template>
    <div class="box">
        <home-head :tab-bar="6"></home-head>
        <div class="main">
            <div class="distributed-head">
                <div class="title fl">设备分布图</div>
                <ul class="fr over fs-16">
                    <li class="title-list fl">总共：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">在线：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">离线：<span class="color-r">0</span>台</li>
                    <li class="title-list fl">未激活：<span class="color-r">0</span>台</li>
                </ul>
            </div>
            <div class="map-wrap bg-f">
                <div id="map" class="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
import HomeHead from "./head"
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
export default {
    components: {
        HomeHead
    },
    data() {
        return {
        };
    },
    mounted() {
        this.chinaConfigure();
    },
    methods: {
        chinaConfigure() {
            let chartMap = document.getElementById('map');
            let myChart = echarts.init(chartMap);
            myChart.setOption({
                roam: false,
                backgroundColor: "#fff",
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show: true,
                    min: 0,
                    max: 200,
                    text: ['高', '低'],
                    realtime: true,
                    calculable: true,
                    color: ['#FF0000', '#FFFF00']
                },
                series: [
                    {
                        name: '设备分布',
                        type: 'map',
                        map: 'china',
                        mapType: '中国',
                        roam: false,
                        zoom: 1.2,
                        itemStyle:{
                            normal:{
                                areaColor: '#ccc',
                                borderColor: '#D8D8D8',
                                label:{
                                    show:true,
                                    textStyle: {
                                        color: '#8B4513',
                                    }
                                },
                            },
                        },
                        data: [
                            {
                                "name": "北京",
                                "value": 1
                            },{
                                "name": "山东",
                                "value": 1
                            }
                        ]
                    }
                ]
            })
        }
    }
}
</script>

<style scoped>
.main{
    height: 100vh;
    min-height: 500px;
}
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
    padding: 20px;
    width: 100%;
    height: calc(100% - 47px);
}
.map{
    width:100%;
    height:100%;
}
</style>