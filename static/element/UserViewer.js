class UserViewer extends HTMLElement {
    async connectedCallback() {
        this.inner = this.attachShadow({ mode: "open" });
        this.Update();
    }
    Construct(userId) {
        this.userId = userId;
    }

    async Defocus() {

    }

    async Update() {
        this.inner.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    min-height: 100%;
                }
                main {
                    width: fit-content;               
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                img {
                    display: block;
                    object-fit: cover;
                    width: calc(50vw - 1rem);
                    height: calc(50vw - 1rem);
                    border: 1px solid #333;
                }
            </style>
            
            <h2 style="text-align: left">uploaded meme</h2>
            <main id="uploaded">
            </main>
            <h2 style="text-align: left">Liked meme</h2>
            <main id="liked">
            </main>

        `;

        this.updateLiked();
        this.updateUploaded();
    }

    async updateLiked() {
        const memes = await COMMUNICATION.query('memes/liked', {userId: COMMUNICATION.token});
        if(memes.result == "success")
        {
            memes.list.forEach(x => {
                let img = document.createElement("img");
                img.src = x.img;
                this.inner.querySelector(`#liked`).appendChild(img);
            })
        }
    }

    async updateUploaded() {
        const memes = await COMMUNICATION.query('memes/uploadBy', {userId: this.userId});
        if(memes.result == "success")
        {
            memes.list.forEach(x => {
                let img = document.createElement("img");
                img.src = x.img;
                this.inner.querySelector(`#uploaded`).appendChild(img);
            })
        }
    }
    async Focus() {
        this.Update()
    }
}

customElements.define("user-viewer", UserViewer);