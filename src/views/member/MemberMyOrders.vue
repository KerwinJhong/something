<template>
  <div>
    <h2 class="text-center mb-3">訂餐紀錄</h2>
    <Spinner v-if="isLoading" />
    <div v-else id="accordionOrder">
      <div class="card" v-for="order in orders" :key="order.id">
        <div class="card-header" :id="`heading${order.id}`">
          <h5 class="mb-0" style="position:relative;">
            <button
              class="btn btn-link collapsed w-100 p-0"
              data-toggle="collapse"
              :data-target="`#collapse${order.id}`"
              aria-expanded="true"
              :aria-controls="`collapse${order.id}`"
            >
              <div class="d-flex justify-content-between">
                <p>{{order.createdAt | timeFrom}}</p>
                <p>消費金額：{{order.amount}}</p>
              </div>
            </button>
          </h5>
        </div>

        <div
          :id="`collapse${order.id}`"
          class="collapse"
          :aria-labelledby="`heading${order.id}`"
          data-parent="#accordionOrder"
        >
          <div
            class="card-body border border-dark d-flex justify-content-between"
            v-for="dish in order.sumOfDishes"
            :key="dish.id"
          >
            <p>{{dish.name}}</p>
            <p>數量：{{dish.DishCombination.perQuantity}}</p>
          </div>
        </div>
      </div>
    </div>

    <MemberNavbarBottom />
  </div>
</template>

<script>
import Spinner from "../../components/Spinner/Spinner";
import MemberNavbarBottom from "../../components/Navbar/MemberNavbarBottom";
import adminMemberAPI from "../../apis/member/order";
import { timeFromFilter } from "../../utils/mixins";

export default {
  name: "MemberMyOrders",
  mixins: [timeFromFilter],
  components: {
    Spinner,
    MemberNavbarBottom
  },
  data() {
    return {
      orders: [],
      isLoading: true
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await adminMemberAPI.get();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orders = data.orders;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        // eslint-disable-next-line
        console.log("error", error);
      }
    }
  }
};
</script>