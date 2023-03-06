class NearByViewer extends HTMLElement {
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
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
              integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
              crossorigin=""/>
          
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
                #map {
                    height: 70vh;
                    width: 100vw;
                }
            </style>
            <div id="map"></div>
        `;

        let map = L.map(this.inner.querySelector('#map')).setView([50.0468548,19.9348337], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        function success(pos) {
            const crd = pos.coords;

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

        function onClick(e) {
            console.log(this.getLatLng());
        }

        const db = [
            {
                user: {id:1},
                pos:[50.08403091862622, 19.99620552162324],
            },
            {
                user: {id:2},
                pos:[50.08432694267945, 19.996784878731038],
            }
        ]
        db.forEach(e => {
            let marker = L.marker(e.pos).on('click', onClick).addTo(map);
        });
    }

    async Focus() {
        this.Update()
    }
}

customElements.define("nearby-viewer", NearByViewer);