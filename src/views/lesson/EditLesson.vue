<template>
  <div class="lesson">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <section class="relative mb-6 pb-3">
            <label 
                for="title"
                class="block text-blue-darker font-bold text-sm mb-2"
                >Lesson Title</label>
            <input 
              type="text" 
                type="text" 
              type="text" 
              name="title" 
                name="title" 
              name="title" 
              id="title" 
                id="title" 
              id="title" 
              v-model="lesson.title"
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
                spellcheck
                name="description"
                id="description"
                v-model="lesson.description"
                class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </section>
        <section class="relative mb-6 pb-3">
            <div v-for="program in programOptions" :key="program._id">
                <label
                  class="block capitalize text-blue-darker font-bold text-sm mb-2"
                >
                    <input
                        type="checkbox"
                        :value="program._id"
                        :id="program.name"
                        v-model="lesson.programs"
                    />
                    {{ program.name }}
                </label>
            </div>
        </section>
    </form>
    <editor-menu-bar 
      :editor="editor" 
      v-slot="{ commands, isActive }">
      <div class="flex justify-between">
        <div class="menubar flex justify-between">
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
        <div class="flex justify-between text-sm">
          <div class="mr-4">
            {{ wordCount }} words
          </div>
          <div>
            {{ readingTimeString }} Reading Time
          </div>
        </div>
      </div>
    </editor-menu-bar>

    <h1 class="border-blue-lighter border-b-4 mb-4">{{ lesson.title }}</h1>
    <editor-content  
      class="lesson-content 
        shadow appearance-none rounded border-blue-lighter border 
        w-full min-h-full mt-4 mb-2 mx-3 
        focus:outline-none focus:shadow-outline"
      :editor="editor" 
    />

    <section class="sm:w-1/2 mx-auto mt-4 border border-red flex items-center justify-between">
        <button
          class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
          @click="editLesson">
          Save
        </button>
        <button
          v-if="!lesson.published"
          class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
          @click="publishLesson">
          Publish
        </button>
        <button
          v-else
          class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
          @click="unpublishLesson">
          Unpublish
        </button>
        <!-- <button
            class="p-2 rounded mx-auto bg-red hover:bg-red-dark text-white focus:outline-none focus:shadow-outline"
            @click="logLesson">
            Log
        </button> -->
    </section>

    <section class="flex flex-wrap w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-4">
      <h2 class="w-full">Add Questions</h2>
      <CreateQuestion 
        :lesson="lesson"
        class="w-full md:w-1/2"
        @newQuestion="onNewQuestion"
      ></CreateQuestion>
      <div 
        v-if="questions && questions.length" 
        class="w-full md:w-1/2 mb-6 px-3 pb-3">
        <!-- Accordion these questions -->
        <ol>
          <li v-for="(question, index) in questions" :key="index">
            <p>{{ question.text }}</p>
            <ul>
              <li
                class="list-reset"                
                :class="{ 'bg-green-lightest': answer.isRight }"
                v-for="(answer, index) in question.answers"
                :key="index">
                <svg v-if="answer.isRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-check">
                  <circle cx="12" cy="12" r="10" class="text-green-light"></circle>
                  <path class="text-green-darker" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-4 fill-current icon-close-circle">
                  <circle cx="12" cy="12" r="10" class="text-red-light"></circle>
                  <path class="text-red-darker" d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"></path>
                </svg>
                <p class="inline">{{ answer.text }}</p>
              </li>
              <p>{{ question.theMoreYouKnow }}</p>
            </ul>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script>
import Api from "@/services/Api";
import Modal from "@/components/Modal"
import CreateQuestion from "@/components/quiz/CreateQuestion.vue"

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
  Image,
} from 'tiptap-extensions';
import Iframe from "@/components/tiptap-extras/Iframe";

export default {
  name: 'EditLesson',
  components: {
    EditorContent,
    EditorMenuBar,
    Modal,
    CreateQuestion,
  },
  data() {
    return {
      lessonDetailModalOpen: false,
      lesson: { },
      questions: [],
      programOptions: [],
      editor: null,
    }
  },
  beforeRouteEnter (to, from, next) {
    const lesson = Api.get(`/lessons/${to.params.id}`);
    const programs = Api.get('/programs');
    const questions = Api.get(`/lesson/${to.params.id}/questions`)

    axios.all([lesson, programs, questions])
      .then(axios.spread(function (lesson, programs, questions) {
        // Both requests are now complete
        next(vm => {
          // access to component instance via `vm`
          vm.$data.lesson = { ...lesson.data }
          vm.$data.programOptions = programs.data;
          vm.$data.questions = questions.data;
          vm.$data.editor = new Editor({
            extensions: [
              new Bold(),
              new Italic(),
              new Underline(),
              new Blockquote(),
              new BulletList(),
              new HardBreak(),
              new Heading({ levels: [2, 3] }),
              new HorizontalRule(),
              new ListItem(),
              new OrderedList(),
              new TodoItem(),
              new TodoList(),
              new Link(),
              new Strike(),
              new History(),
              new Image(),
              // custom extensions tests
              new Iframe,
            ],
            content: lesson.data.content,
          });
        })
      }));
  },
  beforeDestroy() {
      this.editor.destroy();
  },
  computed: {
    wordCount() {
      return this.editor.getHTML().split(' ').length
    },
    readingTimeMinutes() { // 265 words per minute reading speed
      return Math.ceil(this.wordCount / 265)
    },
    readingTimeString() {
      const hours = Math.floor(this.readingTimeMinutes / 60)
      const minutes = this.readingTimeMinutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }
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
    async publishLesson() {
      try {
        const { data } = await Api.post('/published-lessons', {
          lessonId: this.lesson._id
        })
        console.log(data)
        this.lesson.published = data.published
      } catch (error) {
        console.log(error)
      }
    },
    async unpublishLesson() {
      try {
        const { data } = await Api.delete(`/published-lessons/${this.lesson._id}`)
        console.log(data)
        this.lesson.published = data.published
      } catch (error) {
        console.log(error)
      }
    },
    async editLesson() {
      console.log(this.editor.getJSON())
      try {
        const { data } = await Api.put(`/lessons/${this.lesson._id}`, {
          title: this.lesson.title,
          description: this.lesson.description,
          programs: this.lesson.programs,
          published: this.lesson.published,
          content: this.editor.getJSON(),
          questions: this.lesson.questions,
        });
        // this.$router.push({ name: 'admin'})
      } catch (error) {
        console.log(error)
      }
    },
    logLesson() {
        console.log(this.editor.getJSON())
    },
    onNewQuestion(newQuestion) {
      this.lesson.questions.push(newQuestion)
    },
  }
}
</script>

<style lang="postcss">
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

/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
/* .lesson-content > div { */
.ProseMirror {
  /* outline-none */
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
