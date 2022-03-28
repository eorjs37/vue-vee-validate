<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import '~@/assets/scss/common';

.main{
  margin-left: 160px;
}

</style>
