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
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'createNewOperator'
        ]),
        submitOperator() {
            const newOperator = {
                name: this.name,
                password: this.password
            }
            this.createNewOperator(newOperator)
            this.name = ''
            this.password = ''
        }
    }
}
</script>

<style>

</style>
