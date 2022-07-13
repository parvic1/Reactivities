import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    useEffect(() => {

        activityStore.loadActivities();

    }, [activityStore]);

    if (activityStore.loadingInitial)
        return <LoadingComponents content='loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>

        </Grid>
    );
});