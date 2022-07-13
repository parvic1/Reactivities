import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import moment from "moment-timezone"

interface Props {
    activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src='/assets/user.png' alt='user' />
                            <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                                <Item.Description>
                                    Hosted by Bob
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='calendar' />{moment(activity.date).tz('America/Chicago').format("MM/DD/yyyy hh:mm a")}
                        <Icon name='marker' />{activity.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    Attendees here
                </Segment>
                <Segment clearing>
                    <span>{activity.description}</span>
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='teal' />
                </Segment>
            </Segment.Group>
        </>
    );
};

export default ActivityListItem;