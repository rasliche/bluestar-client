<template>
  <div class="lesson">
    <h1 class="border-blue-lighter border-b-4 mb-4">{{ title }}</h1>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar flex">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold">
            Bold
        </button>
        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic">
            Italic
        </button>
        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline">
            Underline
        </button>
        <button
          @click="showImagePrompt(commands.image)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current icon-photo">
                <path class="primary text-white" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                <path class="secondary text-grey-darker" d="M15.3 12.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 .3.7v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 .3-.7l4-4a1 1 0 0 1 1.4 0l3.3 3.29 1.3-1.3z"></path>
            </svg>
        </button>
        <button
          @click="showIframePrompt(commands.iframe)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current icon-film">
                <path class="primary text-white" d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v2h2V5H4zm0 4v2h2V9H4zm0 4v2h2v-2H4zm0 4v2h2v-2H4zM18 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"></path>
                <path class="secondary text-grey-darker" d="M9 5h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 8h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"></path>
            </svg>
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })">
            H2
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })">
          H3
        </button>
      </div>
    </editor-menu-bar>

    <editor-content  
        class="lesson-content 
          shadow appearance-none rounded border-blue-lighter border 
          w-full min-h-full mt-4 mb-2 mx-3 
          focus:outline-none focus:shadow-outline"
        :editor="editor" />
    <section class="sm:w-1/2 mx-auto mt-4 border border-red flex items-center justify-between">
        <button
            class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
            @click="createLesson">
            Create
        </button>
        <button
            class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
            @click="logLesson">
            Log
        </button>
        <button 
            class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
            @click="lessonDetailModalOpen = true">
            Details
            <Modal
                :show="lessonDetailModalOpen" 
                @close="lessonDetailModalOpen = false"
                :preventBackgroundScrolling="false"
            >
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <section class="relative mb-6 pb-3">
                        <label 
                            for="title"
                            class="block text-blue-darker font-bold text-sm mb-2"
                            >Lesson Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            v-model="title"
                            class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                    </section>
                    <section class="relative mb-6 pb-3">
                        <label 
                            for="description"
                            class="block text-blue-darker font-bold text-sm mb-2"
                            >Short Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            v-model="description"
                            class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </section>
                    <section class="relative mb-6 pb-3">
                        <div v-for="program in programOptions" :key="program._id">
                            <label>
                                <input
                                    type="checkbox"
                                    :value="program.name"
                                    :id="program.name"
                                    v-model="programs"
                                />
                                {{ program.name }}
                            </label>
                        </div>
                    </section>
                </form>
            </Modal>
        </button>
        <button 
            class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
            @click="quizModalOpen = true">
            Quiz
            <Modal 
                :preventBackgroundScrolling="false"
                :show="quizModalOpen" 
                @close="quizModalOpen = false">
                <!-- <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <section class="relative mb-6 pb-3">
                        <label 
                            for="title"
                            class="block text-blue-darker font-bold text-sm mb-2"
                            >Lesson Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            v-model="title"
                            class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                    </section>
                    <section class="relative mb-6 pb-3">
                        <label 
                            for="description"
                            class="block text-blue-darker font-bold text-sm mb-2"
                            >Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            v-model="description"
                            class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </section>
                    <section class="relative mb-6 pb-3">
                        <div v-for="program in programOptions" :key="program._id">
                            <label>
                                <input
                                    type="checkbox"
                                    :value="program.name"
                                    :id="program.name"
                                    v-model="programs"
                                />
                                {{ program.name }}
                            </label>
                        </div>
                    </section>
                </form> -->
            </Modal>
        </button>
    </section>
    <CreateQuiz></CreateQuiz>
  </div>
</template>

<script>
import Api from "@/services/Api";
import Modal from "@/components/Modal";
import CreateQuiz from "@/components/quiz/CreateQuiz";
import { Editor, EditorMenuBar, EditorContent } from "tiptap";
import {
  Bold,
  Italic,
  Underline,
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Link,
  Strike,
  History,
} from 'tiptap-extensions';


export default {
  name: 'CreateLesson',
  components: {
    EditorContent,
    EditorMenuBar,
    Modal,
    CreateQuiz,
  },
  data() {
    return {
      lessonDetailModalOpen: false,
    //   quizModalOpen: false,
      title: "New Lesson",
      description: '',
      programs: [],
      programOptions: [],
      published: false,
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new History(),
        ],
        content: `Stick some smart stuff in here`
      })
    }
  },
  async created() {
      const { data: programOptions } = await Api.get("/programs");
      this.programOptions = programOptions;
  },
  beforeDestroy() {
      this.editor.destroy();
  },
  methods: {
      showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    showIframePrompt(command) {
      const src = prompt('Enter the url of your embed here')
      if (src !== null) {
        command({ src })
      }
    },
      async createLesson() {
        console.log(this.editor.getJSON())
        try {
            const { data: { slug } } = await Api.post("/lessons", {
                title: this.title,
                description: this.description,
                programs: this.programs,
                published: this.published,
                content: this.editor.getJSON(),
            });
            this.$router.replace({ name: 'view-lesson', params: { slug: slug }})
        } catch (error) {
            console.log(error)
        }
      },
      logLesson() {
          console.log(this.editor.getJSON())
      }
  }
}
</script>

<style lang="postcss">
/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
.menubar {
    button:first-child {
        @apply rounded-l
    }
    button:last-child {
        @apply rounded-r
    }
    button {
        @apply p-2 text-white bg-grey-darker border border-grey-darkest;
        &:hover {
            @apply bg-grey-darkest;
        }
        .is-active {
            @apply bg-grey-light text-grey-darkest;
        }
    }
}

.ProseMirror {
    @apply px-2 text-lg text-grey-darkest leading-normal;
    > * + *, li + li, li > p + p {
        @apply mt-4;
    }
}
/* .lesson-content {
  @apply text-lg text-grey-darkest leading-normal;
    > * + *, li + li, li > p + p {
        @apply mt-6;
    }
        strong {
        @apply text-black font-bold;
    }
        a {
        @apply text-black font-semibold;
    }
        strong a {
        @apply font-bold;
    }
        h2 {
        @apply leading-tight text-xl font-bold text-black mb-2 mt-10;
    }
        h3 {
        @apply leading-tight text-lg font-bold text-black mt-8 -mb-2;
    }
        code {
        @apply font-mono text-sm inline bg-grey-lighter px-1;
    }
        pre code {
        @apply block bg-black p-4 rounded;
    }
        blockquote {
        @apply border-l-4 border-grey-light pl-4 italic;
    }
        ul, ol {
        @apply pl-5;
        @screen sm {
        @apply pl-10;
        }
    }
} */
</style>
