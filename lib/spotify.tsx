import axios from 'axios';
import { Buffer } from "buffer";
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

const putSpotifyData = async (endpoint: string, refresh_token: string) => {
    const { access_token } = await getAccessToken(refresh_token);

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

const SpotifyActions = {
    pause: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/pause';
        const refreshToken = token;
        const response = await putSpotifyData(ENDPOINT, refreshToken);
        return response;
    },
    play: async (token: string) => {
        const ENDPOINT = 'https://api.spotify.com/v1/me/player/play';
        const refreshToken = token;
        const response = await putSpotifyData(ENDPOINT, refreshToken);
        return response;
    }
};

export default SpotifyActions; 
