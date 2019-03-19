<template>
    <div>
        <h1>Register</h1>
        <form class="flex flex-wrap">
            <label for="name" class="w-1/2 text-right pr-2 border border-red">Name:</label>
            <input type="text" name="name" id="name" v-model="name" class="w-1/2 text-left pl-2 border border-red">
            <label for="email" class="w-1/2 text-right pr-2 border border-red">Email:</label>
            <input type="text" name="email" id="email" v-model="email" class="w-1/2 text-left pl-2 border border-red">
            <label for="password" class="w-1/2 text-right pr-2 border border-red">Password:</label>
            <input type="text" name="password" id="password" v-model="password" class="w-1/2 text-left pl-2 border border-red">
            <label for="shopChoice" class="w-1/2 text-right pr-2 border border-red">Choose a Shop to Join:</label>
            <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
                <option default>Choose a Shop:</option>
                <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
            </select>
            <label for="shopPassword" class="w-1/2 text-right pr-2 border border-red">Shop Password:</label>
            <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2">

            <button @click.prevent="onSubmit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from '@/services/axios-auth'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            shopChoice: null,
            shopPassword: ''
        }
    },
    computed: {
        ...mapGetters([
            'operators'
        ])
    },
    methods: {
        async onSubmit() {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
                // shopChoice: this.shopChoice,
                // shopPassword: this.shopPassword
            }
            const result = await axios.post('/api/users', formData)
            console.log(result)
        }
    }
}
</script>
