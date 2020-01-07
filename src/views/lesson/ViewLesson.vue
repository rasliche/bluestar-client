<template>
  <article class="lesson">
    <!-- Set useVerticalOffset to "true" -->
    <ScrollProgressBar
      @halfway.once="logThatStuff"
      :useVerticalOffset="true"
      offsetElement="app-nav">
    </ScrollProgressBar>
    <h1 class="page-heading">
      {{ lesson.title }}
    </h1>
    <div class="flex justify-center">
      <span>Reading Time: {{ readingTimeString }}</span>
    </div>
    <editor-content class="lesson-content" :editor="editor" />
    <Quiz 
      v-if="questions.length > 0" 
      :questions="questions"
      @quiz-finished="handleFinishedQuiz($event)" />
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Api from "@/services/Api";
import ScrollProgressBar from "@/components/ScrollProgressBar/ScrollProgressBar";
import Quiz from "@/components/quiz/Quiz.vue";
import { Editor, EditorContent } from "tiptap";
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
  components: {
    ScrollProgressBar,
    EditorContent,
    Quiz,
  },
  props: ['lessonId'],
  data() {
    return {
      lesson: { },
      questions: [],
      // title: '',
      editor: null,
      // quiz: null,
    };
  },
  methods: {
    ...mapActions('user', ['setUserScoreData']),
    logThatStuff() {
      console.log('halfway')
    },
    async handleFinishedQuiz(score) {
      const { data } = await Api.post(`/user/${this.userId}/scores`, { 
        lessonId: this.lesson._id,
        score: score
      })
      this.setUserScoreData(data)
    }
  },
  computed: {
    ...mapGetters('user', ['userId']),
    wordCount() {
      if (!this.editor) return 0
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
  async created () {
    const { data: { content, ...lesson } } = await Api.get(`/lessons/${this.lessonId}`);
    const { data: questions } = await Api.get(`/lesson/${this.lessonId}/questions`)

    this.lesson = lesson
    this.questions = questions
    this.editor = new Editor({
      editable: false,
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
      content: content,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="postcss">
/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
/* .lesson-content > div { */
.ProseMirror {
  @apply max-w-lg px-2 text-lg leading-normal outline-none mx-auto;
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
