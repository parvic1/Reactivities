import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


const ActivityList = (): JSX.Element => {

    const { activityStore } = useStore();
    const { selectActivity, deleteActivity, activitiesByDate, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided={true}>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} disabled={loading} />
                                <Button
                                    name={activity.id}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    onClick={(e) => handleActivityDelete(e,activity.id)}
                                    loading={loading && activity.id === target}
                                    disabled={loading} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )
                }
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);