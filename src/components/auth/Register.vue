<template>
<div class="border-2 rounded w-1/2">
  <h1 class="text-center pb-8">Register</h1>
  <form>
    <section class="relative px-4 pb-8 flex">
      <label 
        for="fname" 
        class="text-blue-darker w-1/3 text-right pr-4"
        >Name</label>
      <input 
        type="text" 
        name="fname" 
        id="fname" 
        v-model.lazy="$v.formResponses.name.$model" 
        class="border-blue-lighter border-b-2 pl-2 w-2/3">
      <p v-if="errors" class="absolute pin-b pin-x text-center">
        <span class="text-red text-sm" v-if="!$v.formResponses.name.required">this field is required</span>
      </p>
    </section>

    <section class="relative px-4 pb-8 flex">
      <label 
        for="femail" 
        class="text-blue-darker w-1/3 text-right pr-4"
        >Email</label>
      <input type="text" name="femail" id="femail" v-model.lazy="$v.formResponses.email.$model" 
        class="border-blue-lighter border-b-2 pl-2 w-2/3">
      <p v-if="errors" class="absolute pin-b pin-x text-center">
        <span class="text-red text-sm" v-if="!$v.formResponses.email.required">this field is required</span>
        <span class="text-red text-sm" v-if="!$v.formResponses.email.minLength">Field must have at least {{ $v.formResponses.email.$params.minLength.min }} characters.</span>
      </p>
    </section>

    <section class="relative px-4 pb-8 flex">
      <label 
        for="fpassword1" 
        class="text-blue-darker w-1/3 text-right pr-4"
        >Password</label>
      <input 
        type="password" 
        name="fpassword1" 
        id="fpassword1" 
        v-model.lazy="$v.formResponses.password1.$model"
        autocomplete="section-register new-password" 
        class="border-blue-lighter border-b-2 pl-2 w-2/3">
      <p v-if="errors" class="absolute pin-b pin-x text-center">
        <span class="text-red text-sm" v-if="!$v.formResponses.password1.required">this field is required</span>
        <span class="text-red text-sm" v-if="!$v.formResponses.password1.minLength">Field must have at least {{ $v.formResponses.password1.$params.minLength.min }} characters.</span>
      </p>
    </section>

    <section class="relative px-4 pb-8 flex">
      <label 
        for="fpassword2" 
        class="text-blue-darker w-1/3 text-right pr-4"
        >Re-type Password</label>
      <input 
        type="password" 
        name="fpassword2" 
        id="fpassword2" 
        v-model.lazy="$v.formResponses.password2.$model" 
        autocomplete="section-register new-password"
        class="border-blue-lighter border-b-2 pl-2 w-2/3">
      <p v-if="errors" class="absolute pin-b pin-x text-center">
        <span class="text-red text-sm" v-if="!$v.formResponses.password2.required">this field is required</span>
        <span class="text-red text-sm" v-if="!$v.formResponses.password2.sameAsPassword">passwords must match</span>
      </p>
    </section>
        <!-- SHOP SEARCH MULTI SELECT -->
        <!-- <label for="shopChoice" class="w-1/2 text-right pr-2">Choose a Shop to Join:</label>
        <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
            <option default>Choose a Shop:</option>
            <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
        </select>
        <label for="shopPassword" class="w-1/2 text-right pr-2">Shop Password:</label>
        <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2"> -->

    <section class="relative px-4 pb-6 flex">
      <button @click.prevent="submitRegisterForm" class="border-2 p-1 rounded border-blue mx-auto">
        Register
      </button>
    </section>
  </form>
  <!-- TODO: Style this feedback -->
  {{ formFeedback }}
  {{ uiState }}
</div>
</template>

<script>
import { 
    required, 
    minLength, 
    maxLength,
    sameAs
    } from 'vuelidate/lib/validators'

export default {
    name: "Register",
    data() {
      return {
        formFeedback: null,
        uiState: 'submit not clicked',
        errors: false,
        formTouched: true,
        formResponses: {
          name: null,
          email: null,
          password1: null,
          password2: null,
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
                maxLength: maxLength(255),
            },
            email: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(255)
            },
            password1: {
                required,
                minLength: minLength(6),
            },
            password2: {
                required,
                sameAsPassword: sameAs("password1")
            },
        }
    },
    methods: {
      async submitRegisterForm() {
        this.formTouched = !this.$v.formResponses.$anyDirty
        this.errors = this.$v.formResponses.$anyError
        this.uiState = 'submit clicked'
        if (this.errors === false && this.formTouched === false) {
          const formData = {
            name: this.formResponses.name,
            email: this.formResponses.email,
            password: this.password,
            // shopChoice: this.shopChoice,
            // shopPassword: this.shopPassword
          }
          this.uiState = 'form submitted'
          try {
            console.log("send form data to register here")
            console.log(formData)
          } catch (error) {
            console.log('got here due to an error: ', error)
          }
        }
        // this.$store.dispatch('register', formData)
      }
    }
  };
</script>
