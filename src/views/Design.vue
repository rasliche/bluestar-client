<template>
  <main>
    <h1 class="page-heading">
      Design
    </h1>
    <section class="mt-4">
      <h2>Tokens</h2>
      <p class="leading-normal">
        Use this area to describe design tokens: colors, font weights, spacing, tone.
      </p>
    </section>
    <section class="mt-4">
      <h2>Page Headings</h2>
      <p class="leading-normal">
        The top-level heading above uses a <pre class="inline-block">.page-heading</pre> class that combines
        tailwind css classes in the <pre class="inline-block">App.vue</pre> style section. This is
        used as the main heading for a view, that is, a top level route component.
      </p>
    </section>
    <section class="mt-4">
      <h2>Subheading for Sections</h2>
      <p class="leading-normal">
        The text above is wrapped in a section with no styling, as are all the following
        sections of the document.
      </p>
    </section>
    <section class="mt-4">
      <h2>Buttons</h2>
      <p class="leading-normal">
        Buttons can come in several different flavors. Primary, Secondary, Danger, are the main ones.
      </p>
      <div class="flex justify-around">
        <BaseButton>Base Button</BaseButton>
        <BaseButton class="bg-blue hover:bg-blue-dark text-white">Primary</BaseButton>
        <BaseButton class="border bg-grey-lightest hover:bg-grey-light">Secondary</BaseButton>
        <BaseButton class="bg-red hover:bg-red-dark text-white">Danger</BaseButton>
      </div>
    </section>
    <section class="mt-4">
      <h2>Cards</h2>
      <p class="leading-normal">
        The <pre class="inline-block">BaseCard</pre> component is a very unopinionated wrapper that simply gives a white 
        background, 1px border, large rounded corners, and hides overflow to keep content within.
      </p>
      <div class="flex justify-around">
        <BaseCard>Primary</BaseCard>
      </div>
    </section>
  </main>
</template>

<script>
import BaseButton from '@/components/BaseUI/BaseButton.vue'
import BaseCard from '@/components/BaseUI/BaseCard.vue'

export default {
  components: { 
    BaseButton,
    BaseCard
  }
}
</script>
