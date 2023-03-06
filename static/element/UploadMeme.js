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
                }
            </style>

            <h1> Upload </h1>
            <button>Send</button>
        `;
        this.inner.querySelector('button').onclick = async () => {
            let files = await this.selectFile("image/*", true);
            console.log(files);
        }

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
}

customElements.define("upload-meme", UploadMeme);