import React from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4">Welcome to ChadGDP</h2>

      <div className='home-messages-container'>
        <p className='message assistant'>
          🎉 Whether you're a lady dreaming of a dashing boyfriend or a guy imagining your future self, this game is all about letting loose and having a laugh! 😄💭
          Get ready to unleash your imagination and crank up the fun as we dive into the outrageous quest of creating your absolute ideal guy.
        </p>

        <p className='message user'>
          But hey, keep in mind that sometimes the cosmos of AI can throw some wacky texts or even photos that might not float your boat.
          It's all in the name of fun, so don your fanciest thinking cap and enjoy the ride! 🚀✨
        </p>

        <p className='message assistant'>
          So, are you ready to see the Renaissance painting image of this guy 👇?
        </p>
      </div>

      <div className='d-flex justify-content-center'>
        <Link to="/chat" className='btn btn-success'>Let's Go!</Link>
      </div>

    </div>
  );
};

export default HomePage;