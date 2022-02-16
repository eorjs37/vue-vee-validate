<template>
  <div>
      <h1>
          Main
      </h1>
      <ValidationObserver>
        <ValidationProvider ref="refEmail" name="이메일" rules="required" v-slot="{ errors }">
          <input v-model="email" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider ref="refPassword" name="비밀번호" rules="required" v-slot="{ errors }">
          <input v-model="password" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </ValidationObserver>

      <button type="button" @click="submit()">제출</button>
      
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
      email:'',
      password: ''
    }
  },
  mounted(){

  },
  methods:{
    async submit(){
      for(let item in this.$refs){
        const result =  await this.$refs[item].validate();
        if(!result.valid){
          alert(result.errors[0]);
          return false;
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>