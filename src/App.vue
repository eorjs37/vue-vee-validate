<template>
  <div id="app">
    <Header/>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: 'App',
  components:{
    Header,
  },
  created(){
    console.log(process.env);
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/common';

.main{
  margin-left: 160px;
}

</style>
