<template>
  <main class="user-dashboard">
    <PageHeading>Dashboard</PageHeading>
    <section>
      <p class="text-2xl">{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <p v-if="user.isAdmin">You are an admin.</p>
    </section>
    <section class="mx-auto">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Associated Operators</h1>
      <div>
        <div class="flex flex-wrap" v-if="user.operators.length">
          <div class="w-full mx-2 md:w-1/4" v-for="record in user.operators" :key="record._id">
            <p class="w-full">{{ record.operator.name }}</p>
            <div class="flex justify-between w-full h-5 text-sm invisible hover:visible">
              <!-- v-if="record.canManage" -->
              <span>manager</span>
              <span>leave</span>
            </div>
          </div>
        </div>
        <p v-else>You haven't joined any organizations yet. Add one!</p>
      </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="requestJoinShop">
          <SearchSelect
            label="Select a Shop"
            v-model="shopToJoin"
            :options="operatorNames"
            :filter-function="applySearchFilter"
          ></SearchSelect>
          <BaseInput
            v-show="shopToJoin !== null"
            label="Shop Password"
            id="shop-password"
            v-model.trim="$v.newShopPassword.$model"
            type="text"
            name="shop-password"
          >
            <p v-if="errors" class="absolute bottom-0 inset-x-0">
              <span v-if="!$v.newShopPassword.required" class="error">
                This field is required.
              </span>
              <!-- TODO: Incorrect password -->
              <span v-if="!$v.newShopPassword.isCorrect" class="error">
                Password is incorrect.
              </span>
            </p>
          </BaseInput>
          <ButtonPrimary v-show="shopToJoin !== null && newShopPassword !== null" type="submit">
            Join
          </ButtonPrimary>
      </form>
    </section>
    <section class="w-2/3 mx-auto">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Lesson Scores</h1>
      <div v-if="status === 'loading'">
        <div>
          <p>Loading...</p>
        </div>
      </div>
      <div v-if="status === 'success'">
        <div
          v-for="score in userScores"
          :key="score._id"
          class="score m-auto w-5/6 flex flex-row"
        >
          <p class="mr-auto self-start">{{ score.lesson.title }}</p>
          <p class="ml-auto self-end">{{ score.score }}%</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Api from '@/services/Api'
import { PageHeading, SearchSelect, ButtonPrimary, BaseInput } from '@/components/BaseUI'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapGetters, mapActions } from 'vuex'

// Custom Validator
function isCorrect() {
  const fullShop = this.operators.find(o => o.name === this.shopToJoin)
  return fullShop.password === this.newShopPassword
}

export default {
  name: 'Me',
  components: {
    PageHeading,
    SearchSelect,
    ButtonPrimary,
    BaseInput
  },
  data() {
    return {
      status: 'loading', // success, failure
      updatePasswordModal: false,
      userScores: undefined,
      shopToJoin: null,
      errors: false,
      formTouched: true,
      newShopPassword: null,
    }
  },
  validations: {
    newShopPassword: {
      required,
      isCorrect
    }
  },
  watch: {
    shopToJoin: function (newValue, oldValue) {
      this.newShopPassword = null
      this.errors = null
      this.$v.$reset()
      console.log(newValue)
    }
  },
  computed: {
    ...mapState('operator', ['operators']),
    ...mapGetters('operator', ['operatorByName', 'operatorNames']),
    ...mapState('user', ['user']),
  },
  async created() {
    try {
      const { data: userScores } = await Api.get(`user/${this.user._id}/scores`)
      this.status = 'success'
      this.userScores = userScores
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions('user', ['joinShop']),
    applySearchFilter(search, options) {
      return options.filter(option => {
        return option.toLowerCase().startsWith(search.toLowerCase())
      })
    },
    requestJoinShop() {
      this.formTouched = !this.$v.newShopPassword.$dirty
      this.errors = this.$v.newShopPassword.$error
      if (this.errors === false && this.formTouched === false) {
        const { _id: shopId} = this.operatorByName(this.shopToJoin)
        this.joinShop({
          shopId,
          shopPassword: this.newShopPassword
        })
      }
    }
  },
}
</script>
