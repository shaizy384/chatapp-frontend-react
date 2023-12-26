import axios from "axios";

export const callApi = async (url, requestType, body, auth) => {
    let host = "http://localhost:2801/api/";
    let token = localStorage.getItem("authToken");

    if (requestType === "GET") {
        try {
            if (auth) {
                const data = await axios.get(host + url, {
                    headers: { "x-auth-token": token },
                });
                return data;
            }
            const data = await axios.get(host + url);
            return data;
        } catch (err) {
            return console.error(err);
        }
    } else if (requestType === "POST") {
        if (auth) {
            try {
                const data = await axios.post(host + url, body, {
                    headers: { "x-auth-token": token },
                });
                return data;
            } catch (error) {
                if (error.response) {
                    return error.response;
                }
            }
        } else {
            try {
                const data = await axios.post(host + url, body);
                return data;
            } catch (error) {
                if (error.response) {
                    return error.response;
                }
            }
        }
    } else if (requestType === "DELETE") {
        try {
            const data = await axios.delete(host + url, {
                headers: { "x-auth-token": token },
            });
            return data;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    }
};