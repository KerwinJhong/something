<template>
  <div style="background-color: #F0E8DD;height: 100%;">
    <div class="container">
      <Spinner v-if="isLoading" />
      <template v-else>
        <h1 class="pt-3 text-center">會員資料</h1>
        <form class="row" @submit.stop.prevent="handleSubmit">
          <div class="form-group col-6">
            <img :src="avatar | emptyImage" class="user-avatar" width="150" height="150" />

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              @change="handleFileChange"
              class="align-bottom"
              :disabled="isProcessing"
            />
          </div>
          <div class="form-group col-6 text-right">
            <button
              class="btn btn-primary p-3 mr-5"
              :disabled="isProcessing || $v.$invalid"
              type="submit"
            >{{ this.isProcessing ? "處理中..." : "送出" }}</button>

            <button
              class="btn btn-primary p-3"
              :disabled="isProcessing"
              @click.stop.prevent="$router.back()"
            >回上一頁</button>
          </div>

          <div class="form-label-group mb-3 col-6" :class="{'form-group--error': $v.name.$error}">
            <label for="name">Name</label>
            <input
              @input="$v.name.$touch"
              :disabled="isProcessing"
              maxlength="20"
              minlength="1"
              id="name"
              v-model="name"
              name="name"
              type="text"
              class="form-control"
              placeholder="name"
              required
              autofocus
            />
            <small v-if="$v.name.$error" class="text-danger">長度介於 1 - 20</small>
          </div>

          <div class="form-label-group mb-3 col-6" :class="{'form-group--error': $v.phone.$error}">
            <label for="name">Phone</label>
            <input
              @input="$v.phone.$touch"
              :disabled="isProcessing"
              maxlength="15"
              minlength="8"
              id="phone"
              v-model="phone"
              name="phone"
              type="number"
              class="form-control"
              placeholder="phone"
              required
              autofocus
            />
            <small v-if="$v.phone.$error" class="text-danger">長度介於 8 - 15</small>
          </div>

          <div
            class="form-label-group mb-3 col-6"
            :class="{'form-group--error': $v.email.$error && !$v.email.$pending}"
          >
            <label for="email">Email</label>
            <input
              @input="$v.email.$touch"
              :disabled="isProcessing"
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="email"
              required
              autofocus
            />
            <small v-if="!$v.email.email && $v.email.$dirty" class="text-danger">請輸入格式正確的電子信箱</small>
            <small v-if="!$v.email.required && $v.email.$dirty" class="text-danger">電子信箱必填</small>
          </div>

          <div
            class="form-label-group mb-3 col-6"
            :class="{'form-group--error': $v.account.$error}"
          >
            <label for="name">Account</label>
            <input
              @input="$v.account.$touch"
              :disabled="isProcessing"
              maxlength="30"
              minlength="6"
              id="account"
              v-model="account"
              name="account"
              type="text"
              class="form-control"
              placeholder="account"
              required
              autofocus
            />
            <small v-show="$v.account.$error" class="text-danger">長度介於 6 - 30</small>
          </div>

          <div
            class="form-label-group mb-3 col-6"
            :class="{'form-group--error': $v.password.$error}"
          >
            <label for="password">Password</label>
            <input
              @input="$v.password.$touch"
              :disabled="isProcessing"
              maxlength="30"
              minlength="8"
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
              autofocus
              autocomplete
            />
            <small v-if="$v.password.$error" class="text-danger">長度介於 8 -30</small>
          </div>

          <div
            class="form-label-group mb-3 col-6"
            :class="{'form-group--error': $v.passwordCheck.$error}"
          >
            <label for="password-check">Password Check</label>
            <input
              @input="$v.passwordCheck.$touch"
              :disabled="isProcessing"
              maxlength="30"
              minlength="8"
              id="password-check"
              v-model="passwordCheck"
              name="passwordCheck"
              type="password"
              class="form-control"
              placeholder="Password"
              required
              autofocus
              autocomplete
            />
            <small v-if="$v.passwordCheck.$error" class="text-danger">輸入的兩組密碼須相同</small>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import adminMemberAPI from "../../apis/admin/member";
import adminAuthorizationAPI from "../../apis/admin/authorization";
import Spinner from "../../components/spinner/Spinner";
import { emptyImageFilter } from "../../utils/mixins";

import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "AdminProfileEdit",
  mixins: [emptyImageFilter],
  components: {
    Spinner
  },
  data() {
    return {
      account: "",
      phone: "",
      password: "",
      passwordCheck: "",
      name: "",
      email: "",
      avatar: "",
      isLoading: true,
      isProcessing: false
    };
  },
  validations: {
    account: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(30)
    },
    phone: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(15)
    },
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(20)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(30)
    },
    passwordCheck: {
      sameAs: sameAs("password")
    }
  },
  created() {
    this.LoadProfile();
  },
  methods: {
    async LoadProfile() {
      try {
        const response = await adminMemberAPI.searchMember({
          phone: (this.user = this.$store.state.currentUser.phone)
        });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        if (data.status === "error") {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "warning",
            title: "未找到會員",
            text: ""
          });
          this.isLoading = false;
        } else {
          this.account = data.user.account;
          this.phone = data.user.phone;
          this.name = data.user.Profile.name;
          this.email = data.user.Profile.email;
          this.avatar = data.user.Profile.avatar;
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.avatar = imageURL;
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;
        if (!this.account || !this.password || !this.phone || !this.email) {
          this.$swal({
            type: "warning",
            title: "請填完所有必須資料"
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          this.$swal({
            type: "warning",
            title: "密碼驗證不相同"
          });
          return;
        }

        const response = await adminAuthorizationAPI.signUp({
          account: this.account,
          name: this.name,
          phone: this.phone,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          this.$swal({
            type: "warning",
            title: data.msg
          });
          throw new Error(statusText);
        }

        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          title: data.msg
        });

        this.$router.push("sign-in");
      } catch (error) {
        this.$swal({
          type: "warning",
          title: "註冊失敗，請稍後再試"
        });
        this.isProcessing = false;
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>

<style scoped>
.user-avatar {
  border-radius: 30%;
}
.max-width {
  max-width: 450px;
  min-height: 450px;
  border: 1px solid #dee2e6;
}
.form-footer {
  position: absolute;
  bottom: 0;
  right: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>