import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import moment from "moment-timezone"
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {

    return (
        <>
            <Segment.Group>
                <Segment>
                    {activity.isCancelled &&
                        <Label attached='top' color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                    }
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src={activity.host?.image || '/assets/user.png'} alt='user' />
                            <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                                <Item.Description>
                                    Hosted by <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link>
                                </Item.Description>
                                {activity.isHost && (
                                    <Item.Description>
                                        <Label basic color='orange'>
                                            You are hosting this activity
                                        </Label>
                                    </Item.Description>
                                    )
                                }
                                {activity.isGoing && (
                                    <Item.Description>
                                        <Label basic color='green'>
                                            You are going
                                        </Label>
                                    </Item.Description>
                                )
                                }
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
                    <ActivityListItemAttendee attendees={activity.attendees ?? []} />
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