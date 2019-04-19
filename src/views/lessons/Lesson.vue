<template>
    <article class="lesson flex flex-wrap justify-center">
        <h1 class="w-5/6 border-blue-lighter border-b-4 mb-4">{{ title }}</h1>
        <editor-content class="w-5/6" :editor="editor" />
        <button v-if="isAdmin">Edit Lesson</button>
    </article>
</template>

<script>
import Api from '@/services/Api'
import { mapGetters } from 'vuex'
import { Editor, EditorContent } from 'tiptap'

export default {
    components: {
        EditorContent,
    },
    data() {
        return {
            title: '',
            editor: null,
        }
    },
    computed: {
        ...mapGetters(['isAdmin'])
    },
    async mounted() {
        const { data } = await Api.get(`/lessons/${this.$route.params.slug}`)
        this.title = data.title
        this.editor = new Editor({
            editable: false,
            content: data.content,
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style>

</style>
