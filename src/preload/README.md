# preload-image

Sometimes, our H5 APP will has a loading page, in the loading page, we need pre-load image resource and show the progress.

We can use this.

```js
import preload from 'shadows-preload-image';

const preLoader = preload([...preloadUrls]);
preLoader.onComplete(() => {
  console.log('onComplete');
});
preLoader.onProgress(progress => {
  console.log(progress);
});
```

But sometimes we can not know the image url, or the url is actively, we can use it like this.

At first, we need define them in your html template.
```html
<div class="preload-img"></div>

<style>
  .preload-img {
    background-image: url(actively_remote_url),
    url(actively_remote_url),
    url(actively_remote_url),
    url(actively_remote_url);
    /* It course them hidden, you can use `display: none;` also */
    width: 0;
    height: 0;
  }
</style>
```

And then, You can use preload like this.
```js
import preload from 'shadows-preload-image';

const preLoader = preload();
preLoader.onComplete(() => {
  console.log('onComplete');
});
preLoader.onProgress(progress => {
  console.log(progress);
});
```

It's works!