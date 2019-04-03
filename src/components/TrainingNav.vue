<template>
    <nav>
        <!-- TODO: iterate through training children -->
        <router-link :to="{ name: 'training'}">Training Home</router-link>
        <router-link :to="{ name: 'about-fknms' }">About FKNMS</router-link>
        <router-link :to="{ name: 'about-blue-star' }">About Blue Star</router-link>
    </nav>
</template>

