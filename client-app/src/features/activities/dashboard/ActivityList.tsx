import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


const ActivityList = (): JSX.Element => {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;


    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map(activity => <ActivityListItem activity={activity} key={activity.id} />)}
                </Fragment>
            ))}
        </>

    );
};

export default observer(ActivityList);