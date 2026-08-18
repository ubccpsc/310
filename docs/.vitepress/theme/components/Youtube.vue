<script setup lang="ts">
// Replaces Hugo's {{< youtube ID >}} shortcode.
// Uses youtube-nocookie and lazy loading so pages with many embeds stay fast —
// several reader chapters have a dozen or more.
const props = defineProps<{ id: string; title?: string }>()
</script>

<template>
  <div class="yt-embed">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${props.id}`"
      :title="props.title ?? 'Course video'"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.yt-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.yt-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
