import { SubmissionError } from 'redux-form'
import authenticate from '../../../../fakeAPI/authentication';

export const signIn = (values, history) => {
    const authenticateSuccess = (advertiser) => {
        //do something reduxy with the advertiser
        //redirect to /adPacks

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
}