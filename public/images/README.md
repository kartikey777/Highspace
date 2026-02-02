# Adding your own images

Place your furniture photos here so they appear in the Highspace Furniture showcase.

## Folder structure

Create one folder per **category**, then one folder per **item** inside it. Use the same IDs/slugs as in `src/data/furniture.js` so paths match.

Example:

```
public/images/
  living-room/
    modern-velvet-sofa/
      1.jpg
      2.jpg
      3.jpg
    marble-coffee-table/
      1.jpg
      2.jpg
  bedroom/
    upholstered-platform-bed/
      1.jpg
      2.jpg
```

## Using these images in the site

In `src/data/furniture.js`, set each item’s `images` array to paths starting with `/images/`:

```js
{
  id: 'lr-1',
  name: 'Modern Velvet Sofa',
  description: '...',
  images: [
    '/images/living-room/modern-velvet-sofa/1.jpg',
    '/images/living-room/modern-velvet-sofa/2.jpg',
    '/images/living-room/modern-velvet-sofa/3.jpg',
  ],
},
```

Category IDs: `living-room`, `bedroom`, `office`, `dining`.  
You can name item folders however you like; just use the same path in the `images` array.

You can mix your own files (e.g. `/images/...`) with external URLs (e.g. `https://...`) in the same item.

## Home page hero background

The home page hero uses an image of Goddess Saraswati (Raja Ravi Varma, public domain) from Wikimedia Commons. To use your own image instead, add a file such as `saraswati-bg.jpg` in `public/images/` and update the `background-image` in `src/components/Hero.css` to `url('/images/saraswati-bg.jpg')`.
