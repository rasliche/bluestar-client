<template>
  <div>
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="flex justify-between">
        <div class="menubar flex justify-between">
          <button
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            Bold
          </button>
          <button
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            Italic
          </button>
          <button
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            Underline
          </button>
          <button @click="showImagePrompt(commands.image)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-4 h-4 fill-current icon-photo"
            >
              <path
                class="primary text-white"
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              ></path>
              <path
                class="secondary text-gray-700"
                d="M15.3 12.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 .3.7v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 .3-.7l4-4a1 1 0 0 1 1.4 0l3.3 3.29 1.3-1.3z"
              ></path>
            </svg>
          </button>
          <button @click="showIframePrompt(commands.iframe)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-4 h-4 fill-current icon-film"
            >
              <path
                class="primary text-white"
                d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v2h2V5H4zm0 4v2h2V9H4zm0 4v2h2v-2H4zm0 4v2h2v-2H4zM18 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"
              ></path>
              <path
                class="secondary text-gray-700"
                d="M9 5h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 8h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
              ></path>
            </svg>
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>
          <!-- <button
          @click="commands.wavytext">
          Wavy Text Node
        </button> -->
          <button @click="logEditorContent">
            Log
          </button>
        </div>
        <div class="flex justify-between text-sm">
          <div class="mr-4">{{ wordCount }} words</div>
          <div>{{ readingTimeString }} Reading Time</div>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content
      class="lesson-content 
      shadow appearance-none rounded border-blue-200 border 
      w-full min-h-full mt-4 mb-2 mx-3 
      focus:outline-none focus:shadow-outline"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorMenuBar, EditorContent } from 'tiptap'
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
  Image
} from 'tiptap-extensions'
import Iframe from '@/tiptap-extras/Iframe'
import WavyText from '@/tiptap-extras/WavyText'

export default {
  components: {
    Editor,
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    // wordCountTipTap() {
    //   return this.editor.isNode()
    // },
    wordCount() {
      return this.editor.getHTML().split(' ').length
    },
    readingTimeMinutes() {
      // 265 words per minute reading speed
      return Math.ceil(this.wordCount / 265)
    },
    readingTimeString() {
      const hours = Math.floor(this.readingTimeMinutes / 60)
      const minutes = this.readingTimeMinutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
      )}`
    }
  },
  created() {
    this.editor = new Editor({
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
        new Iframe(),
        new WavyText()
      ],
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh. Posuere urna nec tincidunt praesent semper feugiat. Et ultrices neque ornare aenean. Sem integer vitae justo eget magna fermentum iaculis eu non. Fringilla ut morbi tincidunt augue interdum velit euismod. A scelerisque purus semper eget. Dictum sit amet justo donec. Orci dapibus ultrices in iaculis nunc sed augue. Pulvinar neque laoreet suspendisse interdum consectetur libero. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. A condimentum vitae sapien pellentesque. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Id cursus metus aliquam eleifend. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Consectetur purus ut faucibus pulvinar elementum.'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Elementum pulvinar etiam non quam lacus suspendisse. Suspendisse ultrices gravida dictum fusce. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Suspendisse in est ante in nibh mauris cursus. Faucibus a pellentesque sit amet. Adipiscing elit ut aliquam purus sit. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Purus non enim praesent elementum facilisis leo. Turpis massa sed elementum tempus egestas sed. Non enim praesent elementum facilisis leo. Ut tellus elementum sagittis vitae et leo. Nec nam aliquam sem et tortor. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Quisque non tellus orci ac auctor.'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Pulvinar proin gravida hendrerit lectus a. Senectus et netus et malesuada fames ac turpis egestas. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Libero nunc consequat interdum varius sit amet. Vitae auctor eu augue ut. Neque egestas congue quisque egestas. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis.'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Eget mauris pharetra et ultrices neque. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Vivamus at augue eget arcu dictum varius duis at consectetur. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Sapien pellentesque habitant morbi tristique senectus et netus et. Ac felis donec et odio pellentesque. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Facilisis sed odio morbi quis commodo odio aenean. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Pellentesque sit amet porttitor eget dolor morbi non. Sit amet consectetur adipiscing elit ut. Ultrices sagittis orci a scelerisque. Id eu nisl nunc mi. Vitae justo eget magna fermentum iaculis eu. Volutpat consequat mauris nunc congue.'
              }
            ]
          }
        ]
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
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
    logEditorContent() {
      console.log(this.editor.getJSON())
    }
  }
}
</script>

<style lang="postcss">
.menubar {
  button:first-child {
    @apply rounded-l;
  }
  button:last-child {
    @apply rounded-r;
  }
  button {
    @apply p-2 text-white bg-gray-700 border border-gray-800;
    &:hover {
      @apply bg-gray-800;
    }
    .is-active {
      @apply bg-gray-400 text-gray-800;
    }
  }
}

/* Reference: https://github.com/tailwindcss/discuss/issues/243 */
/* .lesson-content > div { */
.ProseMirror {
  /* outline-none */
  @apply px-2 text-lg text-gray-800 leading-normal;
  > * + *,
  li + li,
  li > p + p {
    @apply mt-4;
  }
}
/* .lesson-content {
  @apply text-lg text-gray-800 leading-normal;
    > * + *, li + li, li > p + p {
        @apply mt-6;
    }
        strong {
        @apply text-gray-900 font-bold;
    }
        a {
        @apply text-gray-900 font-semibold;
    }
        strong a {
        @apply font-bold;
    }
        h2 {
        @apply leading-tight text-xl font-bold text-gray-900 mb-2 mt-10;
    }
        h3 {
        @apply leading-tight text-lg font-bold text-gray-900 mt-8 -mb-2;
    }
        code {
        @apply font-mono text-sm inline bg-gray-200 px-1;
    }
        pre code {
        @apply block bg-gray-900 p-4 rounded;
    }
        blockquote {
        @apply border-l-4 border-gray-400 pl-4 italic;
    }
        ul, ol {
        @apply pl-5;
        @screen sm {
        @apply pl-10;
        }
    }
} */
</style>
