<template>
<div>
    <PageHeading>Uh-Oh</PageHeading>
    <p>It looks like you're having network issues...</p>
    <router-link :to="{ name: 'home' }">Back Home</router-link>
</div>
</template>

<script>
import { PageHeading } from '@/components/BaseUI'

export default {
    name: 'NetworkIssue',
    components: {
        PageHeading
    }

}
</script>

<style>

</style>