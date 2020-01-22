<template>
  <div>
    <AdminNavbarTop :initial-title="title" />

    <Spinner v-if="loadedCategories && loadedDish" />
    <template v-else>
      <AdminManageTabs />

      <div>
        <AdminManageMealTable
          :initial-categories="categories"
          :initial-dishes="dishes"
          @after-delete-dish="afterDeleteDish"
        />
      </div>
    </template>
    <AdminNavbarBottm />
  </div>
</template>

<script>
import AdminNavbarTop from "../../components/navbar/AdminNavbarTop";
import AdminNavbarBottm from "../../components/navbar/AdminNavbarBottm";
import AdminManageMealTable from "../../components/table/AdminManageMealTable";
import AdminManageTabs from "../../components/tabs/AdminManageTabs";
import Spinner from "../../components/spinner/Spinner";
import adminDishAPI from "../../apis/admin/dish";
import adminCategoryAPI from "../../apis/admin/category";

export default {
  components: {
    AdminNavbarTop,
    AdminNavbarBottm,
    AdminManageMealTable,
    AdminManageTabs,
    Spinner
  },
  data() {
    return {
      title: "菜單管理",
      categories: [],
      dishes: [],
      loadedCategories: true,
      loadedDish: true
    };
  },
  computed: {},
  created() {
    const { categoryId = 1 } = this.$route.query;
    this.fetchCategories();
    this.fetchDishes({ categoryId });
  },
  beforeRouteUpdate(to, from, next) {
    const { categoryId = 1 } = to.query;
    this.fetchDishes({ categoryId });
    next();
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
        this.loadedCategories = false;
      } catch (error) {
        this.loadedCategories = false;
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async fetchDishes(categoryId) {
      try {
        const response = await adminDishAPI.dishes.get(categoryId);
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.dishes = [...data.dishes];
        this.loadedDish = false;
      } catch (error) {
        this.loadedDish = false;
        this.$swal({
          icon: "warning",
          title: "無法取得資料，請稍後再試"
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async afterDeleteDish(dishId) {
      try {
        const response = await adminDishAPI.dish.delete(dishId);
        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.dishes = this.dishes.filter(dish => dish.id !== dishId);

        this.$swal({
          icon: "success",
          title: data.msg
        });
      } catch (error) {
        this.$swal({
          icon: "warning",
          title: "無法取得資料，請稍後再試"
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>