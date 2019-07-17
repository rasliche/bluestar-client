<template>
<div class="fixed pin-r pin-b m-6">
    <div class="bg-red text-red-darkest rounded-lg shadow-md p-6 pr-10 opacity-75 hover:opacity-100" style="min-width: 240px">
        <button class="cursor-pointer absolute top-0 right-0 py-2 px-3">
            X
        </button>
        <div class="flex items-center">
            Oops! Something terrible happened...
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'BSFlashMessage',
    props: ['type', 'text']
}
</script>
