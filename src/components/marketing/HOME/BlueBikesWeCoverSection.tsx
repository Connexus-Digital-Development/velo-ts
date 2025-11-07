import Carousel from "react-bootstrap/Carousel";
import RB from "@/assets/images/bikesWeCover/Road_bike@2x.png";
import SB from "@/assets/images/bikesWeCover/Sports_bike@2x.png";
import MB from "@/assets/images/bikesWeCover/Mountain_bike@2x.png";
import UB from "@/assets/images/bikesWeCover/Urban_bike@2x.png";
import LB from "@/assets/images/bikesWeCover/Leisure_bike@2x.png";
import EB from "@/assets/images/bikesWeCover/Electric_bike@2x.png";
import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const BlueBikesWeCoverSection = () => {
  const { search } = useLocation();
  const carouselSpeed = 300000;

  const slides = [
    {
      id: 1,
      bikeType: "Road bike",
      p1: "Road bikes are designed to help cyclists get the most out of the road, down to a specialist frame shape, width of tyres, and the weight of the components.",
      b1: "Insure your road bike and ensure you are covered for whatever comes at you.",
      img: RB,
    },
    {
      id: 2,
      bikeType: "Sports bike",
      p1: "Sports bikes are road bikes with a special design which maximises their aerodynamic properties.",
      b1: "Insure your sports bike and ensure you are covered for whatever comes at you.",
      img: SB,
    },
    {
      id: 3,
      bikeType: "Mountain bike",
      p1: "Designed to go on mountains or on off-road trails, which means they have knobbly tyres, and a frame geometry which makes them excel in seriously uneven terrain",
      b1: "Insure your mountain bike and ensure you are covered for whatever comes at you.",
      img: MB,
    },
    {
      id: 4,
      bikeType: "Urban bike",
      p1: "Urban bikes or commuter bikes are essentially a mixture between road bikes and mountain bikes. They give you the versatility to do a bit of everything.",
      b1: "Insure your urban bike and ensure you are covered for whatever comes at you.",
      img: UB,
    },
    {
      id: 5,
      bikeType: "Leisure bike",
      p1: "Leisure cycling is a wonderful way to spend time with loved ones, on a holiday, or even solo for when you just need to stretch the legs and clear the cob webs away",
      b1: "Insure your leisure bike and ensure you are covered for whatever comes at you.",
      img: LB,
    },
    {
      id: 6,
      bikeType: "Electric bike",
      p1: "They are not the cheapest route into cycling but electric bikes are a great option for commuters and casual riders.",
      b1: "Insure your electric bike and ensure you are covered for whatever comes at you.",
      img: EB,
    },
  ];
  return (
    <div className="container-fluid bg-lightblue">
      <div className="container text-center mt-5 mb-5">
        <div className="row">
          <div className="col-12 col-sm-6 offset-sm-3">
            <h3>
              Bikes <span className="blueFont ">we cover</span>.
            </h3>
          </div>
        </div>

        <Carousel className="mb-5">
          {slides.map((slide) => (
            <Carousel.Item interval={carouselSpeed} key={slide.id}>
              <div className="row">
                <div className="col-12 col-sm-7 col-md-3 offset-2 mt-3">
                  <img
                    className="d-block carousel-img"
                    src={slide.img}
                    alt="Image One"
                  />
                </div>

                <div className="col-12 col-md-5">
                  <h4 className="responsiveAlign pt-3">{slide.bikeType}</h4>
                  <p className="responsiveAlign">{slide.p1}</p>
                  <p className="blueFont responsiveAlign mb-5">{slide.b1}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <CTAButton
          align="left"
          colour="blue"
          CTAText="Get a quote"
          onClick={() => {
            sessionStorage.removeItem("context");
          }}
          Url={`/get-a-quote${search}`}
        />
      </div>
    </div>
  );
};

export default BlueBikesWeCoverSection;
