<template>
    <div class="border-2 rounded w-1/2 mx-auto">
        <h1 class="text-center">Register</h1>
        <form>
            <div>
                <label for="name" class="text-blue-darker pr-2">Name</label>
                <input type="text" name="name" id="name" v-model="name" class="border-blue-lighter border-b-2 pl-2">
            </div>
            <div>
                <label for="email" class="text-blue-darker pr-2">Email</label>
                <input type="text" name="email" id="email" v-model="email" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <div>
                <label for="password" class="text-blue-darker pr-2">Password</label>
                <input type="text" name="password" id="password" v-model="password" class="pl-2 border-b-2 border-blue-lighter">
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
    methods: {
        async submitRegister() {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
                // shopChoice: this.shopChoice,
                // shopPassword: this.shopPassword
            }
            this.$store.dispatch('register', formData)
        }
    }
}
</script>
