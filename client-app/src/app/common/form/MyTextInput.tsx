import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute
};

//!! is not an operator. It's just the ! operator twice. It converts a non-boolean to an inverted boolean
// (for instance, !9 would be false since 9 is a non - false value in JS), then boolean - inverts that so you
// get the original value as a boolean(so!!9 would be true)

const MyTextInput = (props: Props) => {
    const [field, meta] = useField(props.name);

    return <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? <Label basic color='red'>{meta.error}</Label> : null}
    </Form.Field>;

};

export default MyTextInput;