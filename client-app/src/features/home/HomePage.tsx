import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';


const HomePage = () => {

    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' style={{marginBottom: 12}}/>
                </Header>
                <Header as='h2' inverted content='Welcome To Reactivities'>
                </Header>
                {userStore.isLoggedIn ? 
                    <Button as={Link} to='/activities' size='huge' inverted>
                        Take me to Activities!
                    </Button>
                    :
                    <>
                        <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>
                    </>
                }
            </Container>
        </Segment>
        );
};

export default HomePage;