import style from "./Home.module.css";
import ClientComments from "../ClientComments/ClientComments";
import { NavLink } from "react-router-dom";
import { SimpleSlider } from "../Swiper/Swiper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";
import loader from "../../assets/loaderGif.gif";
import { Chatbot } from "../Chatbot/Chatbot";
import { SiChatbot } from "react-icons/si";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());

    Promise.all([dispatch(getAllProducts())])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  // react-chatbot-kit
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <>
      {loading === true ? (
        <div className={style.prodsContLoader}>
          <img src={loader} alt="Loader"></img>
        </div>
      ) : (
        <>
          <main className={style.parent}>
            <section className={style.div1}>
              <h1>
                GreenLand <hr />
              </h1>
              <div>
                <p>
                  Discover Our Eco-Friendly Collection Offering a Diverse Range
                  of Products, Accessories, and Sustainable Alternatives for
                  Every Need and Occasion. Join the Movement Toward
                  Sustainability with Our Diverse Selection of Eco-Friendly
                  Products, Curated for Eco Warriors Like You. From Zero-Waste
                  Essentials to Biodegradable Delights, Our Eco-Conscious Lineup
                  is Designed to Uplift Your Lifestyle and the Planet.
                </p>
              </div>
              {!auth && (
                <NavLink to="/login" className={style.buttonLink}>
                  LOG IN
                </NavLink>
              )}
            </section>
            <section className={style.div2}>
              <SimpleSlider />
            </section>
          </main>
          <ClientComments />
          <div className={style.chatContainer}>
            <div
              className={chatbotVisible ? style.fade_chat : style.fadeOut_chat}
            >
              {chatbotVisible && <Chatbot />}
            </div>
            <div className={style.iconContainer}>
              <SiChatbot className={style.icon} onClick={toggleChatbot} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
