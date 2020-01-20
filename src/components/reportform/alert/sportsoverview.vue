<template>
    <div class="box h100">
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {}
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        });
        myChart.on('click', function (params) {
            console.log(params)
        });
    }
  }
}
</script>
<style scoped></style>
