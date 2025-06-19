import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingScreen from "../../components/UI/LoadingScreen";
import GlobalChat from "../../components/Discussion/GlobalChat";
import HeroDiscussion from "../../components/Discussion/HeroDiscussion";
import GuidelinesSection from "../../components/Discussion/GuidelinesSection";
import TopicsSection from "../../components/Discussion/TopicsSection";
import ForumFeatureSection from "../../components/Discussion/ForumFeatureSection";

const Discussion = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <LoadingScreen />;
  return (
    <div className="w-full">
      <HeroDiscussion />
      <GuidelinesSection />
      <TopicsSection />
      <GlobalChat currentUser={user} />
      <ForumFeatureSection />
    </div>
  );
};

export default Discussion;
