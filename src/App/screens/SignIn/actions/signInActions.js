import { SubmissionError } from 'redux-form'
import authenticate from '../../../../fakeAPI/authentication';

export const AUTHENTICATE_ADVERTISER = 'AUTHENTICATE_ADVERTISER';

export const signIn = (values, history, dispatch) => {
    const authenticateSuccess = (advertiser) => {
        dispatch({ type: AUTHENTICATE_ADVERTISER, payload: { username: values.username, ...advertiser}});
        history.push(`/adPacks`);
    };

    const authenticationError = () => {
        throw new SubmissionError({ _error: `We can't log you in with that combination.  Check your username and password!` });
    };

    if (values.username && values.password) {
        return authenticate(values.username, values.password)
        .then(authenticateSuccess)
        .catch(authenticationError)
    } else {
        authenticationError();
    }
};