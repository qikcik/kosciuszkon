class UserViewer extends HTMLElement {
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
                    width: calc(100vw );
                
                    justify-content: center;
                    align-items: center;
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
            <main>
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
            </main>
            <h2 style="text-align: left">Liked meme</h2>
            <main>
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
                    <img src="https://cdn.discordapp.com/attachments/1080781736943812618/1081926179155615764/316841207_1986559981735714_8114431435510898845_n.png">
            </main>

        `;
    }
    async Focus() {

    }
}

customElements.define("user-viewer", UserViewer);