import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

const ActivityForm = () => {

    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState<Activity>(initialState);

    const handleSubmit = () => {
        console.log(activity);
        activity.id ? updateActivity(activity) : createActivity(activity);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setActivity((p) => { return { ...p, [name]: value } });

    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} disabled={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' disabled={loading} />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);