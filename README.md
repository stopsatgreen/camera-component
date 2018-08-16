# camera-component

A reusable camera element, from the tutorial [How to Build a Simple Camera Component](https://frontendnews.io/editions/2018-08-15-simple-camera-component) by David East.

## setup

Add the custom camera element to the page:

```
<simple-camera></simple-camera>
```

Add buttons to capture images:

```
<button id="btnBlobPhoto">Blob</button>
<button id="btnBase64Photo">Base 64</button>
```

Include the camera script:

```
<script src="camera.js"></script>
```

Add the script to open the camera and add capture events:

```
<script>
(async function() {
const camera = document.querySelector('simple-camera');
const btnPhoto = document.getElementById('btnPhoto');
await camera.open({
  video: {
    facingMode: 'user'
  }
});
btnBlobPhoto.addEventListener('click', async (event) => {
  const photo = await camera.takeBlobPhoto();
  console.log(photo);
});
btnBase64Photo.addEventListener('click', async (event) => {
  const photo = camera.takeBase64Photo({ type: 'jpeg', quality: 0.8 });
  console.log(photo);
});
}());
</script>
  ```
