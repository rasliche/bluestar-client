<template>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="submitRegisterForm">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Register</h1>
      <section class="relative mb-6 pb-3">
        <label for="fname" class="block text-blue-800 font-bold text-sm mb-2"
          >Name</label
        >
        <input
          id="fname"
          v-model="$v.formResponses.name.$model"
          type="text"
          name="fname"
          autocomplete="section-register name"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.name.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

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
          autocomplete="section-register email"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.email.required" class="error"
            >This field is required.
          </span>
          <span v-if="!$v.formResponses.email.minLength" class="error"
            >Field must have at least
            {{ $v.formResponses.email.$params.minLength.min }} characters.</span
          >
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label
          for="fpassword1"
          class="block text-blue-800 font-bold text-sm mb-2"
          >Password</label
        >
        <input
          id="fpassword1"
          v-model="$v.formResponses.password1.$model"
          type="password"
          name="fpassword1"
          autocomplete="section-register new-password"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.password1.required" class="error"
            >This field is required.
          </span>
          <span v-if="!$v.formResponses.password1.minLength" class="error"
            >Field must have at least
            {{ $v.formResponses.password1.$params.minLength.min }}
            characters.</span
          >
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label
          for="fpassword2"
          class="block text-blue-800 font-bold text-sm mb-2"
          >Re-type Password</label
        >
        <input
          id="fpassword2"
          v-model="$v.formResponses.password2.$model"
          type="password"
          name="fpassword2"
          autocomplete="section-register new-password"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.password2.required" class="error"
            >This field is required.
          </span>
          <span v-if="!$v.formResponses.password2.sameAsPassword" class="error"
            >Passwords must match.</span
          >
        </p>
      </section>

      <section class="relative mb-6 pb-3">
        <label
          for="fadminPass"
          class="block text-blue-800 font-bold text-sm mb-2"
          >Admin Password</label
        >
        <input
          id="fadminPass"
          v-model="$v.formResponses.adminPass.$model"
          type="password"
          name="fadminPass"
          class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.adminPass.required" class="error"
            >This field is required.</span
          >
        </p>
      </section>

      <section class="relative mb-3 pb-6">
        <div class="flex items-center justify-around">
          <ButtonPrimary
            type="submit"
            :disabled="uiState !== 'idle'"
            @click.prevent="submitRegisterForm"
          >
            <SimpleSpinner
              v-if="uiState === 'pending'"
            ></SimpleSpinner>
            <template v-else>
              Register
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
        <!-- <a href="#" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot password?</a> -->
      </section>
    </form>
    <!-- TODO: Style this feedback -->
    <!-- {{ formFeedback }}
  {{ uiState }} -->
  </div>
</template>

<script>
import Api from '../../services/Api'
import { ButtonPrimary, SimpleSpinner } from '@/components/BaseUI'
import { mapActions } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: 'RegisterAdmin',
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
        name: null,
        email: null,
        password1: null,
        password2: null,
        adminPass: null
      }
    }
  },
  validations: {
    formResponses: {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(255)
      },
      email: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      password1: {
        required,
        minLength: minLength(6)
      },
      password2: {
        required,
        sameAsPassword: sameAs('password1')
      },
      adminPass: {
        required
      }
    }
  },
  methods: {
    ...mapActions('notification', ['add']),
    ...mapActions('user', ['setUserData']),
    ...mapActions('auth', ['authUser']),
    async submitRegisterForm() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      this.uiState = 'submitted'
      if (this.errors === false && this.formTouched === false) {
        const formData = {
          name: this.formResponses.name,
          email: this.formResponses.email,
          password: this.formResponses.password1,
          adminPass: this.formResponses.adminPass
        }
        const spinnerTimer = setTimeout(function() {
          this.uiState = 'pending'
        }, 500)
        try {
          const {
            data: { token, ...userData }
          } = await Api.post('/admin', formData)
          clearTimeout(spinnerTimer)
          this.setUserData(userData)
          this.authUser(token)
          this.add({
            type: 'success',
            text: 'You have been logged in.'
          })
          this.uiState = 'idle'
        } catch (error) {
          console.log(error.response)
          if (error.response.status === 400) {
            this.uiState = 'idle'
            this.formFeedback = error.response.data
          }

          if (error.response.status === 500) {
            this.uiState = 'idle'
            this.setAlert({
              type: 'error',
              text: 'Something went wrong. Please try again.'
            })
          }
        }
      }
      // this.$store.dispatch('register', formData)
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
