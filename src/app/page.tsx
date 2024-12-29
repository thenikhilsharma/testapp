// components/HomePage.js
import Link from 'next/link';
import './home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content">
        <h1>Welcome to Your Academic Tracker</h1>
        <p>Your one-stop platform for tracking and improving your academic performance.</p>
        <h2>Features:</h2>
        <ul>
          <li>Track your grades and performance</li>
          <li>View detailed reports on your academic progress</li>
          <li>Set academic goals and milestones</li>
          <li>Stay updated with class schedules and assignments</li>
        </ul>
        <div className="cta-buttons">
          <Link href="/signin">
            <p className="button">Sign In</p>
          </Link>
          <Link href="/signup">
            <p className="button">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;