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