import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import UserPostsList from './UserPostsList';

const ProfileTabs = () => {

    const [key, setKey] = useState('home');

    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab  eventKey="home" title="Home">
               <UserPostsList/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <p>
                 Distill'd from limbecks foul as hell within, Applying fears to hopes, and hopes to fears, Still losing when I saw myself to win! What wretched errors hath my heart committed, Whilst it hath thought itself so blessed never! How have mine eyes out of their spheres been fitted, In the distraction of this madding fever! O benefit of ill! now I find true That better is, by evil still made better;
                </p>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            <p>
                 Applying fears to hopes, and hopes to fears, Still losing when I saw myself to win! What wretched errors hath my heart committed, Whilst it hath thought itself so blessed never! How have mine eyes out of their spheres been fitted, In the distraction of this madding fever! O benefit of ill! now I find true That better is, by evil still made better;
                </p>
            </Tab>
        </Tabs>
    );
}

export default ProfileTabs
