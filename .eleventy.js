// Official Eleventy Plugins
const pluginNavigation = require("@11ty/eleventy-navigation");
//const pluginRSS = require("@11ty/eleventy-plugin-rss");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

// markdown-it plugins
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFigures = require('markdown-it-image-figures');

// Other plugins
const { DateTime } = require("luxon");

module.exports = function(config) {

	// -------------------------------------------------------------------- //
	// Customised markdown library

	var md = markdownIt({html: true, breaks: true, linkify: true});
	md.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			placement: 'after',
			class: 'direct-link',
			symbol: '#',
			level: [1,2,3,4],
		}),
	});
	md.use(markdownItAttrs, {});
	md.use(markdownItFigures, {
		// lazy: true,
		// async: true,
		figcaption: 'alt'
	});
	
	config.setLibrary('md', md);

	// -------------------------------------------------------------------- //
	// Collections
	var current = new Date();
	current.setDate(current.getDate() - 1);

	config.addCollection("upcoming", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date > current;
		});
	});

	var dateThisMonth = new Date();
	dateThisMonth.setDate(0);

	var dateNextMonth = new Date();
	dateNextMonth.setMonth(dateNextMonth.getMonth() + 1);
	dateNextMonth.setDate(1);

	config.addCollection('thisMonth', (collection) => {
		const currentMonth = current.getMonth();
		return collection.getFilteredByTag('events').filter((item) => {
			if (!item.data.date) return false;

			const itemMonth = item.data.date.getMonth();

			if (itemMonth != currentMonth) return false;

			return item.data.date > dateThisMonth && item.data.date < dateNextMonth;
		});
	});

	config.addCollection('nextMonth', (collection) => {
		const nextMonth = dateNextMonth.getMonth();
		return collection.getFilteredByTag('events').filter((item) => {
			if (!item.data.date) return false;

			const itemMonth = item.data.date.getMonth();

			if (itemMonth != nextMonth) return false;

			return item.data.date > dateNextMonth;
		});
	});


	config.addCollection("past", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date < current;
		});
	});

	config.addCollection("recurring", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date == undefined;
		})
	});

	config.addCollection("byYear", (collection) => {
		const posts = collection.getFilteredByTag('events').reverse();
		const years = posts.map(post => post.date.getFullYear());
		const uniqueYears = [...new Set(years)];

		const postsByYear = uniqueYears.reduce((prev, year) => {
			const filteredPosts = posts.filter(post => post.date.getFullYear() === year);

			return [
				...prev,
				[year, filteredPosts]
			];
		}, []);

		return postsByYear;
	});

	// -------------------------------------------------------------------- //
	// Filters

	// Filter: Readable Date. Converts DateObject to "01 Jul 2023"
	config.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	config.addFilter('shortDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL");
	});

	// Filter: Markdown
	config.addFilter('md', (content) => md.render(content));

	// -------------------------------------------------------------------- //
	// CALENDAR BUSINESS

	config.addNunjucksGlobal("getDate", (dateObj) => dateObj.getDate());
	config.addNunjucksGlobal("getMonth", (dateObj) => dateObj.getMonth());

	// Nunjucks Globals
	let now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	// Collect data for *this month* and *next month*
	const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
	const currMonthLastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
	const nextMonthLastDate = new Date(currentYear, currentMonth + 2, 0).getDate();

	const currFirstWeekday = new Date(currentYear, currentMonth, 1).getDay();
	const currLastWeekday  = new Date(currentYear, currentMonth + 1, 0).getDay();
	const nextFirstWeekday = new Date(currentYear, currentMonth + 1, 1).getDay();
	const nextLastWeekday  = new Date(currentYear, currentMonth + 2, 0).getDay();

	const currMonthDays = [...Array(currMonthLastDate)].map((_, i) => i + 1);
	const nextMonthDays = [...Array(nextMonthLastDate)].map((_, i) => i + 1);

	const prevMonthPeek = [...Array(currFirstWeekday - 1)].map((_, i) => prevMonthLastDate - i).reverse();
	const currMonthPeek = [...Array(nextFirstWeekday - 1)].map((_, i) => currMonthLastDate - i).reverse();
	const nextMonthPeek = (currLastWeekday > 0) ? [...Array(7 - currLastWeekday)].map((_, i) => i + 1) : [];
	const afterMonthPeek = (nextLastWeekday > 0) ? [...Array(7 - nextLastWeekday)].map((_, i) => i + 1) : [];

	const nextMonth = new Date(currentYear, currentMonth + 1, 1).getMonth();

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const currMonthName = `${monthNames[currentMonth]} ${dateThisMonth.getYear() + 1900}`;
	const nextMonthName = `${monthNames[nextMonth]} ${dateNextMonth.getYear() + 1900}`;

	config.addNunjucksGlobal('currMonthName', currMonthName);
	config.addNunjucksGlobal('nextMonthName', nextMonthName);
	config.addNunjucksGlobal('currMonth',      currentMonth);
	config.addNunjucksGlobal('nextMonth',      nextMonth);
	config.addNunjucksGlobal('currMonthDays',  currMonthDays);
	config.addNunjucksGlobal('nextMonthDays',  nextMonthDays);
	config.addNunjucksGlobal('prevMonthPeek',  prevMonthPeek);
	config.addNunjucksGlobal('currMonthPeek',  currMonthPeek);
  	config.addNunjucksGlobal('nextMonthPeek',  nextMonthPeek);
  	config.addNunjucksGlobal('afterMonthPeek', afterMonthPeek);

	// -------------------------------------------------------------------- //
	// Plugins
	config.addPlugin(EleventyHtmlBasePlugin);
	config.addPlugin(pluginNavigation);
	//config.addPlugin(pluginRSS);

	// Passthrough
	config.addPassthroughCopy({"src/_": "."});
	config.addPassthroughCopy("src/img");

	// Set parsing option to look for excerpts '---'
	config.setFrontMatterParsingOptions({excerpt: true})

	// -------------------------------------------------------------------- //
	// Return config options
	return {
		markdownTemplateEngine: 'njk',
		dir: {
			input: "src",
			data: "_includes/_data",
			output: "build"
		}
	}

}