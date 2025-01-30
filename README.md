# obsidian-calendar-plugin

This plugin for [Obsidian](https://obsidian.md/) creates a simple Calendar view for visualizing and navigating between my daily notes. I create this fork because my daily notes are not in the same directory, I sort them in folders according to my age at that specific day. (`Daily Log/15`, `Daily Log/16`, etc.)

![screenshot-full](./images/Screenshot%202025-01-29%20at%208.25.33 PM.png)

## Usage

After enabling the plugin in the settings menu, we should see the calendar view appear in the right sidebar.

The plugin reads our Daily Note settings to know the date format, daily note template location, and location for new daily notes it creates. 

## Features

- Go to any **daily note**.
- Create new daily notes for days that don't have one. (This is helpful for when I need to backfill old notes or if, planning ahead for future notes! This will use our current **daily note** template!)
- Visualize our writing. Each day includes a meter to approximate how much we've written that day.

## Settings

- **Start week on [default: locale]**: Configure the Calendar view to show Sunday or Monday as the first day of the week. Choosing 'locale' will set the start day to be whatever is the default for our chosen locale (`Settings > About > Language`)
- **Words per Dot [default: 250]**: Dots reflect the word count of our files. By default, each dot represents 250 words, we can change that value to whatever we want. Set this to `0` to disable the word count entirely. **Note:** There is a max of 5 dots so that the view doesn't get too big!
- **Confirm before creating new note [default: on]**: Can be turned off
- **Birthday [default: 2000-01-01]**: Birthday to determine which age folder to sort daily notes into.

## Customization

The following CSS Variables can be overridden in our `obsidian.css` file.

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

In addition to the CSS Variables, there are some classes we can override for further customization. For example, if we don't like how bright the title is, we can override it with:

```css
#calendar-container .year {
  color: var(--text-normal);
}
```

> **Note:** It's especially important when overriding the classes to prefix them with `#calendar-container` to avoid any unexpected changes within Obsidian!

## Compatibility

`obsidian-calendar-plugin` currently requires Obsidian v0.9.11 or above to work properly.

## Installation

This plugin is a fork and must be built locally. `git clone` this repository and install the neccesary node modules with `npm install`. Build this plugin via `npm run build`, this should yield a `main.js` file. Copy this file, `styles.css` and `manifest.json` to a directory for this plugin in our `.obsidian/plugins`
