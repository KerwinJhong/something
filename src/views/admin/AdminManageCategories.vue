<template>
  <div>
    <AdminNavbarTop :initial-title="title" />

    <div class="row">
      <AdminManageTabs />

      <div class="col-4">
        <form class="my-2">
          <div class="form-row">
            <div class="col-auto">
              <input type="text" v-model="newCategoryName" class="form-control" placeholder="新增分類" />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="createCategory"
                :disabled="isProcessing"
              >新增</button>
            </div>
          </div>
        </form>
      </div>

      <div class="col-4"></div>

      <Spinner class="col-12" v-if="isLoading" />
      <template v-else>
        <AdminCategoryTable
          :initial-category="leftTableCategory"
          @after-editing-category="toggleIsEditing"
          @after-cancel-edit-category="handleCancel"
          @after-update-category="updateCategory"
          @after-delete-category="deleteCategory"
        />
        <AdminCategoryTable
          :initial-category="rightTableCategory"
          @after-editing-category="toggleIsEditing"
          @after-cancel-edit-category="handleCancel"
          @after-update-category="updateCategory"
          @after-delete-category="deleteCategory"
        />
      </template>
    </div>

    <AdminNavbarBottm />
  </div>
</template>

<script>
import AdminNavbarTop from "../../components/Navbar/AdminNavbarTop";
import AdminNavbarBottm from "../../components/Navbar/AdminNavbarBottm";
import AdminManageTabs from "../../components/Tabs/AdminManageTabs";
import AdminCategoryTable from "../../components/Table/AdminCategoryTable";
import Spinner from "../../components/Spinner/Spinner";
import adminCategoryAPI from "../../apis/admin/category";
import io from "socket.io-client";

export default {
  name: "AdminManageCategories",
  components: {
    AdminNavbarTop,
    AdminNavbarBottm,
    AdminManageTabs,
    Spinner,
    AdminCategoryTable
  },
  data() {
    return {
      title: "菜單管理",
      newCategoryName: "",
      categories: [],
      isLoading: true,
      isProcessing: false,
      socket: io("https://recusplatform.herokuapp.com/")
    };
  },
  computed: {
    leftTableCategory: function() {
      let categoriesLength = this.categories.length - 1;
      let box = [];
      for (let i = 0; i <= categoriesLength; i++) {
        if (i === 0 || i % 2 === 0) {
          box.push(this.categories[i]);
        }
      }
      return box;
    },
    rightTableCategory: function() {
      let categoriesLength = this.categories.length - 1;
      let box = [];
      for (let i = 0; i <= categoriesLength; i++) {
        if (i % 2 !== 0) {
          box.push(this.categories[i]);
        }
      }
      return box;
    }
  },
  created() {
    // add socket
    this.socket.emit("init");
    this.fetchcategories();
  },
  methods: {
    async fetchcategories() {
      try {
        const response = await adminCategoryAPI.categories.get();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories.map(category => ({
          ...category,
          used: category.Dishes.length || 0,
          isEditing: false
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async createCategory() {
      try {
        this.processing = true;
        if (this.newCategoryName.trim() === "") {
          this.$swal({
            icon: "warning",
            title: "名稱不可空白"
          });
          return;
        }
        const { data, statusText } = await adminCategoryAPI.category.post({
          name: this.newCategoryName
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories.push({
          ...data.category,
          isEditing: false
        });

        this.newCategoryName = "";
        this.isProcessing = false;
        this.fetchcategories();

        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "成功新增標籤",
          text: ""
        });
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "無法新增標籤，請稍後再試",
          text: ""
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) return category;
        // 如果迴圈中的 category.id 是欲修改的 categoryId 則改變 isEditing 的值
        return {
          ...category,
          nameCached: category.name,
          isEditing: !category.isEditing
        };
      });
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id !== categoryId) {
          return category;
        }

        // 將原本的類別名稱還回去
        return {
          ...category,
          name: category.nameCached
        };
      });
      this.toggleIsEditing(categoryId);
    },
    async updateCategory({ categoryId, name }) {
      try {
        // eslint-disable-next-line
        const { data, statusText } = await adminCategoryAPI.category.put({
          categoryId,
          name
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.toggleIsEditing(categoryId);
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "無法更新標籤，請稍後再試",
          text: ""
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        // eslint-disable-next-line
        const { data, statusText } = await adminCategoryAPI.category.delete(
          categoryId
        );

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = this.categories.filter(
          category => category.id !== categoryId
        );

        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "成功刪除標籤",
          text: ""
        });
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "無法刪除標籤，請稍後再試",
          text: ""
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>