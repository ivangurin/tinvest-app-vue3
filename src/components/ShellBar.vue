<template>
  <div class="p-grid">
    <div class="p-col-fixed">
      <router-link to="/">Home</router-link>
      <router-link class="p-ml-3" to="/positions">Positions</router-link>
      <router-link class="p-ml-3" to="/profit">Profit</router-link>
    </div>
    <div class="p-col"></div>
    <div class="p-col-fixed">
      <router-link to="/settings">Settings</router-link>&nbsp;
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  mounted() {},

  computed: {},

  methods: {},

  watch: {},

  components: {},
};
</script>  

<style scope>
</style>