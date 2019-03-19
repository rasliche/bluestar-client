<template>
    <div>
        <h1>List of Users</h1>
        <p>Should accept props that dictate what fields to show.</p>
        <ul>
            <li v-for="user in users" :key="user._id">{{ user.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["users", "fields"]
}
</script>
