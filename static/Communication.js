
const COMMUNICATION = {
    query: (url,data) => {},
    token: -1,
};


(()=>{
    let token = -1;
    const query = async (url,data) => {
        const raw = await fetch(`/v1/${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: COMMUNICATION.token, ...data})
        });
        return await raw.json();
    }

    COMMUNICATION.query = query;

})();