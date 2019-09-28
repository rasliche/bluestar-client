<template>
  <div class="editor">
      <EditorMenuBar :editor="editor" v-slot="{ commands, isActive }">
          <div>
            <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                Bold
            </button>
            <button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
                H1
            </button>
            <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
                H2
            </button>
            <button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
                H3
            </button>
            <button :class="{ 'is-active': isActive.link() }" @click="commands.link">
                a
            </button>
          </div>
      </EditorMenuBar>
      <EditorContent :editor="editor"></EditorContent>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Heading, Link, History } from 'tiptap-extensions'

export default {
    name: 'wysiwyg',
    components: {
        EditorContent,
        EditorMenuBar
    },
    data() {
        return {
            editor: new Editor({
                content: '<p>Default content</p>',
                extensions: [
                    new Bold(),
                    new Heading({
                        levels: [1,2,3]
                    }),
                    new Link(),
                    new History(),
                ],
            })
        }
    },
    beforeDestroy() {
        // Always destroy your editor instance when it's no longer needed
        this.editor.destroy()
    },
}
</script>