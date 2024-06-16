import About from "./about";
import Contact from "./contact";
import Skills from "./skills";
import Footer from "./footer";
import TopNav from "./topnav";
import Projects from "./projects";

const Home = () => {
  return (
    <div>
      <TopNav />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
