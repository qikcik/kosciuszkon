(async ()=>{
    /*while(true)
    {
        let username = prompt("username");
        let password = prompt("password");

        const res = await COMMUNICATION.query('auth',{username: username, password: password});
        if(res.result == "success")
        {
            COMMUNICATION.token = res.token;
            break;
        }
    }*/

    COMMUNICATION.token = 13;

    const views = [];
    const addMainView = async (el) => {
        el.style.display = "none";
        document.querySelector(`main`).appendChild(el);
    }


    let element = document.createElement("meme-viewer");
    await addMainView(element);

    element = document.createElement("upload-meme");
    await addMainView(element);

    element = document.createElement("user-viewer");
    element.Construct(COMMUNICATION.token);
    await addMainView(element);


    element = document.createElement("nearby-viewer");
    await addMainView(element);


    let el = await document.querySelector(`main`);
    console.log(el);
    el.children[0].style.display = "flex";
    el.children[0].Focus();

    let nav = await document.querySelector(`nav`);
    [...el.children].forEach(x => {
        let btn = document.createElement("button");
        btn.innerText = x.tagName;
        btn.onclick = async () => {
            [...el.children].forEach(x => { x.Defocus() ; x.style.display = "none" });
            x.style.display = "flex";
            console.log(x);
            x.Focus();
        }
        nav.appendChild(btn);
    })
})();
//m13484_mbm
//#eX0Tqs*PG6$4vOd_h+V+r.7P05Hel
