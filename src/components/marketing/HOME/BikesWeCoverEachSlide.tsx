import Carousel from "react-bootstrap/Carousel";

const BikesWeCoverEachSlide = ({ img }: { img: string }) => {
  return (
    <Carousel.Item interval={1500}>
      <Carousel.Caption>
        <h3>Label for first slide</h3>
        <p className="blueFont">Sample Text for Image One</p>
      </Carousel.Caption>
      <img className="d-block w-100" src={img} alt="Image One" />
    </Carousel.Item>
  );
};

export default BikesWeCoverEachSlide;
