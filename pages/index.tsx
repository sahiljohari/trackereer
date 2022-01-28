import type { NextPage } from "next";
import HeaderBar from "components/HeaderBar";

const Home: NextPage = () => {
  return (
    <div className="max-w-6xl mx-auto my-0">
      <HeaderBar name="Sahil" />
    </div>
  );
};

export default Home;
