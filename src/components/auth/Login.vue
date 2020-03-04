<template>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="submitLoginForm">
      <h1 class="text-center pb-3">Login</h1>
      <section class="relative mb-6 pb-3">
        <label
          for="femail"
          class="block text-blue-800 font-bold text-sm mb-2"
          >Email</label
        >
        <input
          id="femail"
          v-model="$v.formResponses.email.$model"
          type="text"
          name="femail"
          autocomplete="section-login email"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.email.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label
          for="fpassword"
          class="block text-blue-800 font-bold text-sm mb-2"
          >Password</label
        >
        <input
          id="fpassword"
          v-model="$v.formResponses.password.$model"
          type="password"
          name="fpassword"
          autocomplete="section-login current-password"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.password.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

      <section class="relative mb-3 pb-6">
        <div class="flex items-center justify-between">
          <ButtonPrimary
            type="submit"
            :disabled="uiState !== 'idle'"
            @click.prevent="submitLoginForm"
          >
            <SimpleSpinner
              v-if="uiState === 'pending'"
            ></SimpleSpinner>
            <template v-else>
              Login
            </template>
          </ButtonPrimary>
          <a
            href="#"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 underline"
            >Forgot password?</a
          >
        </div>
        <p v-if="formFeedback" class="absolute bottom-0 inset-x-0">
          <span class="error">{{ formFeedback }}</span>
        </p>
      </section>
    </form>
  </div>
</template>

<script>
import { ButtonPrimary, SimpleSpinner } from '@/components/BaseUI'
import { required } from 'vuelidate/lib/validators'
import Api from '@/services/Api'
import { mapActions } from 'vuex'

export default {
  components: {
    ButtonPrimary,
    SimpleSpinner
  },
  data() {
    return {
      formFeedback: null,
      uiState: 'idle',
      errors: false,
      formTouched: true,
      formResponses: {
        email: null,
        password: null
      }
    }
  },
  validations: {
    formResponses: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    ...mapActions('user', ['setUserData', 'getUserScores']),
    ...mapActions('auth', ['authUser']),
    async submitLoginForm() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      if (
        this.errors === false &&
        this.formTouched === false &&
        this.uiState !== 'pending'
      ) {
        const authData = {
          email: this.formResponses.email,
          password: this.formResponses.password
        }
        const spinnerTimer = setTimeout(() => {
          this.uiState = 'pending'
        }, 750)
        try {
          const {
            data: { token, _v, ...userData }
          } = await Api.post('/auth/login', authData)
          clearTimeout(spinnerTimer)
          this.authUser(token)
          this.setUserData(userData)
          this.getUserScores()
          this.setAlert({
            type: 'success',
            text: 'You have been logged in.'
          })
        } catch (error) {
          console.log(error)
          this.uiState = 'idle'
          this.formFeedback = error.response.data
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red-500 text-sm;
}

.error-border {
  @apply border-red-500;
}
</style>
