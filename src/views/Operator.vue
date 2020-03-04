<template>
  <div>
    <!-- <router-link :to="{ name: 'admin' }">Return to Admin</router-link> -->
    <h1>{{ operator.name }}</h1>
    <section>
      <p v-for="(value, name) in operatorWithoutInternals" :key="name">
        {{ name }}: {{ value }}
      </p>
    </section>

    <h2>Danger Zone</h2>
    <section class="border borderred-500 flex items-center justify-between">
      <ButtonDanger
        class="p-2 rounded mx-auto bgred-500 hover:bg-red-600 text-white focus:outline-none focus:shadow-outline"
        @click="confirmDeleteModalOpen = true"
      >
        Delete Shop
        <!-- This modal should send a request to archive a shop to the API
          If successful, remove from the displayed list.
          what TODO if unsuccessful? -->
        <ConfirmDeleteShopModal
          :show="confirmDeleteModalOpen"
          :operator="operator"
          @close="confirmDeleteModalOpen = false"
        >
        </ConfirmDeleteShopModal>
      </ButtonDanger>
    </section>
  </div>
</template>

<script>
import Api from '@/services/Api'
import ConfirmDeleteShopModal from '@/components/ConfirmDeleteShopModal'
import ButtonDanger from '@/components/BaseUI/ButtonDanger'

export default {
  name: 'Operator',
  components: {
    ConfirmDeleteShopModal,
    ButtonDanger
  },
  props: {
    operatorId: { type: String }
  },
  data() {
    return {
      confirmDeleteModalOpen: false,
      loading: true,
      operator: {} // for reactivity, populated on created hook
    }
  },
  computed: {
    operatorWithoutInternals() {
      const { _id, __v, ...restOfOperator } = this.operator
      return restOfOperator
    }
  },
  async created() {
    this.loading = true
    const { data: operator } = await Api.get(`/operators/${this.operatorId}`)
    this.operator = { ...operator }
    this.loading = false
  }
}
</script>

<style></style>
