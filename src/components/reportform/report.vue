<template>
    <div class="box fs-12">
        <home-head :tab-bar="2"></home-head>
        <div class="report-main hvh">
            <div class="menu-tab h100 fl">
                <div class="menu-top w100">统计报表</div>
                <div class="menu-list"> 
                    <el-menu>
                        <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.index">
                            <template slot="title">
                                <span>{{item.titlename}}</span>
                            </template>
                            <el-menu-item v-for="(val,e) in item.list" :key="e" :index="val.listindex">{{val.listname}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
            <div class="report-wrap h100 fl">
                <div class="menu-top w100">统计报表</div>
                <div class="report-main-wrap bg-f">
                    <alert-btn class="alert-icon"></alert-btn>
                    <!-- 运动总览 -->
                    <sport-overview></sport-overview>
                    <!-- 告警总览 -->
                    <!-- <alert-overview></alert-overview> -->
                    <!-- 告警详情 -->
                    <!-- <alert-details></alert-details> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HomeHead from "../head"//头部
import SportOverview from "./alert/sportsoverview"//运动总览
import AlertOverview from "./alert/alertoverview"//告警总览
import AlertDetails from "./alert/alertdetails"//告警总览
import AlertBtn from "./alert/alertbtn"//告警按钮
export default{
    components: {
        HomeHead,//头部
        SportOverview,//运动总览
        AlertOverview,//告警总览
        AlertDetails,//告警详情
        AlertBtn,//告警按钮
    },
    data(){
        return{
            menuList:[
                {
                    index:"0",
                    titlename:'运动统计',
                    list:[
                        {
                            listindex:"0-0",
                            listname:"运动总览"
                        },
                        {
                            listindex:"0-1",
                            listname:"里程报表"
                        },
                        {
                            listindex:"0-2",
                            listname:"行程报表"
                        },
                        {
                            listindex:"0-3",
                            listname:"超速报表"
                        },
                        {
                            listindex:"0-4",
                            listname:"停留报表"
                        },
                        {
                            listindex:"0-5",
                            listname:"ACC报表"
                        },
                    ]
                },
                {
                    index:"1",
                    titlename:'状态统计',
                    list:[
                        {
                            listindex:"1-0",
                            listname:"状态统计"
                        }
                    ]
                },
                {
                    index:"2",
                    titlename:'设备统计',
                    list:[
                        {
                            listindex:"2-0",
                            listname:"设备总览"
                        },
                        {
                            listindex:"2-1",
                            listname:"电量统计"
                        }
                    ]
                },
                {
                    index:"3",
                    titlename:'告警统计',
                    list:[
                        {
                            listindex:"3-0",
                            listname:"告警总览"
                        },
                        {
                            listindex:"3-1",
                            listname:"告警详情"
                        }
                    ]
                }
            ],//左边菜单列表数组

        }
    }
}
</script>
<style scoped>
.report-main{
    padding-top: 60px;
}
/* 左边菜单部分 */
.menu-tab{
    width: 170px;
    border-right: 1px solid #ccc;
}
.menu-top{
    line-height: 29px;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
    font-weight: bold;
    background: #E9F0FF;
}
.menu-list,.report-main-wrap{
    height: calc(100% - 30px);
    overflow-y: auto;
}
.menu-list{
    overflow-x: hidden;
}
/* 右边报表详情部分 */
.report-wrap{
    width: calc(100% - 170px);
}

.alert-icon{
    position: fixed;
    right: 10px;
    bottom: 0;
    z-index: 11;
}
</style>
<style>
.el-menu{
    border-right: 0;
}
.el-submenu__title,.el-submenu .el-menu-item{
    height: 30px;
    line-height: 30px;
}
</style>