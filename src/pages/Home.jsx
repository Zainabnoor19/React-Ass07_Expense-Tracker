import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* About Section with integrated form */}
      <About />
      
      <Footer />
    </div>
  );
};

export default Home;