<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">
      <h1 class="text-center pb-3">Login</h1>
      <section class="relative mb-6 pb-3">
        <label
          for="femail"
          class="block text-blue-darker font-bold text-sm mb-2"
          >Email</label
        >
        <input
          id="femail"
          v-model="$v.formResponses.email.$model"
          type="text"
          name="femail"
          autocomplete="section-login email"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span v-if="!$v.formResponses.email.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label
          for="fpassword"
          class="block text-blue-darker font-bold text-sm mb-2"
          >Password</label
        >
        <input
          id="fpassword"
          v-model="$v.formResponses.password.$model"
          type="password"
          name="fpassword"
          autocomplete="section-login current-password"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span v-if="!$v.formResponses.password.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

      <section class="relative mb-3 pb-6">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="p-2 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline"
            :disabled="uiState !== 'idle'"
            @click.prevent="submitLoginForm"
          >
            <div
              v-if="uiState === 'pending'"
              class="inline-block simple-spinner"
            ></div>
            Login
          </button>
          <a
            href="#"
            class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            >Forgot password?</a
          >
        </div>
        <p v-if="formFeedback" class="absolute pin-b pin-x">
          <span class="error">{{ formFeedback }}</span>
        </p>
      </section>
    </form>
    <!-- TODO: Style this feedback
    {{ formFeedback }}
    {{ uiState }} -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Api from '@/services/Api'
import { mapActions } from 'vuex'

export default {
  components: {
    // Alert
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
        const spinnerTimer = setTimeout(function() {
          this.uiState = 'pending'
        }, 500)
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
          console.log(error.response)
          if (error.response.status === 400) {
            this.uiState = 'idle'
            this.formFeedback = error.response.data
          }
          console.log(error)
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red text-sm;
}

.error-border {
  @apply border-red;
}

.simple-spinner {
  height: 48px;
  width: 48px;
  border: 5px solid rgba(150, 150, 150, 0.2);
  border-radius: 50%;
  border-top-color: rgb(150, 150, 150);
  animation: rotate 1s 0s infinite ease-in-out alternate;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
