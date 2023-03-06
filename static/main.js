(async ()=>{

    let token = -1;
    const query = async (url,data) => {
        const raw = await fetch(`/v1/${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token, ...data})
        });
        return await raw.json();
    }

    while(true)
    {
        let username = prompt("username");
        let password = prompt("password");

        const res = await query('auth',{username: username, password: password});
        if(res.result == "success")
        {
            token = res.token;
            break;
        }
    }

    const views = [];
    const addMainView = async (el) => {
        el.style.display = "none";
        document.querySelector(`main`).appendChild(el);
    }

    const memes = await query('memes',{token: token});
    console.log(memes);

    let element = document.createElement("meme-viewer");
    element.Construct(memes.list);
    await addMainView(element);

    element = document.createElement("upload-meme");
    await addMainView(element);

    let el = await document.querySelector(`main`);
    console.log(el);
    el.children[0].style.display = "flex";


    let nav = await document.querySelector(`nav`);
    [...el.children].forEach(x => {
        let btn = document.createElement("button");
        btn.innerText = x.tagName;
        btn.onclick = async () => {
            [...el.children].forEach(x => { x.style.display = "none" });
            x.style.display = "flex";
        }
        nav.appendChild(btn);
    })
})();
//m13484_mbm
//#eX0Tqs*PG6$4vOd_h+V+r.7P05Hel
