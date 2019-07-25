<template>
    <div class="border-2 rounded w-1/2 mx-auto text-center">
        <h1 class="">Register</h1>
        <form>
            <div>
                <label for="fname" class="text-blue-darker pr-2">Name</label>
                <input type="text" name="fname" id="fname" v-model.lazy="$v.formResponses.name.$model" class="border-blue-lighter border-b-2 pl-2">
                <p class="text-red text-sm" v-if="!$v.formResponses.name.required">this field is required</p>
            </div>
            <div>
                <label for="femail" class="text-blue-darker pr-2">Email</label>
                <input type="text" name="femail" id="femail" v-model.lazy="$v.formResponses.email.$model" class="pl-2 border-b-2 border-blue-lighter">
                <p class="text-red text-sm" v-if="!$v.formResponses.email.required">this field is required</p>
                <p class="text-red text-sm" v-if="!$v.formResponses.email.minLength">Field must have at least {{ $v.formResponses.email.$params.minLength.min }} characters.</p>
            </div>
            <div>
                <label for="fpassword1" class="text-blue-darker pr-2">Password</label>
                <input type="password" name="fpassword1" id="fpassword1" v-model.lazy="$v.formResponses.password1.$model" class="pl-2 border-b-2 border-blue-lighter">
                <p class="text-red text-sm" v-if="!$v.formResponses.password1.required">this field is required</p>
                <p class="text-red text-sm" v-if="!$v.formResponses.password1.minLength">Field must have at least {{ $v.formResponses.password1.$params.minLength.min }} characters.</p>
            </div>
            <div>
                <label for="fpassword2" class="text-blue-darker pr-2">Retype Password</label>
                <input type="password" name="fpassword2" id="fpassword2" v-model.lazy="$v.formResponses.password2.$model" class="pl-2 border-b-2 border-blue-lighter">
                <p class="text-red text-sm" v-if="!$v.formResponses.password2.required">this field is required</p>
                <p class="text-red text-sm" v-if="!$v.formResponses.password2.sameAsPassword">passwords must match</p>
            </div>
            <!-- <label for="shopChoice" class="w-1/2 text-right pr-2">Choose a Shop to Join:</label>
            <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
                <option default>Choose a Shop:</option>
                <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
            </select>
            <label for="shopPassword" class="w-1/2 text-right pr-2">Shop Password:</label>
            <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2"> -->

      <button
        @click.prevent="submitRegister"
        class="border-2 rounded border-blue"
      >
        Register
      </button>
    </form>
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
        async submitRegister() {
            const formData = {
                name: this.formResponses.name,
                email: this.formResponses.email,
                // password: this.password,
                // shopChoice: this.shopChoice,
                // shopPassword: this.shopPassword
            }
            this.$store.dispatch('register', formData)
        }
    }
  };
</script>
