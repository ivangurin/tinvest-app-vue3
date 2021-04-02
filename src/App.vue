<template>
  <MainLayout />
</template>

<script>
import MainLayout from "@/layouts/MainLayout";

export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("init");
  },
  computed: {},
  methods: {},
  watch: {},
  components: {
    MainLayout,
  },
};
</script>

<style scoped>
</style>