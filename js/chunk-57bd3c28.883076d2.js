(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57bd3c28"],{2234:function(t,s,e){},"54e2":function(t,s,e){"use strict";e.r(s);var r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"box-center bg-image"},[e("div",{staticClass:"overlay"}),e("form",{staticClass:"p-5 border rounded",staticStyle:{width:"360px"},on:{submit:function(s){return s.preventDefault(),s.stopPropagation(),t.handleSubmit(s)}}},[t._m(0),e("div",{staticClass:"form-label-group mb-2"},[e("label",{attrs:{for:"account"}},[t._v("手機號碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"form-control",attrs:{id:"account",name:"account",type:"text",placeholder:"09XXXXXXX",disabled:t.isProcessing,autofocus:""},domProps:{value:t.account},on:{input:function(s){s.target.composing||(t.account=s.target.value)}}})]),e("div",{staticClass:"form-label-group mb-3 pb-4 border-bottom"},[e("label",{attrs:{for:"password"}},[t._v("密碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"Password",required:"",disabled:t.isProcessing,autocomplete:""},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})]),e("button",{staticClass:"btn btn-lg btn-primary btn-block mb-3",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(t._s(this.isProcessing?"處理中...":"登入"))]),e("div",{staticClass:"text-center mb-3"},[e("p",[t._v(" 成為會員？ "),e("router-link",{attrs:{to:"/signup"}},[t._v("註冊加入")])],1)]),e("p",{staticClass:"mt-5 text-center"},[t._v("© 2019-2020")])])])},a=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mb-4 text-center"},[e("h2",{staticClass:"mb-5 font-weight-normal"},[t._v("歡迎來到濾客平台")])])}],n=(e("96cf"),e("1da1")),i=e("4360"),o=e("02f4"),c={name:"SignIn",data:function(){return{account:"",password:"",isProcessing:!1}},methods:{handleSubmit:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var s,e,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,this.isProcessing=!0,this.account&&this.password){t.next=6;break}return this.$swal({icon:"warning",title:"帳號與密碼不可空白"}),this.isProcessing=!1,t.abrupt("return");case 6:return t.next=8,o["a"].signIn({account:this.account,password:this.password});case 8:if(s=t.sent,e=s.data,r=s.statusText,"OK"===r&&"success"===e.status){t.next=12;break}throw new Error(r);case 12:if(localStorage.setItem("token",e.token),this.$store.commit("setCurrentUser",e.user),!1!==e.user.isValid){t.next=18;break}return this.$swal({icon:"warning",title:"帳號已被停權，請連繫管理者!"}),this.isProcessing=!1,t.abrupt("return");case 18:return t.next=20,i["a"].dispatch("fetchCurrentUser");case 20:i["a"].state.isAuthenticated=t.sent,"member"===e.user.role&&this.$router.push("/member/menu"),"admin"===e.user.role&&this.$router.push("/admin/order"),this.$swal({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,icon:"success",title:"成功登入",text:""}),t.next=31;break;case 26:t.prev=26,t.t0=t["catch"](0),this.password="",this.isProcessing=!1,this.$swal({icon:"warning",title:"Oops...",text:"請確認您的帳號密碼",footer:'<a href="/signup">建立帳號?</a>'});case 31:case"end":return t.stop()}}),t,this,[[0,26]])})));function s(){return t.apply(this,arguments)}return s}()}},u=c,l=(e("f459"),e("2877")),d=Object(l["a"])(u,r,a,!1,null,"7505ed82",null);s["default"]=d.exports},f459:function(t,s,e){"use strict";var r=e("2234"),a=e.n(r);a.a}}]);
//# sourceMappingURL=chunk-57bd3c28.883076d2.js.map