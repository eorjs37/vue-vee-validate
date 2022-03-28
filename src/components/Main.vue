<template>
  <div>
      <h1>
          Main
      </h1>
      <ValidationObserver ref="forms">
        <ValidationProvider ref="refEmail" name="이메일" rules="required" v-slot="{ errors }">
          <input v-model="email" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider ref="refPassword" name="비밀번호" rules="required" v-slot="{ errors }">
          <input v-model="password" type="text" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>       

         <ValidationProvider ref="refFile" name="파일" rules="extension:jpg,pdf|filesize:1">
          <input type="file" id="refFile" @change="fileChanged($event)">
        </ValidationProvider> 
      </ValidationObserver>
      <button type="button" @click="submit()">제출</button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      email:'',
      password: '',
      file:'',
    }
  },
  mounted(){

  },
  methods:{
    async submit(){
      await this.$refs.forms.validate();//form validate
      const { $children } = await this.$refs.forms; // vue provider 추출

      let flag = true;
      //required 속성을 가진것을 추출
      $children.forEach((ele) => {
          //필수입력인지 확인여부
          if(ele['isRequired']){
            if(!ele.flags.valid){
              flag = false;
              return false;
            }
          }
      });

      if(!flag){
        alert('필수 값을 확인해주세요.')
      }
    },

    async fileChanged($event){
      const refFile = await this.$refs.refFile;
      const { valid } = await refFile.validate($event);
      
      if(!valid){
        const { errors } = refFile;
        alert(errors[0]);
        const fileEle = document.getElementById('refFile');
        fileEle.value = '';
      }
    }
  }
}
</script>

<style lang="scss">
</style>