<template>
  <div>
    <form class="row">
      <div class="col-3" v-show="!this.initialCreateMember">
        <label class="d-block" for="avatar">相片</label>
        <img :src="user.Profile.avatar | emptyImage" class="img-thumbnail" width="200" height="200" />

        <input
          id="avatar"
          type="file"
          name="avatar"
          accept=".png, .jpg, .jpeg"
          @change="handleFileChange"
          class="align-bottom"
          style="display: block;"
          v-show="this.initialEditUser"
        />
      </div>

      <div class="col-9" v-if="!this.initialCreateMember">
        <div class="row">
          <div class="form-group col-4">
            <label for="name">稱呼</label>
            <div v-show="!this.initialEditUser">{{ user.Profile.name }}</div>
            <input
              maxlength="30"
              id="name"
              v-model="user.Profile.name"
              type="text"
              class="form-control"
              name="name"
              placeholder="Enter name"
              required
              v-show="this.initialEditUser"
            />
          </div>

          <div class="form-group col-4">
            <label for="phone">手機號碼</label>
            <div v-show="!this.initialEditUser">{{ user.phone }}</div>
            <input
              maxlength="20"
              id="phone"
              v-model="user.phone"
              type="number"
              class="form-control"
              name="phone"
              placeholder="Enter phone"
              required
              v-show="this.initialEditUser"
            />
          </div>

          <div class="form-group col-4">
            <label for="email">Email</label>
            <div v-show="!this.initialEditUser">{{ user.Profile.email }}</div>
            <input
              maxlength="30"
              id="email"
              v-model="user.Profile.email"
              type="email"
              class="form-control"
              name="email"
              placeholder="Enter email"
              required
              v-show="this.initialEditUser"
            />
          </div>

          <div class="form-group col-12">
            <table class="table table-striped m-0 table-bordered text-center">
              <thead class="thead-dark">
                <tr>
                  <th width="40%" scope="col">餐點</th>
                  <th width="15%" scope="col" class="text-center">數量</th>
                  <th scope="col">日期</th>
                </tr>
              </thead>
            </table>
            <div class="table-data text-center">
              <table class="table table-striped table-bordered">
                <tbody>
                  <tr v-for="order in this.initialOrders" :key="order.id">
                    <td width="40%">{{ order.sumOfDishes[0].name }}</td>
                    <td width="15%">{{ order.quantity }}</td>
                    <td>{{ order.createdAt | timeFrom }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-show="this.initialEditUser" class="form-group col-12 mt-3">
            <a class="btn btn-primary col-6 py-2" href="#" @click.stop.prevent="formEditCancel">取消</a>

            <button
              type="submit"
              class="btn btn-primary col-6 py-2"
              :disabled="isProcessing"
              @click.stop.prevent="handleSubmit"
            >{{ this.isProcessing ? "處理中..." : "送出" }}</button>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="row">
          <div class="form-group col-6">
            <label for="name">稱呼</label>
            <div v-show="!this.initialEditUser">{{ user.Profile.name }}</div>
            <input
              @input="$v.user.Profile.name.$touch"
              :disabled="isProcessing"
              maxlength="20"
              minlength="1"
              id="name"
              v-model="user.Profile.name"
              type="text"
              class="form-control"
              name="name"
              placeholder="Enter name"
              required
              autofocus
              v-show="this.initialEditUser"
            />
            <small v-if="$v.user.Profile.name.$error" class="text-danger">長度介於 1 - 20</small>
          </div>

          <div class="form-group col-6">
            <label for="phone">手機號碼</label>
            <div v-show="!this.initialEditUser">{{ user.phone }}</div>
            <input
              @input="$v.user.phone.$touch"
              :disabled="isProcessing"
              maxlength="11"
              minlength="9"
              id="phone"
              v-model="user.phone"
              type="number"
              class="form-control"
              name="phone"
              placeholder="Enter phone"
              required
              autofocus
              v-show="this.initialEditUser"
            />
            <small v-if="$v.user.phone.$error" class="text-danger">長度須為 10</small>
          </div>

          <div class="form-group col-6" v-show="!this.initialCreateMember">
            <label for="account">帳號</label>
            <div v-show="!this.initialEditUser">{{ user.account }}</div>
            <input
              maxlength="30"
              minlength="5"
              id="account"
              v-model="user.account"
              type="text"
              class="form-control"
              name="account"
              placeholder="Enter account"
              required
              v-show="this.initialEditUser"
            />
          </div>

          <div class="form-group col-6" v-show="!this.initialCreateMember">
            <label for="email">Email</label>
            <div v-show="!this.initialEditUser">{{ user.Profile.email }}</div>
            <input
              maxlength="30"
              id="email"
              v-model="user.Profile.email"
              type="email"
              class="form-control"
              name="email"
              placeholder="Enter email"
              required
              v-show="this.initialEditUser"
            />
          </div>

          <div class="form-group col-6" v-show="this.initialEditUser">
            <label for="password">Password</label>
            <input
              @input="$v.user.password.$touch"
              :disabled="isProcessing"
              maxlength="30"
              minlength="8"
              id="password"
              v-model="user.password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
              autofocus
              autocomplete
            />
            <small v-if="$v.user.password.$error" class="text-danger">長度介於 8 -30</small>
          </div>

          <div class="form-group col-6" v-show="this.initialEditUser">
            <label for="password-check">Password Check</label>
            <input
              @input="$v.user.passwordCheck.$touch"
              :disabled="isProcessing"
              maxlength="30"
              minlength="8"
              id="password-check"
              v-model="user.passwordCheck"
              name="passwordCheck"
              type="password"
              class="form-control"
              placeholder="Password Check"
              required
              autofocus
              autocomplete
            />
            <small v-if="$v.user.passwordCheck.$error" class="text-danger">輸入的兩組密碼須相同</small>
          </div>

          <div v-show="this.initialEditUser" class="form-group col-12 mt-3">
            <a class="btn btn-primary col-6 py-2" href="#" @click.stop.prevent="formEditCancel">取消</a>

            <button
              type="submit"
              class="btn btn-primary col-6 py-2"
              :disabled="isProcessing || $v.$invalid"
              @click.stop.prevent="handleSubmit"
            >{{ this.isProcessing ? "處理中..." : "送出" }}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import adminAuthorizationAPI from "../../apis/main/authorization";
import { timeFromFilter, emptyImageFilter } from "../../utils/mixins";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  mixins: [timeFromFilter, emptyImageFilter],
  name: "AdminMemberForm",
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        Profile: {
          avatar: "",
          email: "",
          name: ""
        },
        account: "",
        orders: [],
        phone: "",
        role: ""
      })
    },
    initialOrders: {},
    initialEditUser: {
      type: Boolean
    },
    initialCreateMember: {
      type: Boolean
    }
  },
  data() {
    return {
      user: {
        Profile: {
          avatar: "",
          email: "",
          name: ""
        },
        account: "",
        phone: "",
        orders: [],
        password: "",
        passwordCheck: "",
        role: ""
      },
      editUser: this.initialEditUser,
      createMember: this.initialCreateMember,
      isProcessing: false
    };
  },
  validations: {
    user: {
      Profile: {
        name: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(20)
        }
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      passwordCheck: {
        sameAs: sameAs("password")
      }
    }
  },
  computed: {},
  watch: {
    initialUser(user) {
      this.user = {
        ...this.user,
        ...user
      };
    }
  },
  created() {},
  methods: {
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.dish.image = imageURL;
    },
    formEditCancel() {
      this.user = {
        Profile: {
          avatar: "",
          email: "",
          name: ""
        },
        account: "",
        phone: "",
        password: "",
        passwordCheck: "",
        orders: [],
        role: ""
      };
      this.$emit("after-form-edit-cancel");
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;
        if (
          !this.user.Profile.name ||
          !this.user.phone ||
          !this.user.password ||
          !this.user.passwordCheck
        ) {
          this.$swal({
            icon: "warning",
            title: "請填完所有必須資料"
          });
          return;
        }
        if (this.user.password !== this.user.passwordCheck) {
          this.$swal({
            icon: "warning",
            title: "密碼驗證不相同"
          });
          return;
        }

        const response = await adminAuthorizationAPI.signUp({
          account: this.user.phone,
          name: this.user.Profile.name,
          phone: this.user.phone,
          email: "",
          password: this.user.password,
          passwordCheck: this.user.passwordCheck
        });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: data.msg
        });

        this.formEditCancel();
        this.isProcessing = false;
      } catch (error) {
        this.$swal({
          icon: "warning",
          title: "無法取得資料，請稍後再試"
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
.form-check-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.table td,
.table th {
  padding: 0.4rem;
  vertical-align: middle;
}
.table-data {
  max-height: 160px;
  overflow-y: auto;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>