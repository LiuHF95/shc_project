<template>
    <div>
        <home-head :tab-bar="2"></home-head>
        <div class="main">
            <div class="manage-head"></div>
        </div>
    </div>
</template>
<script>
import HomeHead from "./head"
export default{
    components: {
        HomeHead
    },
    data(){
        return{}
    }
}
</script>
<style scoped>
.main{
    height: 100vh;
}
</style>