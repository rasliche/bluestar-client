<template>
  <div>
    <router-link :to="{ name: 'admin' }">Return to Admin</router-link>
    <h1>This is a single operator</h1>
    <p>Name: {{ name }}</p>
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
  async created() {
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
