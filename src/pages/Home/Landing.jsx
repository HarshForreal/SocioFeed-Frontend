import Navbar from "../../components/Navbar/Navbar";
import UsernameInput from "../../components/UserNameInput/UserNameInput";
const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1
            className="hero-heading"
            style={{ fontSize: "48px", lineHeight: "58px" }}
          >
            <span>The Professional Network</span>
            <br />
            <span>for builders to show & tell!</span>
          </h1>

          <p className="font-instrument font-normal mt-6 text-gray-600">
            Showcase your work, launch projects, find jobs, and <br />
            connect with the most
            <span className="font-medium">(in)credible</span> people.
          </p>

          <UsernameInput />
        </div>
      </main>
    </div>
  );
};

export default Index;
