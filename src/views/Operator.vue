<template>
  <div>
    <router-link :to="{ name: 'admin' }">Return to Admin</router-link>
    <h1>This is a single operator</h1>
    <section>
      <p v-for="(value, name) in operatorWithoutInternals" :key="name">{{ name }}: {{ value }}</p>
    </section>
    <button @click="confirmDeleteModalOpen = true">
        Delete Shop {{ operator }}
        <!-- This modal should send a request to archive a shop to the API
        If successful, remove from the displayed list.
        what TODO if unsuccessful? -->
        <ConfirmDeleteShopModal 
          :show="confirmDeleteModalOpen" 
          @close="confirmDeleteModalOpen = false"
          :operator="operator">
        </ConfirmDeleteShopModal>
    </button>
  </div>
</template>

<script>
import Api from "../services/Api";

export default {
  data() {
    return {
      loading: true,
      name: null,
      slug: null,
      programs: []
    };
  },
  async mounted() {
    this.loading = true;
    const { data } = await Api.get(
      `http://localhost:3000/api/operators/${this.$route.params.slug}`
    );
    this.name = data.name;
    this.slug = data.slug;
    this.programs = data.programs;
    this.loading = false;
  }
};
</script>

<style></style>
