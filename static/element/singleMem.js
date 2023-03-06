class SingleMem extends HTMLElement {
    connectedCallback() {
        this.inner = this.attachShadow({ mode: "open" });
        this.Update();
    }
    Construct(data) {
        this.data = data;
    }

    async Defocus() {

    }

    Update() {
        this.inner.innerHTML = `
            <style>
                :host {
                    display: flex;
                    width: calc(100vw - var(--def-padding) );
                
                    justify-content: center;
                    align-content: center;
                }
                
                div {
                    background-color: var(--element-fill-color);
                }
                
                img {
                    max-width: 100%;
                    height:auto;
                    max-height: calc(80vh);
                }
            </style>

            <div>
                <img src="${this.data.img}"">
            </div>
        `;
    }
}

customElements.define("single-mem", SingleMem);