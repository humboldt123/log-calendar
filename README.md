# obsidian-calendar-plugin

This plugin for [Obsidian](https://obsidian.md/) creates a simple Calendar view for visualizing and navigating between your daily notes.


## Usage

After enabling the plugin in the settings menu, you should see the calendar view appear in the right sidebar.

The plugin reads my Daily Note settings to know the date format, daily note template location, and location for new daily notes it creates. Because my daily notes are sorted by my age at the time of creation, this plugin 

## Features

- Go to any **daily note**.
- Create new daily notes for days that don't have one. (This is helpful for when you need to backfill old notes or if you're planning ahead for future notes! This will use your current **daily note** template!)
- Visualize your writing. Each day includes a meter to approximate how much you've written that day.

## Settings

- **Start week on [default: locale]**: Configure the Calendar view to show Sunday or Monday as the first day of the week. Choosing 'locale' will set the start day to be whatever is the default for your chosen locale (`Settings > About > Language`)
- **Words per Dot [default: 250]**: Starting in version 1.3, dots reflect the word count of your files. By default, each dot represents 250 words, you can change that value to whatever you want. Set this to `0` to disable the word count entirely. **Note:** There is a max of 5 dots so that the view doesn't get too big!
- **Confirm before creating new note [default: on]**: If you don't like that a modal prompts you before creating a new daily note, you can turn it off.
- **Birthday**: Birthday to determine age of when note was created

## Customization

The following CSS Variables can be overridden in your `obsidian.css` file.

```css
/* obsidian-calendar-plugin */
/* https://github.com/liamcain/obsidian-calendar-plugin */

#calendar-container {
  --color-background-heading: transparent;
  --color-background-day: transparent;
  --color-background-weeknum: transparent;
  --color-background-weekend: transparent;

  --color-dot: var(--text-muted);
  --color-arrow: var(--text-muted);
  --color-button: var(--text-muted);

  --color-text-title: var(--text-normal);
  --color-text-heading: var(--text-muted);
  --color-text-day: var(--text-normal);
  --color-text-today: var(--interactive-accent);
  --color-text-weeknum: var(--text-muted);
}
```

In addition to the CSS Variables, there are some classes you can override for further customization. For example, if you don't like how bright the title is, you can override it with:

```css
#calendar-container .year {
  color: var(--text-normal);
}
```

> **Note:** It's especially important when overriding the classes to prefix them with `#calendar-container` to avoid any unexpected changes within Obsidian!

## Compatibility

`obsidian-calendar-plugin` currently requires Obsidian v0.9.11 or above to work properly.

## Installation

Install node modules with `npm install` and build with `npm run build`. Copy `main.js`, `styles.css` and `manifest.json` to a new directory in the `.obsidian/plugins`