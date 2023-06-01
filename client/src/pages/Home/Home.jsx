import React from 'react'
import { Link } from 'react-router-dom'
import {useSpring, useTrail, animated} from 'react-spring'
import './home.css'

const Home = () => {
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

    const features = [
        { text: 'Effortlessly create, edit, and delete todos', color: '#FF5733' },
        { text: 'Set due dates and prioritize your tasks', color: '#FFC300' },
        { text: 'View detailed information about each todo', color: '#C70039' },
        { text: 'Stay organized and track your progress', color: '#900C3F' }
    ];
    const benefits = [
        { text: 'Enhanced productivity and task management', color: '#39A2DB' },
        { text: 'Improved organization and efficiency', color: '#06D6A0' },
        { text: 'Increased focus and goal accomplishment', color: '#FF3366' }
    ];

    const featureTrail = useTrail(features.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        delay: 400,
      });
      const benefitsTrail = useTrail(benefits.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        delay: 800,
      });
      const buttonProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1600,
      });

  return (
    <animated.div style={springProps} className="home-container">
        <div className="content mb-5 mt-5">
            <h1 className="heading">
            Welcome to the MERN Todo Web App
            </h1>
            <p className="subheading">
                The MERN Todo Web App is a powerful and intuitive platform that helps you manage your todos or tasks with ease.
            </p>
            <div className="features">
                <h2 className="feature-heading">Key Features:</h2>
                <ul className="feature-list">
                    {featureTrail.map((props, index) => (
                        <animated.li key={index} style={props} className='feature-style'>
                            <span className="feature-text" style={{ color: features[index].color}}>{features[index].text}</span>
                        </animated.li>
                    ))}
                </ul>
            </div>
            <div className="benefits">
                <h2 className="benefits-heading">Benefits:</h2>
                <ul className="benefits-list">
                    {benefitsTrail.map((props, index) => (
                        <animated.li key={index} style={props}>
                            <span className="benefit-text" style={{ color: benefits[index].color }}>{benefits[index].text}</span>
                        </animated.li>
                    ))}
                </ul>
            </div>
            <animated.div className="cta-buttons" style={buttonProps}>
                <Link to="/register" className="cta-button">Sign Up</Link>
                <span className="cta-separator"> or </span>
                <Link to="/login" className="cta-button">Log In</Link>
            </animated.div>
        </div>
    </animated.div>
  )
}

export default Home