(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afcb68a4"],{2446:function(e,t,i){},2708:function(e,t,i){"use strict";i.d(t,"c",(function(){return n})),i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return o}));var a=i("c1df"),r=i.n(a),n={filters:{timeFrom:function(e){return e?r()(e).locale("zh-tw").format("llll"):"-"}}},s={filters:{fromNow:function(e){return e?r()(e).fromNow():"-"}}},o={filters:{emptyImage:function(e){return e||"https://via.placeholder.com/350x220/DFDFDF?text=No+Image"}}}},7883:function(e,t,i){"use strict";var a=i("cc95"),r=i.n(a);r.a},b4c4:function(e,t,i){"use strict";var a=i("2446"),r=i.n(a);r.a},bf8e:function(e,t,i){"use strict";i("d3b7"),i("25f0"),i("3ca3"),i("ddb0"),i("2b3d");var a=i("2fa3");t["a"]={search:function(e){var t=new URLSearchParams(e);return a["a"].get("/member/tag?".concat(t.toString()))},get:function(){return a["a"].get("/member/tags")}}},c16d:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"box-center",staticStyle:{"background-color":"#F0E8DD",height:"100%"}},[i("div",{staticClass:"container border border-secondary",staticStyle:{"max-width":"500px","border-radius":"5%"}},[i("h1",{staticClass:"py-3 text-center"},[e._v("會員資料")]),i("form",{staticClass:"row"},[i("div",{staticClass:"form-group col-12 text-center"},[i("button",{staticClass:"btn btn-primary px-4 py-2",staticStyle:{position:"absolute",right:"0"},attrs:{disabled:e.initialIsProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.edit()}}},[e._v(e._s(e.initialEditing?"取消":"編輯"))]),i("img",{staticClass:"user-avatar",attrs:{src:e._f("emptyImage")(e.profile.avatar),width:"150",height:"150"}}),i("input",{directives:[{name:"show",rawName:"v-show",value:e.initialEditing,expression:"initialEditing"}],staticClass:"align-bottom",attrs:{id:"image",type:"file",name:"image",accept:"image/*",disabled:e.initialIsProcessing||!e.initialEditing},on:{change:e.handleFileChange}})]),"member"===this.$store.state.currentUser.role?i("div",{staticClass:"form-label-group mb-3 col-12"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.initialEditing,expression:"initialEditing"}]},[i("label",[e._v("標籤")]),i("div",{staticClass:"form-inline mb-2"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.tagName,expression:"tagName"}],staticClass:"form-control mr-sm-2",attrs:{type:"text",name:"searchTag",disabled:e.initialIsProcessing,placeholder:"Search Tag name"},domProps:{value:e.tagName},on:{input:function(t){t.target.composing||(e.tagName=t.target.value)}}}),i("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:e.initialIsProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.searchTag(t)}}},[e._v("搜尋")])]),e._l(e.tagsDisplay,(function(t){return i("button",{key:t.id,staticClass:"btn btn-primary mr-2 mt-2",attrs:{disabled:e.initialIsProcessing},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),e.addTag(t)}}},[e._v(e._s(t.name))])}))],2),i("label",{staticClass:"d-block"},[e._v("偏好標籤")]),e._l(e.profile.preferredTags,(function(t){return i("div",{key:t.id,staticClass:"d-inline-block"},[i("button",{directives:[{name:"show",rawName:"v-show",value:e.initialEditing,expression:"initialEditing"}],staticClass:"btn btn-primary mr-2 mb-2",attrs:{disabled:e.initialIsProcessing},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),e.removeTag(t)}}},[e._v("#"+e._s(t.name))]),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.initialEditing,expression:"!initialEditing"}],staticClass:"badge badge-danger"},[e._v(e._s(t.name))])])}))],2):e._e(),i("div",{staticClass:"form-label-group mb-3 col-sm-6 col-12",class:{"form-group--error":e.$v.profile.name.$error}},[i("label",{attrs:{for:"name"}},[e._v("Name")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.name,expression:"profile.name"}],staticClass:"form-control",attrs:{disabled:e.initialIsProcessing||!e.initialEditing,maxlength:"20",minlength:"1",id:"name",name:"name",type:"text",placeholder:"name",required:"",autofocus:""},domProps:{value:e.profile.name},on:{input:[function(t){t.target.composing||e.$set(e.profile,"name",t.target.value)},e.$v.profile.name.$touch]}}),e.$v.profile.name.$error?i("small",{staticClass:"text-danger"},[e._v("長度介於 1 - 20")]):e._e()]),i("div",{staticClass:"form-label-group mb-3 col-sm-6 col-12",class:{"form-group--error":e.$v.profile.phone.$error}},[i("label",{attrs:{for:"name"}},[e._v("Phone")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.phone,expression:"profile.phone"}],staticClass:"form-control",attrs:{disabled:e.initialIsProcessing||!e.initialEditing,maxlength:"15",minlength:"8",id:"phone",name:"phone",type:"number",placeholder:"phone",required:"",autofocus:""},domProps:{value:e.profile.phone},on:{input:[function(t){t.target.composing||e.$set(e.profile,"phone",t.target.value)},e.$v.profile.phone.$touch]}}),e.$v.profile.phone.$error?i("small",{staticClass:"text-danger"},[e._v("長度需為 10")]):e._e()]),i("div",{staticClass:"form-label-group mb-3 col-sm-6 col-12",class:{"form-group--error":e.$v.profile.email.$error&&!e.$v.profile.email.$pending}},[i("label",{attrs:{for:"email"}},[e._v("Email")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.email,expression:"profile.email"}],staticClass:"form-control",attrs:{disabled:e.initialIsProcessing||!e.initialEditing,id:"email",name:"email",type:"email",placeholder:"email",required:"",autofocus:""},domProps:{value:e.profile.email},on:{input:[function(t){t.target.composing||e.$set(e.profile,"email",t.target.value)},e.$v.profile.email.$touch]}}),!e.$v.profile.email&&e.$v.profile.email.$dirty?i("small",{staticClass:"text-danger"},[e._v("請輸入格式正確的電子信箱")]):e._e(),!e.$v.profile.email.required&&e.$v.profile.email.$dirty?i("small",{staticClass:"text-danger"},[e._v("電子信箱必填")]):e._e()]),i("div",{staticClass:"form-label-group mb-3 col-sm-6 col-12",class:{"form-group--error":e.$v.profile.account.$error}},[i("label",{attrs:{for:"name"}},[e._v("Account")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.account,expression:"profile.account"}],staticClass:"form-control",attrs:{disabled:e.initialIsProcessing||!e.initialEditing,maxlength:"30",minlength:"6",id:"account",name:"account",type:"text",placeholder:"account",required:""},domProps:{value:e.profile.account},on:{input:[function(t){t.target.composing||e.$set(e.profile,"account",t.target.value)},e.$v.profile.account.$touch]}}),i("small",{directives:[{name:"show",rawName:"v-show",value:e.$v.profile.account.$error,expression:"$v.profile.account.$error"}],staticClass:"text-danger"},[e._v("長度介於 5 - 30")])]),i("div",{staticClass:"col-12 pb-4"},[i("button",{staticClass:"btn btn-primary w-50 p-2",attrs:{disabled:e.initialIsProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.$router.back()}}},[e._v("回上一頁")]),i("button",{staticClass:"btn btn-primary w-50 p-2",attrs:{disabled:e.initialIsProcessing||e.$v.$invalid||!e.initialEditing,type:"submit"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[e._v(e._s(e.initialIsProcessing?"處理中...":"送出"))])])])])])},r=[],n=(i("a4d3"),i("99af"),i("4de4"),i("4160"),i("c975"),i("d81d"),i("fb6a"),i("b0c0"),i("e439"),i("dbb4"),i("b64b"),i("d3b7"),i("ac1f"),i("6062"),i("3ca3"),i("841c"),i("159b"),i("ddb0"),i("2b3d"),i("96cf"),i("1da1")),s=i("2909"),o=i("ade3"),l=i("bf8e"),c=i("2708"),u=i("b5ae");function m(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function p(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?m(Object(i),!0).forEach((function(t){Object(o["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):m(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var f={name:"ProfileForm",mixins:[c["a"]],props:{initialProfile:{type:Object,default:function(){return{account:"",phone:"",name:"",email:"",avatar:"",preferredTags:[{id:1,name:""}]}}},initialTags:{type:Array,default:function(){return[]}},initialIsProcessing:{type:Boolean,default:!1},initialEditing:{type:Boolean,default:!1}},data:function(){return{profile:this.initialProfile,tags:this.initialTags,tagName:"",tag:"",searchResult:[]}},validations:{profile:{account:{required:u["required"],minLength:Object(u["minLength"])(5),maxLength:Object(u["maxLength"])(30)},phone:{required:u["required"],minLength:Object(u["minLength"])(10),maxLength:Object(u["maxLength"])(10)},name:{required:u["required"],minLength:Object(u["minLength"])(1),maxLength:Object(u["maxLength"])(20)},email:{required:u["required"],email:u["email"]}}},watch:{initialProfile:function(e){this.profile=p({},this.profile,{},e)},initialTags:function(e){this.tags=p({},this.tags,{},e)}},computed:{tagsDisplay:function(){var e=[].concat(Object(s["a"])(this.searchResult),Object(s["a"])(this.initialTags)),t=e.filter((function(e){var t=e.id,i=e.name,a="".concat(t).concat(i);return!this.has(a)&&this.add(a)}),new Set),i=t.slice(0,6);return i}},created:function(){},methods:{edit:function(){this.$emit("after-edit")},searchTag:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,i,a,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l["a"].search({name:this.tagName});case 3:if(t=e.sent,i=t.data,a=t.statusText,"OK"===a){e.next=7;break}throw new Error(a);case 7:0===i.length&&this.$swal({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,icon:"warning",title:"未找到相關標籤",text:""}),this.searchResult=[],i.map((function(e){r.searchResult.push({id:e.id,name:e.name})})),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log("error",e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(){return e.apply(this,arguments)}return t}(),handleFileChange:function(e){var t=e.target.files;if(t.length){var i=window.URL.createObjectURL(t[0]);this.profile.avatar=i}},handleSubmit:function(){this.$emit("after-submit")},addTag:function(e){var t=this.profile.preferredTags.map((function(e){return e.name})).indexOf(e.name);-1===t&&this.profile.preferredTags.unshift(e)},removeTag:function(e){this.profile.preferredTags=this.profile.preferredTags.filter((function(t){return t!==e}))}}},d=f,h=(i("b4c4"),i("2877")),g=Object(h["a"])(d,a,r,!1,null,"187a69ee",null);t["a"]=g.exports},cc95:function(e,t,i){},fb30:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ProfileForm",{attrs:{"initial-profile":e.profile,"initial-editing":e.editing,"initial-isLoading":e.isLoading,"initial-isProcessing":e.isProcessing},on:{"after-edit":e.edit,"after-submit":e.handleSubmit}})},r=[],n=(i("b0c0"),i("96cf"),i("1da1")),s=i("c16d"),o=i("2fa3"),l={get:function(){return o["a"].get("/admin/profile")},put:function(e){return o["a"].put("/admin/profile",e)}},c={name:"AdminProfile",components:{ProfileForm:s["a"]},data:function(){return{profile:{account:"",phone:"",name:"",email:"",avatar:"",preferredTags:[]},saveAccount:"",savePhone:"",saveName:"",saveEmail:"",saveAvatar:"",savePreferredTags:[],isLoading:!0,isProcessing:!1,editing:!1}},created:function(){this.LoadProfile()},methods:{LoadProfile:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.get();case 3:if(t=e.sent,i=t.data,a=t.statusText,"OK"===a){e.next=7;break}throw new Error(a);case 7:"error"===i.status?(this.$swal({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,icon:"warning",title:"未找到會員",text:""}),this.isLoading=!1):(this.profile.account=i.user.account,this.profile.phone=i.user.phone,this.profile.name=i.user.Profile.name,this.profile.email=i.user.Profile.email,this.profile.avatar=i.user.Profile.avatar,this.saveAccount=i.user.account,this.savePhone=i.user.phone,this.saveName=i.user.Profile.name,this.saveEmail=i.user.Profile.email,this.saveAvatar=i.user.Profile.avatar,this.isLoading=!1),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),this.isLoading=!1,console.log("error",e.t0);case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}(),handleSubmit:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isProcessing=!0,e.next=4,l.put({account:this.profile.account,name:this.profile.name,phone:this.profile.phone,avatar:this.profile.avatar,email:this.profile.email});case 4:if(t=e.sent,i=t.data,a=t.statusText,"OK"===a){e.next=8;break}throw new Error(a);case 8:this.$swal({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,icon:"success",title:i.msg}),this.isProcessing=!1,e.next=17;break;case 12:e.prev=12,e.t0=e["catch"](0),this.isProcessing=!1,this.$swal({icon:"warning",title:"註冊失敗，請稍後再試"}),console.log("error",e.t0);case 17:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(){return e.apply(this,arguments)}return t}(),edit:function(){this.editing?(this.profile.account=this.saveAccount,this.profile.phone=this.savePhone,this.profile.name=this.saveName,this.profile.email=this.saveEmail,this.profile.avatar=this.saveAvatar,this.editing=!1):this.editing=!0}}},u=c,m=(i("7883"),i("2877")),p=Object(m["a"])(u,a,r,!1,null,"c10e568a",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-afcb68a4.d90e1ba7.js.map