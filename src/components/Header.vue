<template>
  <header>
      <a  class="menu active">Home</a>
      <a  class="menu">News</a>
      <a  class="menu">Contact</a>
      <a  class="menu">About</a>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
header{
    overflow: hidden;
    background-color: #f3f3f3;

    .menu{
        float: left;
        display: block;
        color: #666;
        text-align: center;
        padding: 14px 16px;
        cursor: pointer;

        &:hover{
            background-color: #ddd;
        }

        &.active{
            color: white;
            background-color: #04AA6D;
        }
    }
    
}

</style>