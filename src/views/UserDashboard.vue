<template>
<div>
    <h1>User Dashboard Page</h1>
    <div v-for="(value, key) in this.$store.state" :key="key">
        {{ key }}: {{ value }}
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Api from '@/services/Api'

export default {
    
}
</script>

<style>

</style>
