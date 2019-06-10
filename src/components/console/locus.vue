<template>
    <div>
        <div class="locus-main">
            <div class="locus-head fs-12 w100 bg-f">
                <div class="head-top fs-12">
                    <span class="font-w">轨迹回放</span>
                    <span class="device font-w">GT710-06162  (IMEI：868120209806162)</span>
                    <span class="tip">温馨提示：可查询最近6个月记录</span>
                    <!-- <div class="top-btn fr text-c figer bg-f">行车记录</div> -->
                    <div class="close-btn text-c figer bg-f">{{closeBtn}}</div>
                </div>
                <div class="head-bar">
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
                </div>
                <div class="playback-box">
                    <span @click="play(1)">播放</span>
                    <span @click="play(2)">暂停</span>
                    <span @click="play(3)">停止</span>
                </div>
            </div>
            <!-- 地图 -->
            <div id="baidu-map" class="baidu-map w100"></div>
        </div>
    </div>
</template>
<script>
import BMap from 'BMap'
export default{
    data(){
        return{
            start:"",
            end:"",
            terminalid:"",
            closeBtn:"折叠",
        }
    },
    mounted(){
        this.terminalid=this.$store.state.terminalid
        this.BaiduMap()

    },
    methods:{
        //接收数据
        getData(){
            console.log(this.start)
            console.log(this.end)
            if(this.start==""||this.end==""){
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
                    console.log(res)
                    if(res.data.length!=0){
                        console.log(res.data)
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
        }
    }
}
</script>
<style scoped>
.locus-main{
    height:100vh;
}
.locus-head{
    position: relative;
    height: 124px;
    border-bottom: 1px solid #ccc;
}
.head-top{
    position: relative;
    height: 40px;
    background-image: linear-gradient(#F1F5FD, #E9F0FF);
    box-shadow: inset 0 1px 0 #fff;
    border-bottom: 1px solid #ddd;
    padding: 0 15px;
    line-height: 40px;
}
.head-bar{
    padding: 10px 15px 0;
    zoom:1
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
.close-btn{
    width: 50px;
    line-height: 24px;
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    position: absolute;
    bottom: -1px;
    left: 50%;
    margin-left: -20px;
}
.baidu-map{
    height:calc(100% - 124px);
}
</style>