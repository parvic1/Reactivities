import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';


const ActivityDetails = () => {

    const { activityStore } = useStore();
    const { openForm, cancelSelectedActivity, selectedActivity: activity } = activityStore;

    if (!activity)
        return <LoadingComponents />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)} />
                    <Button basic color='grey' content='Cancel' onClick={() => cancelSelectedActivity()} />
                </Button.Group>
            </Card.Content>
        </Card>);
};

export default ActivityDetails;