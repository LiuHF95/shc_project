<template>
    <div class="echarts">
      <div id="allmap" :style="{height:'600px',width:'100%'}" ref="myEchart"></div>
    </div>
  </template>
  <script>
    // import BMap from "BMap"
    import echarts from "echarts";
    import '../../node_modules/echarts/map/js/china.js' 
    import '../../node_modules/echarts/map/js/world.js'
    import '../../node_modules/echarts/extension/bmap/bmap.js'
export default {
    data() {
        return {
            //时间点
            num:[],
            //option数据
            optionData:[],
            //地图对象
            map:null,
            //echarts对象
            myChart:null,
            //echarts绘制对象
            option:null,
            //坐标信息
            geoCoordMap:{
                '乌鲁木齐': [87.9236,43.5883],  
                '佛山': [112.8955,23.1097],  
                '保定': [115.0488,39.0948],  
                '兰州': [103.5901,36.3043],  
                '包头': [110.3467,41.4899],  
                '北京': [116.4551,40.2539],  
                '南京': [118.8062,31.9208], 
            },
            //地图中心点以及缩放级别等
            bmap:{
                center: [112.08, 32.68],
                zoom: 5,
                roam: true
            },
            //目标模拟数据
            targetData:[
                [{
                    name: '乌鲁木齐',
                    value: '2018-05-28T03:13:39.000Z'
                },{
                    name: '佛山',
                    value: '2018-05-28T03:13:39.000Z'
                },1],
                [{
                    name: '佛山',
                    value: '2018-05-28T03:13:39.000Z'
                }, {
                    name: '保定',
                    value: '2018-05-28T03:23:32.000Z'
                }, 1],
                [{
                    name: '保定',
                    value: '2018-05-28T03:23:32.000Z'
                }, {
                    name: '兰州',
                    value: '2018-05-28T04:13:54.000Z'
                }, 1],
                [{
                    name: '兰州',
                    value: '2018-05-28T04:13:54.000Z'
                }, {
                    name: '包头',
                    value: '2018-05-29T01:13:11.000Z'
                }, 1],
                [{
                    name: '包头',
                    value: '2018-05-29T01:13:11.000Z'
                }, {
                    name: '北京',
                    value: '2018-05-29T03:13:44.000Z'
                }, 1],
                [{
                    name: '北京',
                    value: '2018-05-29T03:13:44.000Z'
                }, {
                    name: '南京',
                    value: '2018-05-29T05:13:39.000Z'
                }, 1]
            ]
        }
      },
      mounted() {
        // this.mychart()
        this.drawMap()
      },
      methods: {
        mychart1(){
            let chartMap = document.getElementById('echarts');
            let myChart = echarts.init(chartMap); 
            var geoCoordMap = {  
                '上海': [121.4648,31.2891],  
                '东莞': [113.8953,22.901],  
                '东营': [118.7073,37.5513],  
                '中山': [113.4229,22.478],  
                '临汾': [111.4783,36.1615],  
                '临沂': [118.3118,35.2936],  
                '丹东': [124.541,40.4242],  
                '丽水': [119.5642,28.1854],  
                '乌鲁木齐': [87.9236,43.5883],  
                '佛山': [112.8955,23.1097],  
                '保定': [115.0488,39.0948],  
                '兰州': [103.5901,36.3043],  
                '包头': [110.3467,41.4899],  
                '北京': [116.4551,40.2539],  
                '北海': [109.314,21.6211],  
                '南京': [118.8062,31.9208],  
                '南宁': [108.479,23.1152],  
                '南昌': [116.0046,28.6633],  
                '南通': [121.1023,32.1625],  
                '厦门': [118.1689,24.6478],  
                '台州': [121.1353,28.6688],  
                '合肥': [117.29,32.0581],  
                '呼和浩特': [111.4124,40.4901],  
                '咸阳': [108.4131,34.8706],  
                '哈尔滨': [127.9688,45.368],  
                '唐山': [118.4766,39.6826],  
                '嘉兴': [120.9155,30.6354],  
                '大同': [113.7854,39.8035],  
                '大连': [122.2229,39.4409],  
                '天津': [117.4219,39.4189],  
                '太原': [112.3352,37.9413],  
                '威海': [121.9482,37.1393],  
                '宁波': [121.5967,29.6466],  
                '宝鸡': [107.1826,34.3433],  
                '宿迁': [118.5535,33.7775],  
                '常州': [119.4543,31.5582],  
                '广州': [113.5107,23.2196],  
                '廊坊': [116.521,39.0509],  
                '延安': [109.1052,36.4252],  
                '张家口': [115.1477,40.8527],  
                '徐州': [117.5208,34.3268],  
                '德州': [116.6858,37.2107],  
                '惠州': [114.6204,23.1647],  
                '成都': [103.9526,30.7617],  
                '扬州': [119.4653,32.8162],  
                '承德': [117.5757,41.4075],  
                '拉萨': [91.1865,30.1465],  
                '无锡': [120.3442,31.5527],  
                '日照': [119.2786,35.5023],  
                '昆明': [102.9199,25.4663],  
                '杭州': [119.5313,29.8773],  
                '枣庄': [117.323,34.8926],  
                '柳州': [109.3799,24.9774],  
                '株洲': [113.5327,27.0319],  
                '武汉': [114.3896,30.6628],  
                '汕头': [117.1692,23.3405],  
                '江门': [112.6318,22.1484],  
                '沈阳': [123.1238,42.1216],  
                '沧州': [116.8286,38.2104],  
                '河源': [114.917,23.9722],  
                '泉州': [118.3228,25.1147],  
                '泰安': [117.0264,36.0516],  
                '泰州': [120.0586,32.5525],  
                '济南': [117.1582,36.8701],  
                '济宁': [116.8286,35.3375],  
                '海口': [110.3893,19.8516],  
                '淄博': [118.0371,36.6064],  
                '淮安': [118.927,33.4039],  
                '深圳': [114.5435,22.5439],  
                '清远': [112.9175,24.3292],  
                '温州': [120.498,27.8119],  
                '渭南': [109.7864,35.0299],  
                '湖州': [119.8608,30.7782],  
                '湘潭': [112.5439,27.7075],  
                '滨州': [117.8174,37.4963],  
                '潍坊': [119.0918,36.524],  
                '烟台': [120.7397,37.5128],  
                '玉溪': [101.9312,23.8898],  
                '珠海': [113.7305,22.1155],  
                '盐城': [120.2234,33.5577],  
                '盘锦': [121.9482,41.0449],  
                '石家庄': [114.4995,38.1006],  
                '福州': [119.4543,25.9222],  
                '秦皇岛': [119.2126,40.0232],  
                '绍兴': [120.564,29.7565],  
                '聊城': [115.9167,36.4032],  
                '肇庆': [112.1265,23.5822],  
                '舟山': [122.2559,30.2234],  
                '苏州': [120.6519,31.3989],  
                '莱芜': [117.6526,36.2714],  
                '菏泽': [115.6201,35.2057],  
                '营口': [122.4316,40.4297],  
                '葫芦岛': [120.1575,40.578],  
                '衡水': [115.8838,37.7161],  
                '衢州': [118.6853,28.8666],  
                '西宁': [101.4038,36.8207],  
                '西安': [109.1162,34.2004],  
                '贵阳': [106.6992,26.7682],  
                '连云港': [119.1248,34.552],  
                '邢台': [114.8071,37.2821],  
                '邯郸': [114.4775,36.535],  
                '郑州': [113.4668,34.6234],  
                '鄂尔多斯': [108.9734,39.2487],  
                '重庆': [107.7539,30.1904],  
                '金华': [120.0037,29.1028],  
                '铜川': [109.0393,35.1947],  
                '银川': [106.3586,38.1775],  
                '镇江': [119.4763,31.9702],  
                '长春': [125.8154,44.2584],  
                '长沙': [113.0823,28.2568],  
                '长治': [112.8625,36.4746],  
                '阳泉': [113.4778,38.0951],  
                '青岛': [120.4651,36.3373],  
                '韶关': [113.7964,24.7028]  
            };  
            var BJData = [  
                [{name:'北京'}, {name:'上海'}],   
                [{name:'上海'}, {name:'广州'}],   
                [{name:'广州'}, {name:'大连'}],  
                [{name:'大连'}, {name:'南宁'}],  
                [{name:'南宁'}, {name:'南昌'}],  
                [{name:'南昌'}, {name:'拉萨'}],  
                [{name:'拉萨'}, {name:'长春'}],   
            ]; 
            var carw = 28;
            var carh = 16;
            // 动画运动时间
            var time = 60;
            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';  
  
            var convertData = function (data) {  
                var res = [];  
                for (var i = 0; i < data.length; i++) {  
                    var dataItem = data[i];  
                    var fromCoord = geoCoordMap[dataItem[0].name];  
                    var toCoord = geoCoordMap[dataItem[1].name];  
                    if (fromCoord && toCoord) {  
                        res.push({  
                            fromName: dataItem[0].name,  
                            toName: dataItem[1].name,  
                            coords: [fromCoord, toCoord]  
                        });  
                    }  
                }  
                return res;  
            };  
            var series = [];  
                series.push(  
                    {   
                        type: 'lines',  
                        coordinateSystem: 'bmap',  
                        zlevel: 2,  
                        effect: {  
                            show: true,  
                            period: 6,  
                            trailLength: 0,  
                            symbol: planePath, 
                            // symbol: "image://http://trash.hebut.top/images/cashcar@up@left.png" ,
                            symbolSize: 18  
                        }, 
                        lineStyle: {  
                            normal: {  
                                color: "green",  
                                width: 2,  
                                opacity: 0.4,  
                                curveness: 0.2  
                            }  
                        },  
                        data: convertData(BJData)  
                    },  
                    {    
                        type: 'effectScatter',  
                        coordinateSystem: 'bmap',  
                        zlevel: 2,  
                        rippleEffect: {  
                            brushType: 'stroke'  
                        },  
                        hoverAnimation: true,
                        label: {  
                            normal: {  
                                show: true,  
                                position: 'right',  
                                formatter: '{b}'  
                            }  
                        },  
                        // symbolSize: 12,
                        itemStyle: {  
                            normal: {  
                                color: "green"  
                            }  
                        },  
                        data: BJData.map(function (dataItem) {  
                            return {  
                                name: dataItem[1].name,  
                                value: geoCoordMap[dataItem[1].name]  
                            };  
                        })  
                    }); 
            var option = {     
                bmap: {
                    center: [113.65,34.76],
                    zoom: 5,
                    roam: true,
                }, 
                series: series ,
            }
            //配置参数传入图形实例中
            myChart.setOption(option);
        },
       


        /**
        * 将数据组装
        * @param {Object} one  目标数据
        * @param {Object} step 时间点
        * @param {Object} flag 标志
        * @param {Object} period1 目标秒数
        * @param {Object} delay1 目标延迟数
        */
        installData(one, step, period1) {
            this.optionPush([], one, period1);
            //相应时间点
            this.num.push(step);
        },
        /**
        * 此方法封装成最终echarts使用格式
        * @param {Object} one1
        * @param {Object} one2
        * @param {Object} period1
        * @param {Object} delay1
        */
        optionPush(one1, one2, period1) {
            this.optionData.push({
                series: [{
                        effect: {
                            period: period1,
                        },
                        data: one1
                    },
                    {
                        effect: {
                            period: period1,
                        },
                        data: one2
                    }
                ]
            });
        },

        /**
        * 总判断逻辑
        * @param {Object} date 数据
        */
        logic(data) {
            for(var i = 0, len = data.length; i < len; i++) {
                if(data[i + 1] != undefined) {
                    this.installData(data[i][0],data[i][4], 4);
                } else {
                    this.installData(data[i][0],data[i][4], 4);
                }
            }
        },

        /**
        * 封装数据
        */
        async forData() {
            var that=this

            //目标线
            var targetLines = [];

            //坐标圆点信息
            var circleData = [];

            //将目标和伴随的数据整合到一起
            var addData = [];

            //解析数据
            var convertData = function(data) {
                var res = [];
                var fromCoord = that.geoCoordMap[data[0].name];
                var toCoord = that.geoCoordMap[data[1].name];
                if(fromCoord && toCoord) {
                    res.push({
                        fromName: data[0].name,
                        toName: data[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
                return res;
            };

            //组合数据
            var sumData = function(data) {
                return [convertData(data), {
                    name: data[0].name,
                    value: that.geoCoordMap[data[0].name]
                }, data[0].value, data[2], data[1].value];
            }

            //循环目标数据
            for(var i = 0; i < that.targetData.length; i++) {
                console.log(that.targetData[i])
                targetLines.push(sumData(that.targetData[i])[0][0]);
                addData.push(sumData(that.targetData[i]));
            }

            //循环得到坐标圆点
            for(var key in that.geoCoordMap) {
                circleData.push({
                    name: key,
                    value: that.geoCoordMap[key]
                })
            }


            //进行逻辑判断
            await that.logic(addData);

            that.option = {
                baseOption: {
                    bmap: this.bmap,
                    timeline: {
                        axisType: 'category', //category
                        autoPlay: true,
                        playInterval: 4000,
                        data: this.num,
                        left: 400,
                        lineStyle: {
                            color: '#182941',
                            width: 3
                        },
                        checkpointStyle: {
                            color: '#fff',
                            borderColor: '#182941',
                            symbolSize: 15,
                            animationDuration: 4000
                        },
                        controlStyle: {
                            showPrevBtn: true,
                            showNextBtn: true,
                            normal: {
                                color: '#182941',
                                borderColor: '#182941'
                            },
                            emphasis: {
                                color: '#182941',
                                borderColor: '#182941'
                            },
                            position: "right"
                        },
                        itemStyle: {
                            normal: {
                                color: '#182941'
                            },
                            emphasis: {
                                color: '#182941'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    geo: {
                        map: 'bmap'
                    },
                    series: [
                        {
                            type: 'lines',
                            coordinateSystem: 'bmap',
                            zlevel: 2,
                            effect: {
                                show: true,
                                trailLength: 0,
                                symbol: "arrow",
                                symbolSize: 10,
                            },
                            lineStyle: {
                                normal: {
                                    color: "red",
                                    width: 0,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            }
                        },
                        {
                            type: 'lines',
                            coordinateSystem: 'bmap',
                            zlevel: 2,
                            effect: {
                                show: true,
                                trailLength: 0,
                                symbol: "arrow",
                                symbolSize: 10,
                            },
                            lineStyle: {
                                normal: {
                                    color: "red",
                                    width: 0,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            }
                        },
                        {
                            type: 'lines',
                            coordinateSystem: 'bmap',
                            zlevel: 2,
                            effect: {
                                show: true,
                                trailLength: 0,
                                symbolSize: 0
                            },
                            lineStyle: {
                                normal: {
                                    color: "red",
                                    width: 1,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            },
                            data: targetLines
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'bmap',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: 10,
                            showEffectOn: 'render',
                            itemStyle: {
                                normal: {
                                    color: "red"
                                }
                            },
                            data: circleData
                        }
                    ]
                },
                options: this.optionData
            };
        },

        /**
        * 绘制echarts
        */
        async drawMap() {

            //初始化echart--此处判断为避免多次初始化造成内存泄露
            if(this.myChart == null || this.myChart == undefined) {
                this.myChart = echarts.init(document.getElementById('allmap'));
            }

            await this.forData();

            this.myChart.clear();
            this.myChart.setOption(this.option);

            //获取map实例
            this.map = this.myChart.getModel().getComponent('bmap').getBMap();

            //避免时间轴拖动地图跟随移动
            // this.myChart.getZr().on('mousedown', function(event) {
            //     if(event.target != undefined && event.topTarget.name != "line") {
            //         this.map.disableDragging();
            //     }
            // })
            // this.myChart.getZr().on('mouseup', function(event) {
            //     this.map.enableDragging();
            // })

        },
    }
}
  </script>
  