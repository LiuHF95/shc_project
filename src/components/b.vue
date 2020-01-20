<template>
    <div>
        <span @click="addinput">输入</span>
        <span @click="addselect">多选</span>
        <div id="content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            num:0
        }
    },
    methods:{
        addinput(){
            var c=document.getElementById("content")
            var div=document.createElement("div")
            c.appendChild(div)
            div.innerHTML="<span>名字：</span><input style='border: 1px solid #ccc'>"
        },
        addselect(){
            this.num+=1
            var c=document.getElementById("content")
            var div=document.createElement("div")
            c.appendChild(div)
            div.innerHTML="<span>标题：</span><input style='border: 1px solid #ccc'>"+
                        "<span class='figer add"+this.num+"'>+</span>"+
                        "<div id='div"+this.num+"'></div>"
            var addbtn=document.getElementsByClassName("add"+this.num)[0]
            var addcon=document.getElementById("div"+this.num)
            addbtn.onclick=function(){
                var shuru=document.createElement("input")
                shuru.setAttribute("style","border: 1px solid #ccc")
                addcon.appendChild(shuru)
            }
        }
    }
}
</script>
<style scoped></style>