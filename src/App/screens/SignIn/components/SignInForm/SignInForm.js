import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Text,
    TextField,
    TextLink,
    Button,
    ErrorIcon
} from 'seek-style-guide/react';

const fieldRenderer = ({input, type, ...restProps}) => {
    const inputProps = {
        ...input,
        type: type
    };
    return (
        <TextField inputProps={inputProps} {...restProps} />
    );
}

const SignInForm = ({ error, handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field id="username" name="username" label="Username" type="text" component={fieldRenderer} />
            <Field id="password" name="password" label="Password" type="password" component={fieldRenderer} />
            <Text><TextLink href="/ForgotPassword">Forgot your password?</TextLink></Text>
            {error && <Text critical role="alert">
                <ErrorIcon /> {error}
            </Text>}
            <Button type="submit" loading={submitting} color="pink">Sign In</Button>
        </form>
    );
};

export default reduxForm({ form: 'signInForm' })(SignInForm);
