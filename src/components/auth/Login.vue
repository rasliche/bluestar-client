<template>
    <div>
        <h1>Login</h1>
        <form class="flex flex-wrap">
            <label for="email" class="w-1/2 text-right pr-2 border border-red">User Email:</label>
            <input type="text" name="email" id="email" v-model="email" class="w-1/2 text-left pl-2 border border-red">

            <label for="password" class="w-1/2 text-right pr-2 border border-red">Password:</label>
            <input type="text" name="password" id="password" v-model="password" class="w-1/2">
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
</script>
