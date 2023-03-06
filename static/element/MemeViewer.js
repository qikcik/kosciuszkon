class MemeViewer extends HTMLElement {
    connectedCallback() {
        this.inner = this.attachShadow({ mode: "open" });
        this.Update();
    }
    Construct(data) {
        this.data = data;
    }

    Update() {
        this.inner.innerHTML = `
            <style>
                :host {
                    display: flex;
                }
                
                single-mem {
                    display: none;
                }
                
                single-mem:first-of-type {
                    display: flex;
                }
            </style>

            <main></main>
        `;

        this.connectGesture();

        this.data.forEach(x => {
            this.createSingleMemeView(x);
        });

        this.response = {
            liked: [],
            disliked: [],
        }
    }

    createSingleMemeView(entry) {
        let element = document.createElement("single-mem");
        element.Construct(entry);
        this.inner.querySelector(`main`).appendChild(element);
    };

    connectGesture() {
        const threshold = 0.2;

        const TransformLastElement = (value) => {
            this.inner.querySelector(`single-mem:first-of-type`).style.transform = `translate(${value*100}vw)`;
            if(Math.abs(value) > threshold) {
                this.inner.querySelector(`single-mem:first-of-type`).style.opacity = `${1 - (Math.abs(value) * 3)}`;
            }
            if(value == 0)
            {
                this.inner.querySelector(`single-mem:first-of-type`).style.opacity = `1`;
            }
        }

        GESTURE.swipe.onChange_delegates.push(TransformLastElement);

        GESTURE.swipe.onApply_delegates.push((value)=>{
            if(Math.abs(value) < threshold) {
                TransformLastElement(0);
                return;
            }
            const element = this.inner.querySelector(`single-mem:first-of-type`);
            if(value > 0)
            {
                this.likeMeme(element.data);
            }
            else
            {
                this.dislikeMeme(element.data);
            }

            element.remove();

            // actual logic:
            const left = this.inner.querySelectorAll(`single-mem`);
            if(left.length < 3) {
                this.loadMoreMeme();
            }
        })
    }

    loadMoreMeme() {
        this.data.forEach(x => {
            this.createSingleMemeView(x);
        });
    }

    likeMeme(data)
    {
        this.response.liked.push(data.id);
        console.log(this.response);
    }

    dislikeMeme(data)
    {
        this.response.disliked.push(data.id);
        console.log(this.response);
    }
}

customElements.define("meme-viewer", MemeViewer);