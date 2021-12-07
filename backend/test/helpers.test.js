import axios from 'axios';

const PORT = 9001;

export const create_user = async body => {
    const user = await axios.post(`http://localhost:${PORT}/user/signup`, body);
    const json = user.data;
    return {
        status: user.status,
        json: json
    };
}