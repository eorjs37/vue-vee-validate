# Vee-validate

> vee-validte 설치 및 extend를 통한 파일 확장자 validation 체크

1. vee-validate 설치
2. vee-validate import
3. extend를 통한 파일 확장자 validation 체크
4. required만 validation 체크

## 1.vee-validate 설치

> <https://vee-validate.logaretm.com/v3>에서 vee-validate를 설치

<pre>
 <code>
    # install with npm
    npm install vee-validate@3 --save
 </code>
</pre>

## 2. vee-validate import

> src > plugins > VeeValidate.js를 만들어 VeeValidate를 관리하도록 한다.

### 2-1.폴더 구조

```
─ src
 ├─ plugins
 │   └─ VeeValidate.js
 ├─ utils
 │   └─ utils.js
 ├─ main.js
```

### 2-2.VeeValidate.js

<pre>
 <code>
    # src > plugins > VeeValidate.js
    import Vue from 'vue';
    import { ValidationProvider, extend , ValidationObserver, localize } from 'vee-validate';
    import * as rules from 'vee-validate/dist/rules';
    import ko from 'vee-validate/dist/locale/ko.json';

    // extend를 통하여 기존 rule 추가
    Object.keys(rules).forEach(rule => {
        extend(rule, rules[rule]);
    });

    // 한국어 추가
    localize('ko', ko);

    //전역에서 컴퍼넌트를 쓸 수 있도록 추가
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);
 </code>
</pre>

### 2-2.main.js import

<pre>
 <code>
    # src > main.js
    import Vue from 'vue'
    import App from './App.vue'
    import './plugins/VeeValidate';


    Vue.config.productionTip = false

    new Vue({
        render: h => h(App),
    }).$mount('#app')

 </code>
</pre>

## 3. extend를 통한 파일 확장자 validation 체크

### 3-1. utils.js에서 extract로 확장자 추출

<pre>
 <code>
    # utils > utils.js
    const extract = (fileName) => {
      let fileNameLength = fileName.length;

      let lastDot = fileName.lastIndexOf('.');

      let fileExtension = fileName.substring(lastDot + 1, fileNameLength);
      return fileExtension;
   }

   export { extract }

 </code>
</pre>

### 3-2. VeeValidate.js에서 extend를 활용하여 규칙 추가

> extension : 확장자가 맞는지 체크  
> filesize: MB기준으로 파일용량 체크

<pre>
 <code>
   import Vue from 'vue';
   import { ValidationProvider, extend , ValidationObserver, localize } from 'vee-validate';
   import * as rules from 'vee-validate/dist/rules';
   import ko from 'vee-validate/dist/locale/ko.json';
   import { extract } from '../utils/utils';

   Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
   });

   /**
   * @description: 확장자 체크
   */
   extend('extension', {
      validate(value, args) {
         //현재 파일 확장자 추출
         const extension = extract(value[0]['name']);
         
         let diffExtension = ''; //비교 확장자
         if (Array.isArray(args.ext)) {
               diffExtension = args.ext.join(',');
         }
         else { 
               diffExtension = args.ext;
         }

         let reg = new RegExp(extension);
         let testing = reg.test(diffExtension);

         if (testing) {
               return true;
         }
         return `${diffExtension}형식만 사용가능합니다.`;
      },
      params: ['ext'],
   });

   /**
   * @description: 파일 사이즈 체크
   */
   extend('filesize', {
      validate(value, args) { 
         const fileSize = args.size;
         const aleterFileSize = fileSize * 1024 * 1024; //2번 곱하면 MB

         if (value[0].size <= aleterFileSize) {
               return true;
         }

         return `파일사이즈가 ${fileSize}MB 이하여야만 합니다.`;
      },
      params:['size']
   })

   localize('ko', ko);

   Vue.component('ValidationProvider', ValidationProvider);
   Vue.component('ValidationObserver', ValidationObserver);
 </code>
</pre>

## 4. required만 validation 체크 및 파일확장자,사이즈 체크

<pre>
 <code>
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
 </code>
</pre>
