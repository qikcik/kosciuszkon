(async ()=>{

    const res = await fetch("/v1/memes");
    const memes = await res.json();

    let element = document.createElement("meme-viewer");
    element.Construct(memes);
    document.querySelector(`main`).appendChild(element);

})();
//m13484_mbm
//#eX0Tqs*PG6$4vOd_h+V+r.7P05Hel
