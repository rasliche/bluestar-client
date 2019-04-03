<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
        <router-link tag="div" :to="{ path: path }" class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ name }}</div>
            <p class="text-grey-darker text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </router-link>
        <div class="px-6 py-4">
            <span v-for="tag in tags" :key="tag" class="inline-block bg-blue-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#{{ tag }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['path', 'name', 'tags', 'thumbnail']
}
</script>


<style scoped>

</style>

