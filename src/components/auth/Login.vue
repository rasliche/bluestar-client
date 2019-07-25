<template>
  <div class="border-2 rounded w-1/2 mx-auto text-center">
    <h1 class="">Login</h1>
    <form>
      <div class="m-2">
        <label for="femail" class="text-blue-darker pr-2">Email</label>
        <input
          type="text"
          name="femail"
          id="femail"
          v-model.lazy="$v.formResponses.email.$model"
          autocomplete="section-login email"
          class="border-blue-lighter border-b-2 pl-2"
        />
        <p class="text-red text-sm" v-if="!$v.formResponses.email.required">this field is required</p>
      </div>
      <div>
        <label for="fpassword" class="text-blue-darker pr-2">Password</label>
        <input
          type="password"
          name="fpassword"
          id="fpassword"
          v-model.lazy="$v.formResponses.password.$model"
          autocomplete="section-login current-password"
          class="border-blue-lighter border-b-2 pl-2"
        />
        <p class="text-red text-sm" v-if="!$v.formResponses.password.required">this field is required</p>
      </div>

      <button
        @click.prevent="submitLogin"
        class="border-2 m-2 rounded border-blue mx-auto"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { required, } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      formResponses: {
        email: null,
        password: null
      }
    };
  },
  validations: {
      formResponses: {
          email: {
              required,
          },
          password: {
              required,
          }
      }
  },
  methods: {
    async submitLogin() {
      const authData = {
        email: this.formResponses.email,
        password: this.formResponses.password
      };

      this.$store.dispatch("login", authData);
    }
  }
};
</script>
