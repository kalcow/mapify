import axios from 'axios';
import { Buffer } from 'buffer';
import { client_id as id, client_secret as secret } from './spotify-keys';

const client_id = id;
const client_secret = secret;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getAccessToken = async (refresh_token: string) => {
    const data = {
        grant_type: 'refresh_token',
        refresh_token,
    };

    const response = await axios.post(TOKEN_ENDPOINT, data, {
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};

const putSpotifyData = async (endpoint: string, access_token: string) => {
    // const { access_token } = await getAccessToken(refresh_token);

    const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response;
};

const postSpotifyData = async (endpoint: string, access_token: string) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response;
};

const SpotifyActions = {
    pause: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/pause';
        const accessToken = token;
        const response = await putSpotifyData(ENDPOINT, accessToken);
        return response;
    },
    play: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/play';
        const accessToken = token;
        const response = await putSpotifyData(ENDPOINT, accessToken);
        return response;
    },
    playSong: async (token: string, uri: string) => {
        const ENDPOINT = `https://api.spotify.com/v1/me/player/play`;
        const data = { context_uri: uri };
        const r = await fetch(ENDPOINT, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return r;
    },

    getAlbumSongs: async (token: string, album_id: string) => {
        //console.log(token);
        const idlink = JSON.stringify(album_id.URI).replace(/['"]+/g, '');

        const ENDPOINT = `https://api.spotify.com/v1/albums/${idlink}/tracks`;

        var data;
        fetch(ENDPOINT, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('DATA: ', data);
                return data;
            })
            .catch((error) => {
                return error;
            });
    },

    skipForward: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/next';
        const accessToken = token;
        const response = await postSpotifyData(ENDPOINT, accessToken);
        return response;
    },
    skipBack: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/previous';
        const accessToken = token;
        const response = await postSpotifyData(ENDPOINT, accessToken);
        return response;
    },
    seek: async (token: string, position_ms: number) => {
        const ENDPOINT = `https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}`;
        const accessToken = token;
        const response = await putSpotifyData(ENDPOINT, accessToken);
        return response;
    },
};

export default SpotifyActions;
export { getAccessToken };
