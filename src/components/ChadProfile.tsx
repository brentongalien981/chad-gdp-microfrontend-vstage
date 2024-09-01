import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { resetEverythingAction, setHasSeenTheGuy } from '../redux/chatSlice';
import './ChadProfile.scss';
import TheModal from './TheModal';
import { CHAD_PROFILE_ATTRIBS } from '../data/data';
import { IChadAttributeMetaData } from '../data/types';
import My from '../utils/My';
import { Link } from 'react-router-dom';


const ChadProfile: React.FC = () => {

  const dispatch = useDispatch();

  // Use localStorage to retrieve chad's profile.    
  const chadProfileObj = JSON.parse(localStorage.getItem('chadProfile') || '{}');

  // Set the profile state.
  const [chadProfile, setChadProfile] = useState(chadProfileObj);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  // Fetch the generated image of the guy.
  useEffect(() => {

    // Add guards.
    // If the image url is already set, don't generate image again.
    if (!chadProfile?.age || chadProfile.imageUrl) {
      return;
    }

    setIsGeneratingImage(true);


    async function fetchChadProfile(): Promise<void> {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/generate_image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chadProfile }),
      });

      const data = await response.json();

      if (response.ok) {

        // Set the state.
        const updatedChadProfile = {
          ...chadProfile,
          imageUrl: data.image_url
        };

        // Increment the number of finished chat sessions.
        const numChatSessions = parseInt(localStorage.getItem('numChatSessions') || "0");
        localStorage.setItem('numChatSessions', (numChatSessions + 1).toString());

        // Save the chadProfile to localStorage.
        localStorage.setItem('chadProfile', JSON.stringify(updatedChadProfile));

        // Set the time the user last generated a guy's image to now (in ).
        localStorage.setItem('lastGeneratedGuyTime', (new Date()).getTime().toString());

        setChadProfile(updatedChadProfile);

        // Set the hasSeenTheGuy to true.
        dispatch(setHasSeenTheGuy(true));
      } else {
        setErrorMsg('Oops, there was an error. Maybe restricted words were used. Please try again.');
        // Invoke the resetEverything action, but not the hook so it doesn't redirect to /chat right away.
        dispatch(resetEverythingAction());
      }

      setIsGeneratingImage(false);
    }

    fetchChadProfile();
  }, []);


  // Show my guy's profile attribs.
  const chadProfileItems = [];
  if (chadProfile) {

    for (let key in CHAD_PROFILE_ATTRIBS) {
      if (chadProfile[key]) {
        const attributeMetaData: IChadAttributeMetaData = CHAD_PROFILE_ATTRIBS[key as keyof typeof CHAD_PROFILE_ATTRIBS];

        let attribVal = chadProfile[key];

        if (key === 'yearly_income') {
          attribVal = `$${My.formatToMonetary(attribVal)} USD`;
        }
        chadProfileItems.push(<li key={key}><span style={{ fontWeight: "600" }}>{attributeMetaData.displayName}</span>: {attribVal}</li>);

      }
    }
  }


  // Set loader component.
  let loaderComponent = null;
  if (isGeneratingImage) {
    loaderComponent = (
      <div>
        <h3>Generating My Guy's Image...</h3>
        <Spinner animation="border" />
      </div>
    );
  }


  // Set the error component.
  let errorComponent = null;
  if (errorMsg.length > 0) {
    errorComponent = (<TheModal msg={errorMsg} />);
  }


  // Set the image component.
  let imageComponent = null;
  if (!chadProfile?.imageUrl && !isGeneratingImage) {
    imageComponent = (<p>No profile image available... Please generate a guy.</p>);
  }
  if (chadProfile.imageUrl) {
    imageComponent = (
      <div className="d-flex justify-content-center image-container">
        <Image className="profile-image" src={chadProfile.imageUrl} alt="Image expired. Generate another guy." fluid />
      </div>
    );
  }


  // Try again button component.
  const tryAgainButton = (
    <div className='d-flex justify-content-center'>
      {!isGeneratingImage && <Link to="/chat" className='btn btn-primary'>Generate Another Guy</Link>}
    </div>
  );




  // Set to 2-column layout.
  return (
    <div>
      {loaderComponent}
      <Row className='mb-4'>
        <Col md={6} className='mb-4'>{imageComponent}</Col>
        <Col md={6}>
          <ul className='profile-attribs'>
            {chadProfileItems}
          </ul>
        </Col>
      </Row>
      {errorComponent}

      {tryAgainButton}
    </div>
  );
};

export default ChadProfile;