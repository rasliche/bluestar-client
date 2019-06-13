<template>
    <article class="lesson flex flex-wrap justify-center">
        <h1 class="w-5/6 border-blue-lighter border-b-4 mb-4">{{ title }}</h1>
        <editor-content class="w-5/6" :editor="editor" />
        <button v-if="isAdmin">Edit Lesson</button>
    </article>
</template>

<script>
import Api from '@/services/Api'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
//   CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
//   TodoItem,
//   TodoList,
  Bold,
//   Code,
  Italic,
  Image,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import { mapGetters } from 'vuex'

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
            extensions: [
                new Blockquote(),
                // new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new BulletList(),
                new OrderedList(),
                new ListItem(),
                // new TodoItem(),
                // new TodoList(),
                new Bold(),
                // new Code(),
                new Italic(),
                new Image(),
                new Link(),
                new Strike(),
                new Underline(),
                new History(),
            ],
            content: data.content,
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style lang="postcss" scoped>
img {
    @apply w-2/3;
}
</style>
