import { defineConfig } from "vitepress";

// The term the site currently points at. Bump this once per term, after copying
// docs/<prev-term>/ to docs/<new-term>/ and adding a sidebar key below.
const CURRENT_TERM = "26w1";

export default defineConfig({
	title: "UBC CPSC 310",
	description: "Introduction to Software Engineering",
	base: "/310/",
	cleanUrls: true,

	// Placeholder links in the term content still resolve to '#'; fail the build
	// on anything else that dangles.
	ignoreDeadLinks: [/^#$/],

	themeConfig: {
		search: { provider: "local" },

		// activeMatch keeps the nav bar honest about which of the two halves of the
		// site you are in, so the sidebar swapping at the boundary reads as
		// "I clicked into the textbook" rather than as a glitch.
		nav: [
			{ text: "Schedule", link: `/${CURRENT_TERM}/schedule` },
			{ text: "Syllabus", link: `/${CURRENT_TERM}/syllabus` },
			{
				text: "Materials",
				link: `/${CURRENT_TERM}/materials/`,
				activeMatch: `/${CURRENT_TERM}/materials/`,
			},
			{
				text: "Project",
				link: `/${CURRENT_TERM}/project/`,
				activeMatch: `/${CURRENT_TERM}/project/`,
			},
			{ text: "Course Reader", link: "/textbook/", activeMatch: "/textbook/" },
		],

		// Keyed by path prefix: each section shows only its own sidebar, so the
		// term site and the reader never appear as competing nested trees.
		sidebar: {
			"/26w1/": [
				{
					text: "CPSC 310 — 2026W1",
					items: [
						{ text: "Home", link: "/26w1/" },
						{ text: "Schedule", link: "/26w1/schedule" },
						{ text: "Syllabus", link: "/26w1/syllabus" },
					],
				},
				{
					text: "Course materials",
					link: "/26w1/materials/",
					items: [
						{
							text: "Unit 1 — Design in the small",
							link: "/26w1/materials/unit-01/",
						},
						{
							text: "Unit 2 — Layers & interfaces",
							link: "/26w1/materials/unit-02/",
						},
						// {
						// 	text: "Unit 3 — Requirements & specification",
						// 	link: "/26w1/materials/unit-03/",
						// },
						// {
						// 	text: "Unit 4 — Software process",
						// 	link: "/26w1/materials/unit-04/",
						// },
					],
				},
				{
					text: "Project",
					link: "/26w1/project/",
					items: [
						{
							text: "D1 — Drop in a feature",
							link: "/26w1/project/d1-drop-in-a-feature",
						},
						// {
						// 	text: "D2 — Make it testable",
						// 	link: "/26w1/project/d2-make-it-testable",
						// },
						// { text: "D3 — Design v3", link: "/26w1/project/d3-design-v3" },
						// { text: "D4 — Build it", link: "/26w1/project/d4-build-it" },
						{ text: "AutoTest", link: "/26w1/project/AutoTest" },
					],
				},
				{ text: "📖 Course Reader →", link: "/textbook/" },
			],

			// Generated from the reader's own Hugo `weight` front matter, so the
			// reader keeps its established ordering independent of any term's arc.
			"/textbook/": [
				{
					text: `← Back to ${CURRENT_TERM.toUpperCase()}`,
					link: `/${CURRENT_TERM}/`,
				},
				{ text: "Reader overview", link: "/textbook/" },
				{ text: "Introduction", link: "/textbook/0-introduction/" },
				{
					text: "Software Construction",
					link: "/textbook/1-construction-basics/",
					collapsed: true,
					items: [
						{
							text: "Programming languages",
							link: "/textbook/1-construction-basics/languages/",
						},
						{
							text: "Asynchronous Programming",
							link: "/textbook/1-construction-basics/async/",
						},
						{
							text: "Assertions",
							link: "/textbook/1-construction-basics/assertions/",
						},
						{
							text: "REST Architecture",
							link: "/textbook/1-construction-basics/rest/",
						},
					],
				},
				{
					text: "Analytical Code Design",
					link: "/textbook/2-analytical-code-design/",
					collapsed: true,
					items: [
						{
							text: "Cost of Change",
							link: "/textbook/2-analytical-code-design/cost-of-change/",
						},
						{
							text: "Change Difficulty",
							link: "/textbook/2-analytical-code-design/change-difficulty/",
						},
						{
							text: "Refactoring",
							link: "/textbook/2-analytical-code-design/refactoring/",
						},
						{
							text: "Design Principles",
							link: "/textbook/2-analytical-code-design/principles/",
						},
						{
							text: "Testability",
							link: "/textbook/2-analytical-code-design/testability/",
						},
					],
				},
				{
					text: "Software Design",
					link: "/textbook/3-software-design/",
					collapsed: true,
					items: [
						{
							text: "Design Patterns",
							link: "/textbook/3-software-design/design-patterns/",
						},
						{
							text: "Safe Versioning",
							link: "/textbook/3-software-design/versioning/",
						},
						{ text: "APIs", link: "/textbook/3-software-design/apis/" },
						{
							text: "Testing Pyramid",
							link: "/textbook/3-software-design/testing-pyramid/",
						},
					],
				},
			],
		},

		outline: { level: [2, 3] },

		editLink: {
			pattern: "https://github.com/ubccpsc/310/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		footer: {
			message: "Course reader licensed under CC BY-SA 3.0.",
			copyright: "UBC Department of Computer Science",
		},
	},
});
