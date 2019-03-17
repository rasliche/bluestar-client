<template>
    <div>
        <h1>Blue Star Training</h1>
        <p>Welcome to the Blue Star training. This training is required for your dive/snorkel shop to be recognized as a Blue Star operator.</p>
        <p>Please select your dive/snorkel shop from the drop down menu and enter your shop's password.</p>
        <Login />
    </div>
</template>

<script>
import Login from '@/components/auth/Login.vue'

export default {
    components: {
        Login
    }

}
</script>

<style>

</style>
