# Image Switch Accordion
### A Hatch Labs Squarespace Component

A split-layout accordion for Squarespace List sections. Items expand on hover to reveal a description, while a paired image panel updates dynamically as you move between items — smooth crossfade included.

**[View demo](#)** · **[hatchlabs.com.au](https://hatchlabs.com.au)**

---

## Requirements

- Squarespace 7.1
- List section set to **Simple List** display type

---

## Installation

Do this once per site.

**Settings > Advanced > Code Injection > Header:**
```html
<!-- Image Switch Accordion by Hatch Labs -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hatch-labs/list-split-accordion@v1/core.min.css">
```

**Settings > Advanced > Code Injection > Footer:**
```html
<!-- Image Switch Accordion by Hatch Labs -->
<script src="https://cdn.jsdelivr.net/gh/hatch-labs/list-split-accordion@v1/core.min.js"></script>
```

---

## Setup

1. Add a **List** section to your page
2. In the List section settings, set the display type to **Simple List**
3. Turn off the **section header** and **section button** — these are not used by this component
4. Add your items — each item needs a **title**, **description**, and **image**. The item button is optional and will render as the arrow on each row if a link is provided.
5. Open the section settings and set the **Section ID** to:
```
list-split-accordion
```

The component activates automatically on page load.

---

## Customisation

Add any of these variables to **Design > Custom CSS** to override the defaults. You only need to include the ones you want to change.

```css
:root {
  /* your overrides here */
}
```

### Layout

| Variable | Default | Description |
|---|---|---|
| `--lsa-direction` | `row` | Image position. `row` = left, `row-reverse` = right |
| `--lsa-image-width` | `33%` | Width of the image panel |
| `--lsa-gap` | `17%` | Gap between image and list |
| `--lsa-image-aspect` | `4 / 5` | Image aspect ratio on desktop |
| `--lsa-mobile-aspect` | `16 / 9` | Image aspect ratio on mobile |
| `--lsa-image-radius` | `8px` | Image border radius |

### Colour

| Variable | Default | Description |
|---|---|---|
| `--lsa-accent` | `#000000` | Hover colour, button colour, active state |
| `--lsa-title-color` | `#1a1a1a` | List item title colour |
| `--lsa-desc-color` | `#666` | List item description colour |
| `--lsa-num-color` | `#aaa` | List item number colour |
| `--lsa-divider-color` | `rgba(0,0,0,0.1)` | Divider line colour |
| `--lsa-image-bg` | `#0b231a` | Image background (visible during crossfade) |
| `--lsa-image-overlay` | dark gradient | Gradient overlay on the image panel |

### Image overlay elements

| Variable | Default | Description |
|---|---|---|
| `--lsa-show-bg-num` | `1` | Large faded number top-right of image. `1` = show, `0` = hide |
| `--lsa-show-prehead` | `1` | Label above title on image. `1` = show, `0` = hide |
| `--lsa-show-image-title` | `1` | Item title on image. `1` = show, `0` = hide |
| `--lsa-prehead` | `"ITEM "` | Label word shown before the number on the image |

### Typography

| Variable | Default | Description |
|---|---|---|
| `--lsa-num-font-family` | `inherit` | List number font family |
| `--lsa-num-font-size` | `12px` | List number font size |
| `--lsa-num-font-weight` | `400` | List number font weight |
| `--lsa-image-title-font-family` | `inherit` | Image title font family |
| `--lsa-image-title-font-weight` | `400` | Image title font weight |
| `--lsa-prehead-font-family` | `'Courier New', monospace` | Prehead font family |
| `--lsa-prehead-font-size` | `10px` | Prehead font size |
| `--lsa-bg-num-font-weight` | `200` | Large background number font weight |

### Behaviour

| Variable | Default | Description |
|---|---|---|
| `--lsa-open-first` | `0` | Open first item on load. `1` = open, `0` = closed |
| `--lsa-img-transition` | `0.65s ease` | Image crossfade speed |
| `--lsa-desc-transition` | `0.55s` | Description expand speed |

---

## Example client configuration

```css
:root {
  --lsa-accent: #2d4a3e;
  --lsa-prehead: "SERVICE ";
  --lsa-direction: row-reverse;
  --lsa-open-first: 1;
}
```

---

## Licence

This component is licensed under [CC BY-NC-ND 4.0](LICENSE). You may not use, copy, or redistribute it for commercial purposes without written permission from Hatch Labs.

For licensing enquiries: laura@hatchlabs.com.au
