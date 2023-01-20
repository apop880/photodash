type AlbumRequestBody = {
    pageSize: string,
    albumId: string,
    pageToken?: string
}

let nextPageToken: null | string = null;
let w: null | number = null;
let h: null | number = null;

export const getGoogleImages = async (id: string) => {
    if (!w) {
        w = window.screen.width;
        h = window.screen.height;
    }
    const text = await fetch("/api/googleAccessToken");
    const accessToken = await text.text();
    const body: AlbumRequestBody = {
        "pageSize": "50",
        "albumId": id
    }
    if (nextPageToken) {
        body.pageToken = nextPageToken;
    }
    const res = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        });
    const data = await res.json();
    nextPageToken = data.nextPageToken ?? null;
    const images = data.mediaItems.map((item: any) => `${item.baseUrl}=w${w}-h${h}`)
    return images;
}

export const getAlbums = async (fetch: Function) => {
    const text = await fetch("/api/googleAccessToken");
    const accessToken = await text.text();
    let albums: Array<Object> = [];
    let nextPageToken: null | string = null;
    do {
        const res = await fetch(`https://photoslibrary.googleapis.com/v1/albums?pageSize=50${nextPageToken ? `&nextPageToken=${nextPageToken}` : ''}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data: {albums: Array<Object>, nextPageToken?: string} = await res.json();
        albums = [...albums, ...data.albums];
        nextPageToken = data.nextPageToken ?? null
    } while(nextPageToken)
    return albums;
}