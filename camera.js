class SimpleCamera extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open'
    });
    this.videoElement = document.createElement('video');
    this.canvasElement = document.createElement('canvas');
    this.videoElement.setAttribute('playsinline', true);
    this.canvasElement.style.display = 'none';
    shadow.appendChild(this.videoElement);
    shadow.appendChild(this.canvasElement);
  }

  open(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        this.videoElement.srcObject = mediaStream;
        this.videoElement.onloadedmetadata = (e) => {
          this.videoElement.play();
        };
    });
  }

  _drawImage() {
    const imageWidth = this.videoElement.videoWidth;
    const imageHeight = this.videoElement.videoHeight;

    const context = this.canvasElement.getContext('2d');
    this.canvasElement.width = imageWidth;
    this.canvasElement.height = imageHeight;

    context.drawImage(this.videoElement, 0, 0, imageWidth, imageHeight);

    return { imageHeight, imageWidth };
  }

  takeBlobPhoto() {
    const { imageHeight, imageWidth } = this._drawImage();
    return new Promise((resolve, reject) => {
      this.canvasElement.toBlob((blob) => {
        resolve({ blob, imageHeight, imageWidth });
      });
    });
  }

  takeBase64Photo({ type, quality } = { type: 'png', quality: 1 }) {
    const { imageHeight, imageWidth } = this._drawImage();
    const base64 = this.canvasElement.toDataURL('image/' + type, quality);
    return { base64, imageHeight, imageWidth } 
  }
}

customElements.define('simple-camera', SimpleCamera);
