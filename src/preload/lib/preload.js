function getPreloadUrls() {
  let preloadImg = document.querySelector(".preload-img");
  const images = getComputedStyle(preloadImg, "").backgroundImage;
  const urlRE = new RegExp(/(?<=url\().*?(?=\))/g);
  const imagesUrls = images.match(urlRE).map(item => item.replace(/(\'|\")/g, ""));
  return imagesUrls;
}

function noop() { };

class Preload {
  // preloadUrls = [];
  // progress = 0;
  // current = 0;

  constructor(preloadUrls) {
    this.preloadUrls = preloadUrls || getPreloadUrls();
    this.progress = this.preloadUrls.length;
    this.current = 0;
  }

  preload() {
    const preloadUrls = this.preloadUrls;
    preloadUrls.forEach(url => this.preloadOne(url));
  }

  preloadOne(url) {
    const img = new Image();
    img.onload = () => {
      img.onload = null;
      this.onImgLoadHandler();
    }
    img.src = url;
  }

  onImgLoadHandler() {
    this.current += 1;
    const progress = +(((this.current / this.progress) * 100).toFixed(0));
    
    this.onProgressHandler(progress);
    if (progress == 100) this.onCompleteHandler();
  }

  onProgress(handler = noop) {
    this.onProgressHandler = handler;
  }

  onComplete(handler = noop) {
    this.onCompleteHandler = handler;
  }
}

function preload(preloadUrls) {
  const preLoader = new Preload(preloadUrls);
  preLoader.preload();
  return preLoader;
}

export default preload;