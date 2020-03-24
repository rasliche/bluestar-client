<template>
  <main class="user-dashboard">
    <PageHeading>Dashboard</PageHeading>
    <section>
      <p class="text-2xl">{{ name }}</p>
      <p>{{ email }}</p>
      <p v-if="isAdmin">You are an admin.</p>
    </section>
    <section class="w-2/3 mx-auto">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Associated Operators</h1>
      <p>
        <span v-if="operators.length">{{ operators }}</span>
        <span v-else>You haven't joined any organizations yet. Add one!</span>
      </p>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="joinShop">
        <section class="relative mb-6 pb-3">
          <SearchSelect 
            v-model="shopToJoin"
            :options="operatorNames"
            :filter-function="applySearchFilter"
          ></SearchSelect>
        </section>
        <section v-show="shopToJoin !== null" class="relative mb-6 pb-3">
          <label
            for="shop-password"
            class="block text-blue-800 font-bold text-sm mb-2"
            >Shop Password</label
          >
          <input
            id="shop-password"
            v-model="newShopPassword"
            type="text"
            name="shop-password"
            class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p v-if="errors" class="absolute bottom-0 inset-x-0">
            <span v-if="!$v.formResponses.email.required" class="error">
              This field is required.
            </span>
          </p>
        </section>
      </form>
    </section>
    <section class="border-t-2 border-blue">
      <p>Lesson Scores:</p>
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
import { PageHeading, SearchSelect } from '@/components/BaseUI'
import { mapGetters } from 'vuex'
import Api from '@/services/Api'

export default {
  name: 'Me',
  components: {
    PageHeading,
    SearchSelect,
  },
  data() {
    return {
      status: 'loading', // success, failure
      updatePasswordModal: false,
      userScores: undefined,
      operatorOptions: [],
      shopToJoin: null,
    }
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'name',
      'email',
      'operators',
      'lessonScores',
      'isAdmin'
    ]),
    operatorNames() {
      return this.operatorOptions.map(o => o.name)
    }
  },
  async created() {
    try {
      const { data: userScores } = await Api.get(`user/${this.userId}/scores`)
      this.status = 'success'
      this.userScores = userScores
      const { data: operatorOptions } = await Api.get(`operators`)
      this.operatorOptions = operatorOptions
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    applySearchFilter(search, options) {
      return options.filter(option => {
        return option.toLowerCase().startsWith(search.toLowerCase())
      })
    }
  },
}
</script>
