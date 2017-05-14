import advertisers from './data/advertisers';

const latency = 1000;

//The only point of importance here for the code test is that the API is the source of truth about advertisers
const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = advertisers[username.toLowerCase()];

            if (user && password) {
                resolve(user);
            } else {
                reject();
            }
        }, latency);
    });
};

export default authenticate