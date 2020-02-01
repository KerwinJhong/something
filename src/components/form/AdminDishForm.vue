<template>
  <form class="row h-100" v-show="loadedCategories && loadedTags && loadedDish">
    <h1 class="text-center mb-2 col-12">{{this.dishTitle}}</h1>
    <div class="form-group col-6">
      <label for="name">餐點名稱</label>
      <input
        @input="$v.dish.name.$touch"
        :disabled="isProcessing"
        maxlength="20"
        minlength="1"
        id="name"
        v-model="dish.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
        autofocus
      />
      <small v-if="$v.dish.name.$error" class="text-danger">長度介於 1 - 20</small>
    </div>

    <div class="form-group col-6">
      <label for="categoryId">類型</label>
      <select
        @input="$v.dish.CategoryId.$touch"
        :disabled="isProcessing"
        id="categoryId"
        v-model="dish.CategoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >{{ category.name }}</option>
      </select>
      <small v-if="$v.dish.CategoryId.$error" class="text-danger">請選擇餐點類別</small>
    </div>

    <div class="form-group col-6">
      <label class>標籤</label>
      <div class="form-inline mb-2">
        <input
          class="form-control mr-sm-2"
          type="text"
          name="searchTag"
          v-model="tag"
          :disabled="isProcessing"
          placeholder="Tag name"
        />
        <button
          type="button"
          class="btn btn-primary"
          :disabled="isProcessing"
          @click.stop.prevent="searchTag"
        >搜尋</button>
      </div>
      <button
        v-for="tag in tagsDisplay"
        :key="tag.id"
        class="btn btn-primary mr-2 mt-2"
        :disabled="isProcessing"
        @click.stop.prevent="addTag(tag)"
      >{{ tag.name }}</button>
    </div>

    <div class="form-group col-6">
      <label class="d-block" for="image">相片</label>
      <img v-if="dish.image" :src="dish.image" class="img-thumbnail" width="200" height="200" />

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

    <div class="form-group col-6">
      <label class="mr-4" for="description">內容</label>
      <button
        v-for="tag in this.dish.tags"
        :key="tag.id"
        class="btn btn-primary mr-2 mb-2"
        :disabled="isProcessing"
        @click.stop.prevent="removeTag(tag)"
      >#{{ tag.name }}</button>
      <textarea
        id="description"
        v-model="dish.description"
        :disabled="isProcessing"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group col-6">
      <label for="price">價格</label>
      <input
        id="price"
        @input="$v.dish.price.$touch"
        v-model="dish.price"
        type="number"
        :disabled="isProcessing"
        class="form-control"
        name="price"
        required
        autofocus
      />
      <small v-if="$v.dish.price.$error" class="text-danger">請輸入價格</small>
    </div>

    <div class="form-group col-12 mb-0">
      <button
        class="btn btn-primary col-6 py-3"
        :disabled="isProcessing"
        @click.stop.prevent="$router.back()"
      >回上一頁</button>

      <button
        type="submit"
        class="btn btn-primary col-6 py-3"
        :disabled="isProcessing || $v.$invalid"
        @click.stop.prevent="handleSubmit"
      >{{ this.isProcessing ? "處理中..." : "送出" }}</button>
    </div>
  </form>
</template>

<script>
import adminCategoryAPI from "../../apis/admin/category";
import adminDishAPI from "../../apis/admin/dish";
import adminTagAPI from "../../apis/admin/tag";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AdminDishForm",
  props: {
    dishTitle: {
      type: String
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dish: {
        name: "",
        CategoryId: "",
        price: "",
        option: "",
        tags: [],
        description: "",
        image: "",
        addTags: [],
        removeTags: []
      },
      originTags: [],
      categories: [],
      allTags: [],
      tag: "",
      searchResult: [],
      tagSelected: [],
      loadedCategories: false,
      loadedTags: false,
      loadedDish: false
    };
  },
  validations: {
    dish: {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(20)
      },
      CategoryId: {
        required
      },
      price: {
        required
      }
    }
  },
  computed: {
    tagsDisplay: function() {
      let tagBox = [...this.searchResult, ...this.allTags];
      const filtered = tagBox.filter(function({ id, name }) {
        const key = `${id}${name}`;
        return !this.has(key) && this.add(key);
      }, new Set());
      let e = filtered.slice(0, 6);
      return e;
    }
  },
  watch: {},
  created() {
    this.fetchCategories();
    this.fetchTags();
    if (typeof this.$route.params.id === "number") {
      const { id } = this.$route.params;
      this.fetchDish(id);
    } else {
      this.loadedDish = true;
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await adminCategoryAPI.categories.get();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.loadedCategories = true;
      } catch (error) {
        this.loadedCategories = true;
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async fetchTags() {
      try {
        const response = await adminTagAPI.tag.get();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        data.tags.map(tag => {
          this.allTags.push({ id: tag.id, name: tag.name });
        });
        this.loadedTags = true;
      } catch (error) {
        this.loadedTags = true;
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async fetchDish(id) {
      try {
        const { data, statusText } = await adminDishAPI.dish.get(id);
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.dish.name = data.dish.name;
        this.dish.CategoryId = data.dish.CategoryId;
        this.dish.price = data.dish.price;
        data.dish.hasTags.map(tag => {
          this.dish.tags.push({ id: tag.id, name: tag.name });
          this.originTags.push({ id: tag.id, name: tag.name });
        });
        this.dish.description = data.dish.description;
        this.dish.image = data.dish.image;
        this.loadedDish = true;
      } catch (error) {
        this.loadedDish = true;
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "找不到菜單，請稍後再試",
          text: ""
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async searchTag() {
      try {
        const response = await adminTagAPI.tag.search({ name: this.tag });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        if (data.length === 0) {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            icon: "warning",
            title: "未找到相關標籤",
            text: ""
          });
        }

        this.searchResult = [];

        data.map(tag => {
          this.searchResult.push({ id: tag.id, name: tag.name });
        });
      } catch (error) {
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.dish.image = imageURL;
    },
    addTag(tag) {
      var result = this.dish.tags
        .map(item => {
          return item.name;
        })
        .indexOf(tag.name);

      if (result === -1) {
        this.dish.tags.unshift(tag);
      }
    },
    removeTag(tag) {
      this.dish.tags = this.dish.tags.filter(e => e !== tag);
    },
    handleSubmit() {
      if (!this.dish.name) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "請填寫餐點名稱",
          text: ""
        });
        return;
      } else if (!this.dish.CategoryId) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "請選擇餐點類別",
          text: ""
        });
        return;
      }
      
      this.$emit("after-submit", this.dish);
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>