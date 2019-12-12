<template>
  <div class="box">
  <!--固定头部-->
    <div class="header-wrap">
      <div class="head">
        <!--logo-->
        <div class="logo-wrap">
          <img class="logo-left" src="../../static/images/logoL.png">
          <div class="logo-box"><img class="logo" src="../../static/images/logo.png"></div>
          <img class="logo-right" src="../../static/images/logoR.png">
        </div>
        <!--导航栏-->
        <ul class="nav-wrap">
          <li class="nav-list" 
            v-for="(item,index) in navList" :key="index" 
            :class="{'nav-active':index==tabBar}"
            @click="goRouter(item)">{{item.listname}}
          </li>
        </ul>
        <!--搜索按钮-->
        <div class="search-wrap">
          <span class="search"></span>
        </div>
        <!--右边栏导航-->
        <div class="nav-right-wrap">
          <div class="user-time">您好，<span class="user-name">{{username}}</span></div>
          <div class="system-tools">
            <!-- <span class="tools-list">消息中心(<span class="no-num">{{noNum}}</span>未读)</span> -->
            <!-- <span class="tools-list setting">设置
              <div class="set-box">
                <ul class="set">
                  <li class="set-list">默认首页</li>
                  <li class="set-list">告警设置</li>
                  <li class="set-list">设备型号设置</li>
                  <li class="set-list">指令管理</li>
                </ul>
              </div>
            </span> -->
            <!-- <span class="tools-list">关于</span> -->
            <span class="tools-list user-center">个人中心
              <div class="set-box">
                  <ul class="set">
                    <li class="set-list">修改资料</li>
                    <li class="set-list">修改密码</li>
                    <li class="set-list">帮助</li>
                    <li class="set-list">退出系统</li>
                  </ul>
                </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '豪斯石油',
      noNum:1,
      navList:[
        {listname:"控制台",route:"/"},
        {listname:"设备管理",route:"/devicemanage"},
        {listname:"统计报表",route:"/report"},
        {listname:"设备分布",route:"/distributed"},
      ]
    }
  },
  props:['tabBar'],
  methods:{
    goRouter(val){
      this.$router.push({path: val.route})
    }
  }
}
</script>
<style scoped>
/* 固定头部 */
.header-wrap{
  width:100%;
  height:60px;
  background:#0087d6;
  position: fixed;
  /* margin-bottom:20px; */
  box-shadow: 0 2px 3px rgba(0,0,0,.1);
  z-index: 1000;
}
.head{
  min-width:1280px;
  height:100%;
  padding:0 15px;
}
.logo-wrap{
  ovflow:hidden;
}
.logo-wrap>*{
  float:left;
}
.logo-box{
  background: url("../../static/images/logoBg.png") repeat-x;
  height:60px;
  padding:9px 0;
}
.logo{
  height:36px;
}
.nav-wrap{
  ovflow:hidden;
}
.nav-list{
  float:left;
  font-size:14px;
  color:#fff;
  padding: 15px 8px;
  height:60px;
  line-height:30px;
  cursor:pointer;
}
.nav-list:hover{
  color:#fffd4a;
}
.nav-active{
  color:#fffd4a;
}
.search-wrap{
  padding: 15px;
  float: left;
  margin-left: 15px;
  cursor: pointer;
}
.search{
  display: block;
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  font-size: 16px;
  transition: all .3s;
  color: #fff;
  text-align: center;
  background: #2b9bdd url("../../static/images/search2.png") no-repeat 50% 50%;
}
.search:hover{
  background: #fff url("../../static/images/search1.png") no-repeat 50% 50%;
}
.nav-right-wrap{
  padding: 10px 15px 0;
  text-align: right;
  height: 100%;
  float: right;
  margin-right: -15px;
}
.user-time{
  margin-bottom: 5px;
}
.user-time,.system-tools{
  color:#fff;
}
.tools-list{
  cursor: pointer;
  margin-right: 5px;
  display: inline-block;
}
.tools-list:last-of-type{
  margin-right: 0;
}
.no-num{
  color: red;
}
.setting,.user-center{
  position: relative;
  height: 22px;
}
.setting:hover>.set-box{
  display: block;
}
.user-center:hover>.set-box{
  display: block;
}
.set-box{
  position: absolute;
  right: 0;
  top: 18px;
  z-index: 10;
  min-width: 90px;
  padding-top: 8px;
  display: none;
}
.set{
  padding: 5px 0;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px rgba(0,0,0,.3);
}
.set:before,.set:after{
  content: '';
  position: absolute;
  top: 3px;
  right: 15px;
  width: 0;
  height: 0;
  border-width: 0 5px 5px;
  border-style: dashed solid solid;
  border-color: transparent transparent #ccc;
}
.set:after{
  top: 4px;
  border-bottom-color: #fff;
}
.set-list{
  font-size: 12px;
  color: #666;
  padding: 6px 8px;
  text-align: center;
}


</style>
