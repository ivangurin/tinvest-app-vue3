<template>
  <div class="p-ml-3 p-mt-3 p-mr-3">
    <ShellBar />
    <div class="p-grid">
      <div class="p-col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import ShellBar from "@/components/ShellBar";

export default {
  name: "main-layout",

  mounted() {},

  computed: {},

  methods: {},

  watch: {},

  components: {
    ShellBar,
  },
};
</script>
