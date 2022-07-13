import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import moment from 'moment-timezone';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
};

//!! is not an operator. It's just the ! operator twice. It converts a non-boolean to an inverted boolean
// (for instance, !9 would be false since 9 is a non - false value in JS), then boolean - inverts that so you
// get the original value as a boolean(so!!9 would be true)

const MyDateTimeInput = (props: Props) => {
    const [field, meta] = useField<string>(props.name);

    if (field.value && field.value.includes("T")) {
        console.log(field.value);

        field.value = moment(field.value).tz('America/Chicago').format("yyyy-MM-DDTHH:mm");
    }

    return <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <input type="datetime-local" {...field} {...props} />
        {meta.touched && meta.error ? <Label basic color='red'>{meta.error}</Label> : null}
    </Form.Field>;

};

export default MyDateTimeInput;