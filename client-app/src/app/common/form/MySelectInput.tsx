import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    options: any;
};

//!! is not an operator. It's just the ! operator twice. It converts a non-boolean to an inverted boolean
// (for instance, !9 would be false since 9 is a non - false value in JS), then boolean - inverts that so you
// get the original value as a boolean(so!!9 would be true)

const MySelectInput = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    return <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(e, d) => helpers.setValue(d.value)}
            onBlur={() => helpers.setTouched(true)}
            placeholder={props.placeholder}
        >
        </Select>
        {meta.touched && meta.error ? <Label basic color='red'>{meta.error}</Label> : null}
    </Form.Field>;

};

export default MySelectInput;