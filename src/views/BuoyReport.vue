<template>
<main>
    <PageHeading>Buoy Reports</PageHeading>
    <canvas ref="buoy-map" class="w-full bg-blue-200"></canvas>
    <div>{{ resources.funds }}</div>
    <div>{{ resources.buoys }}</div>
    <div>{{ resources.line }}</div>
    <div>{{ resources.diver }}</div>
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
            resources: {
                funds: 450000,
                buoys: {
                    stock: 0,
                    cost: 175,
                },
                line: {
                    stock: 0,
                    cost: 1
                },
                diver: {
                    stock: 6,
                    cost: 45000
                }
            }
        }
    },
    created() {
        
    }
}
</script>

<style lang="postcss" scoped>
#buoy-map {

}

</style>