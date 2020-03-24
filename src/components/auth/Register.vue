<template>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="submit">
      <h1 class="text-lg font-semibold text-blue-900 text-center pb-3">Register</h1>
      <BaseInput
        label="Name"
        v-model="$v.formResponses.name.$model"
        type="text"
        autocomplete="section-register name"
      >
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.name.required" class="error">
            This field is required.
          </span>
        </p>
      </BaseInput>

      <BaseInput
        label="Email"
        v-model="$v.formResponses.email.$model"
        type="email"
        autocomplete="section-register email"
      >
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.email.required" class="error"
            >This field is required.
          </span>
          <span v-if="!$v.formResponses.email.minLength" class="error"
            >Field must have at least
            {{ $v.formResponses.email.$params.minLength.min }} characters.</span
          >
        </p>
      </BaseInput>

      <BaseInput
        label="Password"
        v-model="$v.formResponses.password1.$model"
        type="password"
        autocomplete="section-register new-password"
      >
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
      </BaseInput>

      <BaseInput
        label="Re-type Password"
        v-model="$v.formResponses.password2.$model"
        type="password"
        autocomplete="section-register new-password"
      >
        <p v-if="errors" class="absolute bottom-0 inset-x-0">
          <span v-if="!$v.formResponses.password2.required" class="error">
            This field is required.
          </span>
          <span v-if="!$v.formResponses.password2.sameAsPassword" class="error">
            Passwords must match.
          </span>
        </p>
      </BaseInput>
      <!-- SHOP SEARCH MULTI SELECT -->
      <!-- <section class="relative px-4 pb-8 flex">
        <label for="shopChoice" class="w-1/2 text-right pr-2">Choose a Shop to Join:</label>
        <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
            <option default>Choose a Shop:</option>
            <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
        </select>
        <label for="shopPassword" class="w-1/2 text-right pr-2">Shop Password:</label>
        <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2">
    </section> -->
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
import { ButtonPrimary, BaseInput, SimpleSpinner } from '@/components/BaseUI'
import { mapActions } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: 'Register',
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
        name: null,
        email: null,
        password1: null,
        password2: null
        // shopChoice: null,
        // shopPassword: null,
        // operators: []
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
      }
    }
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    ...mapActions('user', ['setCurrentUser']),
    ...mapActions('notification', ['add']),
    async submit() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      if (this.errors === false && this.formTouched === false && this.uiState !== 'pending') {
        const formData = {
          name: this.formResponses.name,
          email: this.formResponses.email,
          password: this.formResponses.password1
          // shopChoice: this.shopChoice,
          // shopPassword: this.shopPassword
        }
        const spinnerTimer = setTimeout(function() {
          this.uiState = 'pending'
        }, 750)
        try {
          const {
            data: { token, ...userData }
          } = await Api.post('/users', formData)
          clearTimeout(spinnerTimer)
          this.setCurrentUser(userData)
          this.authUser(token)
          this.add({
            type: 'success',
            text: 'You have been logged in.'
          })
        } catch (e) {
          clearTimeout(spinnerTimer)
          this.uiState = 'idle'
          this.formFeedback = e.response.data
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
  @apply px-2 border border-red-500 rounded;
}
</style>
