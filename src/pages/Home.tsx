import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Header from "../components/Header";
import { User } from "../utils/interface";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Loader from "../components/Loader";
import CustomCursor from "../components/CustomCursor";

function Home() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = "65b3a22c01d900e96c4219ae"; //John doe

  const BASE_URL = "https://portfolio-backend-30mp.onrender.com/api/v1";

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.cookie = `portfolio-name=portfolio1`;
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get/user/${params?.user ?? userId}`
        );

        const userData = await response.json();

        document.title = `${
          userData?.user?.about?.name + " - " + userData?.user?.about?.title
        }`;
        setUser(userData?.user);
        document.body.classList.remove("loaded");
      } catch (error) {
        navigate("/");
        setIsLoading(true);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [params?.user, userId, navigate]);

  useEffect(() => {
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (!location.hash && location.pathname === "/") {
      scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const sortedFilteredSkills = user?.skills
    ?.filter((item) => item.enabled)
    ?.sort((a, b) => a.sequence - b.sequence);
  const sortedFilteredProject = user?.projects
    ?.filter((item) => item.enabled)
    ?.sort((a, b) => a.sequence - b.sequence);
  const filteredServices = user?.services?.filter((item) => item.enabled);
  const filteredTestimonials = user?.testimonials?.filter(
    (item) => item.enabled
  );
  const filteredSocialHandles = user?.social_handles?.filter(
    (item) => item.enabled
  );
  const filteredEducation = user?.timeline?.filter(
    (item) => item.forEducation && item.enabled
  );
  const filteredExperience = user?.timeline?.filter(
    (item) => !item.forEducation && item.enabled
  );

  if (isLoading) {
    return <Loader setHideLoader={setIsLoading} hideLoader={isLoading} />;
  }
  return (
    <>
      <CustomCursor />
      {user && (
        <>
          {filteredSocialHandles && <Header social={filteredSocialHandles} />}
          <Hero about={user?.about} />
          {filteredEducation && (
            <About about={user.about} timeline={filteredEducation} />
          )}
          {sortedFilteredSkills && <Skills skills={sortedFilteredSkills} />}
          {sortedFilteredProject && (
            <Projects projects={sortedFilteredProject} />
          )}
          {filteredServices && <Services services={filteredServices} />}
          {filteredExperience && <Timeline timeline={filteredExperience} />}
          {filteredTestimonials && (
            <Testimonials testimonials={filteredTestimonials} />
          )}
          {filteredSocialHandles && (
            <Contact
              about={user.about}
              social_handle={filteredSocialHandles}
              email={user.email}
            />
          )}
        </>
      )}
    </>
  );
}

export default Home;
