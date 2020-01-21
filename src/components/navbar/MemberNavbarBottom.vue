<template>
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <router-link :to="{name: 'member-home'}">首頁</router-link>
    <router-link :to="{name: 'member-meal'}">菜單</router-link>
    <router-link :to="{name: 'member-myorders'}">結帳</router-link>
    <router-link :to="{name: 'member-select-table'}">會員</router-link>
  </nav>
</template>

<script>
export default {
  name: "MemberNavbarBottom",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>