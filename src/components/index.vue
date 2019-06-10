<template>
  <div class="box"> 
  <!--固定头部-->
    <home-head :tab-bar="0"></home-head>
  <!-- 主体部分 -->
    <div class="main">
    <!-- 个人详情部分 -->
      <div class="person-details-box over">
        <div class="details detail-1">
          <div class="personal-card">
            <div class="personal-card-items over">
              <span v-for="(item,index) in detailTab" :key="index"  
                :class="{'active':index == isShow}"
                @click = "clickToggle(index)">{{item}}
              </span>
            </div>
            <div class="items-content">
              <div class="personal-content" v-if="isShow==0">
                <div class="personal-content-top">
                  <img class="content-img" src="../../static/images/personalcenter1.png">
                  <p class="content-name">{{mineName}}</p>
                </div>
                <div class="personal-content-btm">
                  <p><span>类型：</span>代理商</p>
                  <p><span>电话：</span>18589089087</p>
                </div>
              </div>
              <div class="personal-content" v-if="isShow==1">
                <div class="personal-content-top">
                  <img class="content-img" src="../../static/images/personalcenter2.png">
                  <p class="content-name">{{serviceName}}</p>
                </div>
                <div class="personal-content-btm">
                  <p><span>联系人：</span>代理商</p>
                  <p><span>电话：</span>18589089087</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="details detail-2">
          <div class="info-card over">
            <div class="info-card-left">
              <div class="alarm-num-box">
                <div class="alarm-num">0<span>条</span></div>
                <div class="alarm-num">0<span>分钟</span></div>
              </div>
              <p class="info-card-title">短信/电话告警数</p>
              <div class="alarm-btns">
                <span class="buy">购买</span>
                <span>余额提醒</span>
                <span class="set-alarm">设置告警</span>
                <span>订单管理</span>
                <span>账单管理</span>
              </div>
            </div>
            <div class="info-card-right">
              <div class="alarm-num-box alarm-num-right over">
                <div>
                  <div class="alarm-num">0<span>张</span></div>
                  <p class="info-card-title">年卡</p>
                </div>
                <div>
                  <div class="alarm-num">0<span>张</span></div>
                  <p class="info-card-title">终身</p>
                </div>
              </div>
              <div class="alarm-btns">
                  <span>购买充值卡</span>
                  <span>设备充值</span>
                  <span>充值卡管理</span>
              </div>
            </div>
          </div>
        </div>
        <div class="details detail-3">
          <div class="data-card">
            <div class="data-card-tabs over">
              <span v-for="(item,index) in dataTab" :key="index"  
                :class="{'active':index == dataTabshow}"
                @click="clickDatatab(index)"
                >{{item}}</span>
            </div>
            <div class="data-tab-content">
              <ul class="data-tab" v-if="dataTabshow==0">
                <li class="data-tab-list over">
                  <div class="data-title">短信告警</div>
                  <div class="line sms-line"></div>
                  <div class="data-num sms-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">电话告警</div>
                  <div class="line tel-line"></div>
                  <div class="data-num tel-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">一年充值卡</div>
                  <div class="line oneyear-line"></div>
                  <div class="data-num oneyear-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">终身充值卡</div>
                  <div class="line lifelong-line"></div>
                  <div class="data-num lifelong-num">0</div>
                </li>
              </ul>
              <ul class="data-tab" v-if="dataTabshow==1">
                <li class="data-tab-list over">
                  <div class="data-title">短信告警</div>
                  <div class="line sms-line"></div>
                  <div class="data-num sms-num">1</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">电话告警</div>
                  <div class="line tel-line"></div>
                  <div class="data-num tel-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">一年充值卡</div>
                  <div class="line oneyear-line"></div>
                  <div class="data-num oneyear-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">终身充值卡</div>
                  <div class="line lifelong-line"></div>
                  <div class="data-num lifelong-num">0</div>
                </li>
              </ul>
              <ul class="data-tab" v-if="dataTabshow==2">
                <li class="data-tab-list over">
                  <div class="data-title">短信告警</div>
                  <div class="line sms-line"></div>
                  <div class="data-num sms-num">2</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">电话告警</div>
                  <div class="line tel-line"></div>
                  <div class="data-num tel-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">一年充值卡</div>
                  <div class="line oneyear-line"></div>
                  <div class="data-num oneyear-num">0</div>
                </li>
                <li class="data-tab-list over">
                  <div class="data-title">终身充值卡</div>
                  <div class="line lifelong-line"></div>
                  <div class="data-num lifelong-num">0</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <!-- 快速通道 -->
      <div class="fast-box">
        <span class="fast-circle"></span>
        <span class="fast-word over">快速通道</span>
        <div class="fast-btn">添加模块</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHead from "./head"
export default {
  components: {
      HomeHead
  },
  data () {
    return {
      username: '豪斯石油',
      noNum:1,
      mineName:"北京豪斯石油装备",
      serviceName:"物和科技-常乐",
      detailTab:["我的","服务商"],
      dataTab:["昨日数据","当月数据","上月数据"],
      isShow:0,
      dataTabshow:0
    }
  },
  methods:{
    clickToggle(e){
      this.isShow=e
    },
    clickDatatab(e){
      console.log(e)
      this.dataTabshow=e
    }
  }
}
</script>

<style scoped>
/* 个人详情部分 */
.main{
  padding: 80px 20px 0;
}
.person-details-box{
  width: 100%;
  padding: 0 0 20px 0;
  height: 300px;
}
.details{
  height: 100%;
  float: left;
}
/* 个人详情左边部分 */
.detail-1{
  width: 16.666667%;
  padding-right: 15px;
}
.personal-card,.info-card,.data-card{
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4px;
}
.personal-card-items,.data-card-tabs{
  border-bottom: 1px solid #eee;
}
.personal-card-items>span,.data-card-tabs>span{
  text-align: center;
  line-height: 52px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  display: block;
  float: left;
}
.personal-card-items>span{
  width: 50%;
}
.data-card-tabs>span{
  width: 110px;
}
.active{
  color: #62c6ff!important;
  font-size: 16px!important;
}
.items-content{
  padding-top: 20px;
}
.content-img{
  display:block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.content-name{
  padding: 5px 15px;
  width: 100%;
  font-size: 20px;
  color:#ffd400;
  text-align: center;
}
.personal-content-btm{
  padding-left:34px;
}
.personal-content-btm>p:first-of-type{
  margin-bottom: 5px;
}
.personal-content-btm>p{
  font-size: 14px;
}
.personal-content-btm>p>span{
  font-size: 16px;
}
/* 个人详情中间部分 */
.detail-2{
  width: 50%;
  padding: 0 15px;
}
.info-card{
  padding-top: 68px;
}
.info-card>div{
  float: left;
  height: 192px;
  padding-left: 10px;
}
.info-card-left{
  width: 55%;
}
.alarm-num-box{
  color:red;
  margin: 20px 0 10px;
}
.info-card-title{
  font-size: 14px;
  padding-left: 5px;
  margin-bottom: 10px;
  color: #333;
}
.alarm-num{
  display: inline-block;
  font-size: 40px;
}
.alarm-num>span{
  font-size: 16px;
}
.alarm-btns>span{
  display: inline-block;
  line-height: 1.5;
  padding: 5px 11px;
  font-size: 12px;
  color: #fff;
  background: #42AEED;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom:3px;
}
.alarm-btns .buy{
  background: #5CB85C;
}
.alarm-btns .set-alarm{
  background: #F0AD4E;
}
.info-card-right{
  width: 45%;
}
.alarm-num-right>div{
  float: left;
  color:#76D459;
}
.alarm-num-right>div:first-of-type{
  margin-right: 30px;
}
.info-card-right .info-card-title{
  padding-top: 10px;
  margin-bottom: 0;
}
/* 个人详情右边部分 */
.detail-3{
  width: 33.333333%;
  padding-left: 15px;
}
.data-tab-content{
  padding:25px;
}
.data-tab{
  width: 100%;
  height: 100%;
  backface-visibility: yellow;
}
.data-tab-list>div{
  float: left;
}
.data-title{
  padding: 10px 20px 10px 0;
  display: inline-block;
  border-right: 1px solid #ddd;
  min-width: 110px;
  text-align: right;
}
.line{
  margin-top: 15px;
  height: 2px;
  width:190px;
}
.data-num{
  margin-top: 5px;
  padding-left: 10px;
  font-size: 16px;
}
.sms-line{
  background: #ff3b3b;
  box-shadow: 0px 0px 2px #ff3b3b;
}
.sms-num{
  color:#ff3b3b;
}
.tel-line{
  background: #ffd400;
  box-shadow: 0px 0px 2px #ffd400;
}
.tel-num{
  color:#ffd400;
}
.oneyear-line{
  background: #76d459;
  box-shadow: 0px 0px 2px #76d459;
}
.oneyear-num{
  color:#76d459;
}
.lifelong-line{
  background: #92c6ff;
  box-shadow: 0px 0px 2px #92c6ff;
}
.lifelong-num{
  color:#92c6ff;
}
/* 快速通道 */
.fast-box{
  padding: 12px 20px;
  border-radius: 4px;
  background: #fff;
}
.fast-circle{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 4px solid #000;
  float: left;
  margin-top: 3px;
  margin-right: 10px;
}
.fast-word{
  font-size: 18px;
  font-weight: bold;
}
.fast-btn{
  float: right;
  width: 100px;
  height: 30px;
  border-radius: 15px;
  background: #42aeed;
  line-height: 30px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.fast-btn:hover{
  background: #3b9cd5;
}
</style>
