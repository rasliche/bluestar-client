<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg m-2">
        <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
        <router-link tag="div" :to="{ name: slug}" class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ title }}</div>
            <p class="text-grey-darker text-base">
                {{ description }}
            </p>
        </router-link>
        <div v-if="programs.length" class="px-6 py-4">
            <span v-for="program in programs" :key="program" class="inline-block bg-blue-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#{{ program }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['slug', 'title', 'programs', 'thumbnail', 'description']
}
</script>


<style scoped>

</style>

