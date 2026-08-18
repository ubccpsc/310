import { defineConfig } from 'vitepress'

// The term the site currently points at. Bump this once per term, after copying
// docs/<prev-term>/ to docs/<new-term>/ and adding a sidebar key below.
const CURRENT_TERM = '26w1'

export default defineConfig({
  title: 'UBC CPSC 310',
  description: 'Introduction to Software Engineering',
  base: '/310/',
  cleanUrls: true,

  // Placeholder links in the term content still resolve to '#'; fail the build
  // on anything else that dangles.
  ignoreDeadLinks: [/^#$/],

  themeConfig: {
    search: { provider: 'local' },

    // activeMatch keeps the nav bar honest about which of the two halves of the
    // site you are in, so the sidebar swapping at the boundary reads as
    // "I clicked into the textbook" rather than as a glitch.
    nav: [
      { text: 'Schedule', link: `/${CURRENT_TERM}/schedule` },
      { text: 'Syllabus', link: `/${CURRENT_TERM}/syllabus` },
      { text: 'Materials', link: `/${CURRENT_TERM}/materials/`, activeMatch: `/${CURRENT_TERM}/materials/` },
      { text: 'Project', link: `/${CURRENT_TERM}/project/`, activeMatch: `/${CURRENT_TERM}/project/` },
      { text: 'Textbook', link: '/textbook/', activeMatch: '/textbook/' },
    ],

    // Keyed by path prefix: each section shows only its own sidebar, so the
    // term site and the reader never appear as competing nested trees.
    sidebar: {
      '/26w1/': [
        {
          text: 'CPSC 310 — 2026W1',
          items: [
            { text: 'Home', link: '/26w1/' },
            { text: 'Schedule', link: '/26w1/schedule' },
            { text: 'Syllabus', link: '/26w1/syllabus' },
          ],
        },
        {
          text: 'Course materials',
          link: '/26w1/materials/',
          items: [
            { text: 'Part 1 — Design in the small', link: '/26w1/materials/part-01/' },
            { text: 'Part 2 — Boundaries', link: '/26w1/materials/part-02/' },
            { text: 'Part 3 — Requirements & specification', link: '/26w1/materials/part-03/' },
            { text: 'Part 4 — Process, CI & DevOps', link: '/26w1/materials/part-04/' },
          ],
        },
        {
          text: 'Project',
          link: '/26w1/project/',
          items: [
            { text: 'D1 — Drop in a feature', link: '/26w1/project/d1-drop-in-a-feature' },
            { text: 'D2 — Make it testable', link: '/26w1/project/d2-make-it-testable' },
            { text: 'D3 — Design v3', link: '/26w1/project/d3-design-v3' },
            { text: 'D4 — Build it', link: '/26w1/project/d4-build-it' },
            { text: 'AutoTest', link: '/26w1/project/AutoTest' },
          ],
        },
        { text: '📖 Textbook →', link: '/textbook/' },
      ],

      // Generated from the reader's own Hugo `weight` front matter, so the
      // reader keeps its established ordering independent of any term's arc.
      '/textbook/': [
        { text: `← Back to ${CURRENT_TERM.toUpperCase()}`, link: `/${CURRENT_TERM}/` },
        { text: 'Reader overview', link: '/textbook/' },
        { text: "Introduction", link: "/textbook/introduction/" },
        {
          text: "Software Testing",
          link: "/textbook/testing/",
          collapsed: true,
          items: [
            { text: "Assertions", link: "/textbook/testing/assertions/" },
            { text: "Testability", link: "/textbook/testing/testability/" },
            { text: "Glass Box Testing", link: "/textbook/testing/glassbox/" },
            { text: "Black Box Testing", link: "/textbook/testing/blackbox/" },
            { text: "Fuzz Testing", link: "/textbook/testing/fuzz/" },
            { text: "Mutation Testing", link: "/textbook/testing/mutation/" },
          ],
        },
        {
          text: "Software Process",
          link: "/textbook/process/",
          collapsed: true,
          items: [
            { text: "Specifications", link: "/textbook/process/specifications/" },
            { text: "User Stories", link: "/textbook/process/user-stories/" },
            { text: "Automation", link: "/textbook/process/automation/" },
          ],
        },
        {
          text: "High-Level Design",
          link: "/textbook/high-level-design/",
          collapsed: true,
          items: [
            { text: "Design Principles", link: "/textbook/high-level-design/principles/" },
            { text: "APIs", link: "/textbook/high-level-design/apis/" },
            { text: "Technical Representations", link: "/textbook/high-level-design/representations/" },
          ],
        },
        {
          text: "Low-Level Design",
          link: "/textbook/low-level-design/",
          collapsed: true,
          items: [
            { text: "Design Patterns", link: "/textbook/low-level-design/design-patterns/" },
            { text: "MV*", link: "/textbook/low-level-design/mv-star/" },
          ],
        },
        {
          text: "Software Construction",
          link: "/textbook/construction/",
          collapsed: true,
          items: [
            { text: "Programming languages", link: "/textbook/construction/languages/" },
            { text: "Asynchronous Programming", link: "/textbook/construction/async/" },
            { text: "Refactoring", link: "/textbook/construction/refactoring/" },
            { text: "REST Architecture", link: "/textbook/construction/rest/" },
          ],
        },
        {
          text: "Ethics and Security",
          link: "/textbook/ethics-security/",
          collapsed: true,
          items: [
            { text: "Information Security", link: "/textbook/ethics-security/security/" },
            { text: "Ethics", link: "/textbook/ethics-security/ethics/" },
            { text: "Intellectual Property", link: "/textbook/ethics-security/ip/" },
          ],
        },
      ],
    },

    outline: { level: [2, 3] },

    editLink: {
      pattern: 'https://github.com/ubccpsc/310/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Course reader licensed under CC BY-SA 3.0.',
      copyright: 'UBC Department of Computer Science',
    },
  },
})
