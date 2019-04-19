const fetch = require('node-fetch');
const fs = require('fs');


const getPodcasts = (token, offset, show) => {

    const link = `https://api.spotify.com/v1/shows/${show}/episodes?offset=${offset}&limit=50`;

    const headers = {
        'Accept': 'application/json', 
        'Referer': `https://open.spotify.com/show/22Wgt4ASeaw8mmoqAWNUn1`, 
        'Origin': 'https://open.spotify.com', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36', 
        'Accept-Language': 'en', 
        'Authorization': `Bearer ${token}`
    }

    return fetch(link, {
        method: 'GET',
        headers
    })
    .then(res => res.json())
    .then(res => res.items);
}


(async () => {

    const show = '6WRTzGhq3uFxMrxHrHh1lo';

    let podcasts = [];

    let offset = 0;
    let doReq = true;
    while(doReq) {
        let content = await getPodcasts('BQDHz_so5OU9lB8OOsf7halLce8a-IIW97kfxUfZ84kOsch_bYQQtIOa283mFJ3C4hNys_JlVf6qCzhvHaw', offset, show);
        podcasts = podcasts.concat(content);

        console.log(offset, content.length);

        offset += 50;
        doReq = content.length == 50;
    }

    console.log(podcasts.length);

    fs.writeFileSync(`./${show}.json`, JSON.stringify(podcasts, null, 2), 'utf8');

})();
