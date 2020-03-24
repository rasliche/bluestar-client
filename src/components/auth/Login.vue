<template>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="submit">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Login</h1>
      <BaseInput 
        label="Email"
        v-model="$v.formResponses.email.$model"
        type="text"
        autocomplete="section-login email"
      >
        <!-- :class="{ 'error-border': !$v.formResponses.email.required }" -->
        <p v-if="errors" class="absolute ml-2 bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.email.required" class="error">
            This field is required.
          </span>
        </p>
      </BaseInput>

      <BaseInput
        label="Password"
        v-model="$v.formResponses.password.$model"
        type="password"
        autocomplete="section-login password"
      >
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.password.required" class="error"
            >This field is required.</span
          >
        </p>
      </BaseInput>

      <section class="relative mb-3 pb-6">
        <div class="flex items-center justify-around">
          <ButtonPrimary
            type="submit"
            :disabled="uiState !== 'idle'"
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
import Api from '@/services/Api'
import { ButtonPrimary, BaseInput, SimpleSpinner } from '@/components/BaseUI'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  components: {
    ButtonPrimary,
    BaseInput,
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
    ...mapActions('notification', ['add']),
    ...mapActions('user', ['setUserData', 'getUserScores']),
    ...mapActions('auth', ['authUser']),
    async submit() {
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
            data: { token, ...userData }
          } = await Api.post('/auth/login', authData)
          clearTimeout(spinnerTimer)
          this.authUser(token)
          this.setUserData(userData)
          this.getUserScores()
          this.add({
            type: 'success',
            text: 'You have been logged in.'
          })
        } catch (e) {
          // const notification = {
          //   type: 'error',
          //   text: `There was an error logging in: ${e.message}`
          // }
          // this.add(notification)
          clearTimeout(spinnerTimer)
          this.uiState = 'idle'
          this.formFeedback = e.response.data
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
  @apply px-2 border border-red-500 rounded;
}
</style>
