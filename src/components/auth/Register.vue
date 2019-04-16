<template>
    <div class="border-2 rounded w-1/2 mx-auto text-center">
        <h1 class="">Register</h1>
        <form>
            <div>
                <label for="name" class="text-blue-darker pr-2">Name</label>
                <input type="text" name="name" id="name" v-model="$v.name.$model" class="border-blue-lighter border-b-2 pl-2">
            </div>
            <div>
                <label for="email" class="text-blue-darker pr-2">Email</label>
                <input type="text" name="email" id="email" v-model="$v.email.$model" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <div>
                <label for="password" class="text-blue-darker pr-2">Password</label>
                <input type="text" name="password" id="password" v-model="$v.password.$model" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <!-- <label for="shopChoice" class="w-1/2 text-right pr-2">Choose a Shop to Join:</label>
            <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
                <option default>Choose a Shop:</option>
                <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
            </select>
            <label for="shopPassword" class="w-1/2 text-right pr-2">Shop Password:</label>
            <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2"> -->

            <button @click.prevent="submitRegister" class="border-2 rounded border-blue">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { 
    required, 
    minLength, 
    maxLength 
    } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            shopChoice: null,
            shopPassword: '',
            operators: []
        }
    },
    validations: {
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
        password: {
            required,
            minLength: minLength(6),
        },
    },
    methods: {
        async submitRegister() {
            const formData = {
                name: this.name,
                email: this.email,
                // password: this.password,
                // shopChoice: this.shopChoice,
                // shopPassword: this.shopPassword
            }
            this.$store.dispatch('register', formData)
        }
    }
}
</script>
