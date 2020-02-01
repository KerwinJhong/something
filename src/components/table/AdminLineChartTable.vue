<template>
  <div class="col-4 border border-secondary rounded shadow-lg">
    <button
      type="button"
      class="btn btn-outline-primary mt-2 mr-2"
      :disabled="isProcessing"
      @click.stop.prevent="fetchDashboard('weekly')"
    >前七天</button>
    <button
      type="button"
      class="btn btn-outline-primary mt-2 mr-2"
      :disabled="isProcessing"
      @click.stop.prevent="fetchDashboard('monthly')"
    >前一個月</button>
    <h3 class="text-center mt-2">HotProducts</h3>
    <AreaChart class="my-3" :initial-data="hotProducts" />
    <AdminDashBoardTable :initial-category="hotProducts" />
  </div>
</template>

<script>
import AreaChart from "../../components/Chart/AreaChart";
import AdminDashBoardTable from "../../components/Table/AdminDashBoardTable";
import adminDashboardAPI from "../../apis/admin/dashboard";

export default {
  name: "AdminDashBoardLineChart",
  components: {
    AreaChart
  },
  props: {
    initialType: {
      type: String
    }
  },
  data() {
    return {
      state: {
        date: ""
      },
      hotFive: [],
      isLoading: true,
      isProcessing: false
    };
  },
  created() {
    this.socket.emit("init");
    const { range = "weekly" } = this.$route.query;
    this.fetchDashboard({ range });
    this.settingDay();
  },
  beforeRouteUpdate(to, from, next) {
    const { range = "weekly" } = to.query;
    this.fetchDashboard({ range });
    next();
  },
  methods: {
    async fetchDashboard(range) {
      try {
        this.isLoading = true;
        this.hotProducts = [];
        this.hotTags = [];
        this.hotMembers = [];
        const response = await adminDashboardAPI.getPieChart({range:range});
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        for (var productprop in data.hotProducts) {
          this.hotProducts.push(data.hotProducts[productprop]);
        }
        for (var tagprop in data.hotTags) {
          this.hotTags.push(data.hotTags[tagprop]);
        }
        for (var memberrop in data.hotMembers) {
          this.hotMembers.push(data.hotMembers[memberrop]);
        }

        this.hotProducts.map((e, index) => (e.id = index + 1));
        this.hotTags.map((e, index) => (e.id = index + 1));
        this.hotMembers.map((e, index) => (e.id = index + 1));

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.$swal({
          icon: "warning",
          title: "無法取得資料，請稍後再試"
        });
        // eslint-disable-next-line
        console.log("error", error);
      }
    },
    async afterFetchData(info) {
      this.isProcessing = true;
      try {
        const response = await adminDashboardAPI.getLineChart({
          id: 1,
          type: info.type,
          range: `weekly`
        });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // eslint-disable-next-line
        console.log("data", data);
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
.dash-board {
  height: calc(100vh - 110px);
  overflow-y: auto;
}
.small {
  padding-right: 70px;
  padding-left: 70px;
}
</style>