<template>
  <div class="container h-100">
    <AdminDishForm
      :dish-title="title"
      :is-processing="isProcessing"
      :loaded-dish="loadedDish"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminDishForm from "../../components/Form/AdminDishForm";
import adminDishAPI from "../../apis/admin/dish";

export default {
  name: "AdminDishNew",
  components: {
    AdminDishForm
  },
  data() {
    return {
      title: "新增菜單",
      isProcessing: false,
      loadedDish: false
    };
  },
  computed: {},
  created() {},
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await adminDishAPI.dish.post(formData);
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$router.push({
          name: "admin-manage-meal",
          query: { categoryId: formData.CategoryId }
        });
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "成功建立菜單",
          text: ""
        });
      } catch (error) {
        this.isProcessing = false;
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          icon: "warning",
          title: "建立菜單失敗，請稍後再試",
          text: ""
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>