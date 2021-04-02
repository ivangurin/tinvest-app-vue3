<template>
  <MainLayout v-bind:settings="settings" v-on:updateSettings="updateSettings" />
</template>

<script>
import MainLayout from "@/layouts/MainLayout";

export default {
  name: "app",
  data() {
    return {
      settings: {
        url: "",
        token: "",
      },
    };
  },

  mounted() {
    let jsonSettings = localStorage.getItem("settings");

    if (jsonSettings !== null) {
      this.settings = JSON.parse(jsonSettings);
    }
  },

  computed: {},

  methods: {
    updateSettings(newSettings) {
      this.settings = newSettings;
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },
  },
  watch: {},

  components: {
    MainLayout,
  },
};
</script>

<style scoped>
</style>