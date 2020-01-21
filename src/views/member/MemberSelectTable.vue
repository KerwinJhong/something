<template>
  <div>
    <h1>MemberSelectTable</h1>
    <MemberNavbarBottom />
  </div>
</template>

<script>
import MemberNavbarBottom from "../../components/navbar/MemberNavbarBottom";
import adminMemberAPI from "../../apis/member/order";

export default {
  name: "MemberMyOrders",
  components: {
    MemberNavbarBottom
  },
  data() {
    return {};
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await adminMemberAPI.get();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // eslint-disable-next-line
        console.log("data", data);
      } catch (error) {
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>