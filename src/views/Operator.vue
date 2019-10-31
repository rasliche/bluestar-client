<template>
  <div>
    <router-link :to="{ name: 'admin' }">Return to Admin</router-link>
    <h1>This is a single operator</h1>
    <section>
      <p v-for="(value, name) in operatorWithoutInternals" :key="name">{{ name }}: {{ value }}</p>
    </section>

    <h2>Danger Zone</h2>
    <section class="border border-red flex items-center justify-between">
      <button 
        @click="confirmDeleteModalOpen = true"
        class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
        >
          Delete Shop
        <!-- This modal should send a request to archive a shop to the API
        If successful, remove from the displayed list.
        what TODO if unsuccessful? -->
        <ConfirmDeleteShopModal 
          :show="confirmDeleteModalOpen" 
          @close="confirmDeleteModalOpen = false"
          :operator="operator">
        </ConfirmDeleteShopModal>
    </button>
    </section>
  </div>
</template>

<script>
import Api from "../services/Api";
import ConfirmDeleteShopModal from "@/components/ConfirmDeleteShopModal"

export default {
  name: "operator",
  components: {
    ConfirmDeleteShopModal
  },
  data() {
    return {
      confirmDeleteModalOpen: false,
      loading: true,
      name: null,
      slug: null,
      programs: []
    };
  },
  computed: {
    operatorWithoutInternals() {
      const { _id, __v, ...restOfOperator} = this.operator
      return restOfOperator
    }
  },
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
