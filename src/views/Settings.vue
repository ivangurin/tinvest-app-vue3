<template>
  <div>
    <h2>Settings</h2>

    <div class="p-field p-grid">
      <label for="url" class="p-col-fixed" style="width: 100px">URL</label>
      <div class="p-col">
        <InputText
          id="url"
          type="text"
          style="width: 500px"
          v-model="localSettings.url"
          v-on:input="updateSettings"
        />
      </div>
    </div>

    <div class="p-field p-grid">
      <label for="token" class="p-col-fixed" style="width: 100px">Token</label>
      <div class="p-col">
        <InputText
          id="token"
          type="text"
          style="width: 500px"
          v-model="localSettings.token"
          v-on:input="updateSettings"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",

  data() {
    return {
      localSettings: {},
    };
  },

  async mounted() {
    this.localSettings = await this.$store.getters.settings;
  },

  computed: {},

  methods: {
    updateSettings() {
      this.$store.commit("updateSettings", this.localSettings);
    },
  },

  watch: {},

  components: {},
};
</script>