class UploadMeme extends HTMLElement {
    async connectedCallback() {
        this.inner = this.attachShadow({ mode: "open" });
        this.Update();
    }
    Construct(data) {
        this.data = data;
    }

    async Update() {
        this.inner.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: calc(100vw - var(--def-padding) );
                    height: 100%;
                
                    justify-content: center;
                    align-items: center;
                }
                img {
                    max-width: 100%;
                    height:auto;
                    max-height: calc(60vh);
                }
            </style>

            <div></div>
            <button id="reselect"> Reselect </button>
            <button id="submit"> Submit </button>
        `;

        this.inner.querySelector(`#reselect`).onclick = async () => { await this.Focus() };
        this.inner.querySelector(`#submit`).onclick = async () => {
            console.log({image: this.imageSrc});
            let res = await COMMUNICATION.query('memes/upload',{image: this.imageSrc});
            console.log(res);
        };

    }
    async Focus() {
        let file = await this.selectFile("image/*", false);
        this.inner.querySelector('div').innerHTML = "";

        let img = document.createElement("img");
        this.imageSrc = await this.readURL(file);
        img.src = this.imageSrc;
        this.inner.querySelector('div').appendChild(img);

    }

    async selectFile(contentType, multiple){
        return new Promise(resolve => {
            let input = document.createElement('input');
            input.type = 'file';
            input.multiple = multiple;
            input.accept = contentType;

            input.onchange = () => {
                let files = Array.from(input.files);
                if (multiple)
                    resolve(files);
                else
                    resolve(files[0]);
            };

            input.click();
        });
    }

    readURL (file) {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };
}

customElements.define("upload-meme", UploadMeme);