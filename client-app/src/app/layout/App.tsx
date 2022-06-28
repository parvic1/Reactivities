import React, { useEffect, useState } from 'react';
import { Container } from "semantic-ui-react"
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App(): JSX.Element {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        agent.Activities.list().then(response => {

            let activities: Activity[] = [];
            response.forEach(a => {
                a.date = a.date.split('T')[0];
                activities.push(a);
            });

            setActivities(activities);
            setLoading(false);
        });

    }, []);


    const handleSelectActivity = (id: string): void => {
        setSelectedActivity(activities.find(x => x.id === id));
    };

    const handleCancelSelectActivity = (): void => {
        setSelectedActivity(undefined);
    };

    const handleFormOpen = (id?: string):void => {

        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    };

    const handleFormClose = () => {
        setEditMode(false);
    };

    const handleCreateOrEditActivity = (activity: Activity): void => {

        setSubmitting(true);

        if (activity.id) {
            agent.Activities.update(activity.id, activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setEditMode(false);
                setSelectedActivity(activity);
                setSubmitting(false);
            });
        }
        else {
            activity.id = uuid();

            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setEditMode(false);
                setSelectedActivity(activity);
                setSubmitting(false);
            });
            
        }

    };

    const handleDeleteActivity = (id: string): void => {
        setSubmitting(true);

        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
        
    };

    if (loading)
        return <LoadingComponents content='loading app' />

    return (
        <>
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </>
    );
}

export default App;

