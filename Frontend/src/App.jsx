/** @format */

import "./App.css";
import {
  FaUserSecret,
  FaCommentAlt,
  FaStar,
  FaChartBar,
  FaLock,
  FaGlobe,
} from "react-icons/fa";
import Nav from "./components/Navbar/Nav.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Footer from "./components/Fotter/Fotter.jsx";
import Explore from "./components/Hero/Explore.jsx";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
];

const HERO_CONTENT = {
  badge: "Introducing WisperHub",
  title: "A truly anonymous social platform where",
  highlight: "privacy",
  subtitle: "is never compromised.",
  description:
    "WisperHub is a modern social networking platform built for open expression without identity pressure. Share thoughts, connect with others, and engage in meaningful conversations — all while staying completely anonymous.",
  primaryCta: "Start Anonymously",
  secondaryCta: "How It Works",
};

const featuresData = [
  {
    icon: <FaUserSecret className="text-emerald-400" />,
    title: "Anonymous Posting",
    description: "Share your thoughts without revealing your identity.",
  },
  {
    icon: <FaCommentAlt className="text-emerald-400" />,
    title: "Comment & Interact",
    description: "Engage with posts while keeping your privacy intact.",
  },
  {
    icon: <FaStar className="text-emerald-400" />,
    title: "Like & Follow",
    description: "Support and follow other anonymous users easily.",
  },
  {
    icon: <FaChartBar className="text-emerald-400" />,
    title: "Analytics",
    description: "Track your post interactions anonymously.",
  },
  {
    icon: <FaLock className="text-emerald-400" />,
    title: "Privacy First",
    description: "We never store personal data, ensuring complete anonymity.",
  },
  {
    icon: <FaGlobe className="text-emerald-400" />,
    title: "Cross-Platform",
    description: "Access WisperHub from web or mobile seamlessly.",
  },
];

function App() {
  return (
    <div className='min-h-screen bg-black text-neutral-100'>
      {/* Global Navigation */}
      <Nav logo='/logo.svg' title='WisperHub' navdata={NAV_ITEMS} />

      {/* Main Content */}
      <main>
        <Hero {...HERO_CONTENT} />
        <Explore features={featuresData} />;
      </main>
      <Footer />
    </div>
  );
}

export default App;
