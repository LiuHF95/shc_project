<template>
    <div>
        <div v-for="data in datas">
            <!--遍历父的-->
            <input type="checkbox"  :id="data.listTitle" value="" :checked="isTitleChecked(data)" 
                @change="changeTitleChecked(data,$event)"/>{{data.listTitle}}
            <div v-for="item in data.listItem">
                <!--遍历子的-->
                <input type="checkbox" :value="item" v-model="data.selected"/>{{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            datas : 
            [
                {
                    id: 666,
                    selected : [],
                    listTitle : "一级标题",
                    listItem : [
                        {
                            id : 1222,
                            info:0,
                            name : "高一"
                        },
                        {
                            id : 23,
                            info:1,
                            name : "高二"
                        },
                        {
                            id : 13,
                            info:0,
                            name : "高三"
                        }
                    ]
                },
                {
                    id: 8888,
                    selected : [],
                    listTitle : "二级标题",
                    listItem : [
                        {
                            id : 42,
                            info:1,
                            name : "大一"
                        },
                        {
                            id : 51,
                            info:0,
                            name : "大二"
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        /**
        * 当父标题状态变化时的处理方法
        * @param data [当前项的data]
        * @param event [当前项的event]
        */
        changeTitleChecked(data,event) {
            if (event.target.checked === true) {
                data.listItem.forEach(function (item) {
                    data.selected.indexOf(item) === -1 && data.selected.push(item);
                })
            }else {
                data.selected = [];
            }
        },
        /**
        * 判断父标题选择状态
        * @param data [当前项的data]
        * @returns {boolean}
        */
        isTitleChecked(data) {
            var _selected = data.selected;
            var _listItem = data.listItem;
            // 验证selected中是否含有全部的item的id 如果是 证明title要选中
            return _listItem.every(function (item) {
                return _selected.indexOf(item) != -1;
            });
        },

        /**
        * 全选框change事件的回调处理方法
        * @param event 
        */
        changeAllChecked(event) {
            if (event.target.checked === true) {
                this.datas.forEach(function (data) {
                    data.listItem.forEach(function (item) {
                        data.selected.indexOf(item) === -1 && data.selected.push(item);
                    })
                })
            }else {
                this.datas.forEach(function (data) {
                    data.selected = [];
                })
            }
        },
    }
}
</script>