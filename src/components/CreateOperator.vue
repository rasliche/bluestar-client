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
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        ...mapActions({
            addOperator: 'addOperator'
        }),
        async submitOperator() {
            const newOperator = {
                name: this.name,
                password: this.password
            }
            this.addOperator(newOperator)
            this.name = ''
            this.password = ''
        }
    }
}
</script>

<style>

</style>
