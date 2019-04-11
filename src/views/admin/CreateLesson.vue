<template>
    <article class="lesson w-5/6 mx-auto">
        <h1>Create a Lesson</h1>
        <form>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" v-model="lesson.title">
            <label for="description">Description</label>
            <input type="text" name="description" id="description" v-model="lesson.description">
            <div>
                <label v-for="program in programs" :key="program._id">
                    <input type="checkbox" :value="program.name" :id="program.name" v-model="lesson.programs">
                    {{ program.name }}
                </label>
            </div>
        </form>

        <editor-menu-bar :editor="editor" class="mt-2">
            <div class="commands" slot-scope="{ commands, isActive }">
                <button :class="{ 'bg-red-light': isActive.bold() }" @click="commands.bold">
                    Bold
                </button>
                <button :class="{ 'bg-red-light': isActive.italic() }" @click="commands.italic">
                    Italic
                </button>
                <button :class="{ 'bg-red-light': isActive.heading() }" @click="commands.heading({ level: 2 })">
                    H3
                </button>
                <button @click="showImagePrompt(commands.image)">
                    Image
                </button>
            </div>
        </editor-menu-bar>
        <editor-content :editor="editor" class="mt-2" />
        <button @click.prevent="logLesson" class="border-2 rounded border-blue">Log Lesson to Console</button>
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

export default {
    components: {
        EditorContent,
        EditorMenuBar,
    },
    data() {
        return {
            lesson: {
                title: '',
                description: '',
                programs: [],
                published: false
            },
            programs: [],
            editor: null,
        }
    },
    methods: {
        async logLesson() {
            const lessonContent = this.editor.getJSON()
            const { data } = await Api.post('/lessons', {
                title: this.lesson.title,
                description: this.lesson.description,
                programs: this.lesson.programs,
                published: this.lesson.published,
                content: lessonContent,
            })
            console.log(data)
        },
        showImagePrompt(command) {
            const src = prompt('Enter the url of your image here')
            if (src !== null) {
                command({ src })
            }
        },
    },
    async mounted() {
        const { data } = await Api.get('/programs')
        this.programs = data
        this.editor = new Editor({
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
            content: '<p>A Boring Paragraph</p>',
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style lang="postcss">
.commands {
    @apply flex;
}

.commands button {
    @apply p-1 border border-black;
}

.commands button:first-of-type {
    @apply rounded-l;
}

.commands button:last-of-type {
    @apply rounded-r;
}
</style>
