<template>
  <div class="p-ml-3 p-mt-3 p-mr-3">
    <ShellBar />
    <router-view v-slot="{ Component }">
      <keep-alive include="profit">
        <component :is="Component" :key="$route.fullPath"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import ShellBar from "@/components/ShellBar";

export default {
  name: "main-layout",

  mounted() {},

  computed: {},

  methods: {
    test(component) {
      console.log(component);
    },
  },

  watch: {},

  components: {
    ShellBar,
  },
};
</script>
