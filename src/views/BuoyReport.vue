<template>
<main>
    <PageHeading>Buoy Reports</PageHeading>
    <canvas id="buoy-map" class="w-full"></canvas>
    <div>{{ buoys }}</div>
    <div>{{ line }}</div>
    <div>{{ diver }}</div>
</main>
</template>

<script>
import { PageHeading } from '@/components/BaseUI'

export default {
    name: 'BuoyReport',
    components: {
        PageHeading
    },
    data() {
        return {
            buoys: {
                stock: 0,
                cost: 175,
            },
            line: {
                stock: 5280,
                cost: 1
            },
            diver: {
                stock: 6,
                cost: 45000
            }
        }
    }
}
</script>

<style lang="postcss" scoped>
#buoy-map {

}

</style>