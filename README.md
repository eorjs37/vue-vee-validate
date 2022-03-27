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
> 