<template>
    <div class="border">
        <form>
            <label for="name">Operator Name</label>
            <input type="text" id="name" v-model="name">
            <label for="password">Operator Password</label>
            <input type="text" id="password" v-model="password">
            <button @click.prevent="submitOperator">Create</button>
        </form>
    </div>
</template>

<script>
import Api from '../services/Api.js'

export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        async submitOperator() {
            const newOperator = {
                name: this.name,
                password: this.password
            }
            const { data } = await Api.post('/operators', newOperator, {
                headers: {
                    Authorization: `Bearer: ${this.$store.state.user.token}`
                    }
                })
            this.name = ''
            this.password = ''
        }
    }
}
</script>

<style>

</style>
