//We're being even cuter with payment.  People like to think their CCs are being handled seriously!
const latency = 2000;

const payment = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Sure, whatever');
        }, latency);
    });
};

export default payment;