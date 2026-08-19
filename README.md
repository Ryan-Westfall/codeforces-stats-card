# codeforces-stats-card

A self-contained **React** card that displays a [Codeforces](https://codeforces.com)
user's **total solved problems** at the top and their **contest-rating history graph**
below. Just pass a handle — it fetches everything from the public Codeforces API and
ships its own styles, so there's nothing else to wire up.

<!-- Preview: total solved on top, rating graph with Codeforces tier bands below. -->

## Features

- 🔢 Total distinct solved problems (from the user's accepted submissions)
- 📈 Contest-rating line graph with Codeforces rating-tier color bands
- 🎖️ Current rating, rank name, and max rating — colored by Codeforces tier
- 🎨 Light & dark themes, zero CSS imports (styles self-inject)
- 📦 No runtime dependencies beyond React (peer dependency)

## Install

From npm:

```bash
npm install codeforces-stats-card
# or
bun add codeforces-stats-card
```

Or straight from GitHub (no npm account needed):

```bash
bun add github:Ryan-Westfall/codeforces-stats-card
# or
npm install github:Ryan-Westfall/codeforces-stats-card
```

React 17+ is a peer dependency.

## Usage

```jsx
import { CodeforcesCard } from 'codeforces-stats-card';

export default function App() {
  return <CodeforcesCard handle="Ryan-Westfall" />;
}
```

That's it. The card fetches the user's info, rating history, and submissions,
then renders the solved count and rating graph.

## Props

| Prop             | Type                 | Default        | Description                                                              |
| ---------------- | -------------------- | -------------- | ------------------------------------------------------------------------ |
| `handle`         | `string`             | **(required)** | The Codeforces handle to display.                                        |
| `theme`          | `'light' \| 'dark'`  | `'light'`      | Color theme.                                                             |
| `title`          | `string`             | `'Codeforces'` | Card heading text.                                                       |
| `showRank`       | `boolean`            | `true`         | Show the rank badge and max rating.                                      |
| `maxSubmissions` | `number`             | `10000`        | How many recent submissions to scan when counting distinct solved problems. |
| `className`      | `string`             | `''`           | Extra class names for the root element.                                  |
| `style`          | `React.CSSProperties`| —              | Inline styles for the root element.                                      |

## Styling

Styles are injected once into `<head>` under `#cfsc-styles`. Everything is scoped
to the `.cfsc-*` class namespace. You can override the look via CSS variables on
`.cfsc-card`, e.g.:

```css
.cfsc-card {
  --cfsc-line: #e43e3e;   /* rating line + area color */
  --cfsc-bg: #fbfbfb;
}
```

## Data source

All data comes from the public [Codeforces API](https://codeforces.com/apiHelp):
`user.info`, `user.rating`, and `user.status`. No API key required. The Codeforces
API sends permissive CORS headers, so this works from the browser.

## License

MIT © Ryan Westfall
