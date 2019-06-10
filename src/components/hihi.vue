<template>
  <div>
        <div v-for="(item,index) in group" :key="index">
            <input type="checkbox" v-model='checked' v-on:click='checkedAll(item,index)'>{{item.name}}
            <div>
                <div v-for="(val,e) in item.list" :key="e">
                    <input type="checkbox"  v-model='checkboxList' :value="val.id">{{val.name}}
                </div>
            </div>
        </div>
  </div>
</template>
<script>
  export default {
      
    data () {
          return {
            checkboxData:[],
              checkboxList:[],
              checked: false,
              group:[],
              isall:-1
          }
      },
    mounted(){
        this.getGroupList()
    },
      methods:{
        getGroupList () {
                this.$http.post(this.$store.state.shcPost+'/rstl/Group/selectAllGroup.do',{})
                .then(res => {
                    if(res.status == 200) {
                        this.group=res.data
                    }
                })
            },
          checkedAll(e,val) {
              this.checkboxData=e.list
              if (this.checked) {//实现反选
                  this.checkboxList = [];
              } else { //实现全选
                this.isall=val
                  this.checkboxList = [];
                  this.checkboxData.forEach( (item) => {
                      this.checkboxList.push(item.id);
                  });
              }
          },
      },
      watch: { //深度 watcher
          checkboxList: {
              handler() { 
                  if (this.checkboxList.length === this.checkboxData.length) {
                      this.checked=true;
                  } else {
                      this.checked=false;
                  }
              },
              deep: true
          }
      },
  };
  </script>
  <style>
  </style>