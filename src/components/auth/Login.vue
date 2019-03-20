<template>
    <div class="text-center">
        <h1>Login</h1>
        <form class="flex flex-wrap">
            <label for="email" class="w-1/2 text-right pr-2 border border-red">User Email:</label>
            <input type="text" name="email" id="email" v-model="email" class="w-1/2 text-left pl-2 border border-red">

            <label for="password" class="w-1/2 text-right pr-2 border border-red">Password:</label>
            <input type="text" name="password" id="password" v-model="password" class="w-1/2">

            <button @click.prevent="submitLogin" class="border-2 rounded border-blue">Login</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async submitLogin() {
            const authData = { 
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('user/login', authData)
        }
    }
}
</script>
