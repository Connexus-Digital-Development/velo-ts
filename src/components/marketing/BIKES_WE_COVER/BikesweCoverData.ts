import EBike from "@/assets/images/eBike.png";
import LeisureBike from "@/assets/images/leisureBike.png";
import MountainBike from "@/assets/images/mountainBike.png";
import RoadBike from "@/assets/images/roadBike.png";
import SportBike from "@/assets/images/sportBike.png";
import UrbanBike from "@/assets/images/urbanBike.png";

const BikesWeCoverData = () => {
  return [
    {
      id: 1,
      href: "electric",
      textAlign: "left",
      backgroundCol: "whiteBG",
      heading: "Electric bike",
      paragragh1:
        "They are not the cheapest route into cycling but electric bikes are a great option for commuters and casual riders. With their power assistance, they offer extended range and ease of use and make it easier for older riders or those with disabilities to access cycling.",
      paragragh2:
        "Our electric bike insurance protects that large investment that comes with owning an E-Bike. We cover not just your electric bike but you as a rider also. See how our E-Bike insurance compares to our competitors on our comparison chart.",
      paragragh3: "",
      imageURL: `${EBike}`,
    },
    {
      id: 2,
      href: "road",
      textAlign: "right",
      backgroundCol: "greyBG",
      heading: "Road bike",
      paragragh1:
        "Road bikes are designed to help cyclists get the most out of the road, down to a specialist frame shape, width of tyres, and the weight of the components.",
      paragragh2:
        "Investing in a top of the range road bike can cost a pretty penny, so it’s important your cycle insurance provides complete protection should the unexpected happen, not just for your bicycle but for you as a rider.",
      paragragh3: "",
      imageURL: `${RoadBike}`,
    },
    {
      id: 3,
      href: "mountain",
      textAlign: "left",
      backgroundCol: "whiteBG",
      heading: "Mountain bike",
      paragragh1:
        "Mountain bikes are designed to go on mountains or on off-road trails, which means they’re chunkier, have knobbly tyres, and a frame geometry which makes them better suited for seriously uneven terrain.",
      paragragh2:
        "Tracks, dirt and unpaved surfaces can be difficult to ride on at the best of times, which is why the correct mountain bike insurance is required. Should the worst happen, you don’t want to be out of pocket for anydamages to your bicycle or accessories.",
      paragragh3: "",
      imageURL: `${MountainBike}`,
    },
    {
      id: 4,
      href: "urban",
      textAlign: "right",
      backgroundCol: "greyBG",
      heading: "Urban bike",
      paragragh1:
        "Urban bikes or commuter bikes are essentially a mixture between road bikes and mountain bikes. They give you the versatility to do a bit of everything. What you sacrifice in terms of speciality, you gain by being able to do what you want, when you want.",
      paragragh2:
        "With the best of an on and off-road bike, you are at risk of a variety of dangers, some of which you will not anticipate. You will need the right cycle insurance to protect you from whatever cycling throws at you in any situation.",
      paragragh3: "",
      imageURL: `${UrbanBike}`,
    },
    {
      id: 5,
      href: "sport",
      textAlign: "left",
      backgroundCol: "whiteBG",
      heading: "Sport bike",
      paragragh1:
        "Sports bikes are road bikes with a special design that maximises their aerodynamic properties. The handlebars are also a special aerodynamic design that allows you to crouch forward while riding, to minimise the wind resistance and maximise your speed.",
      paragragh2:
        "With increased speed comes increased risk, this is why we offer sports cover as standard so you are covered for every situation, whether it is during an event or out on the open road. Check out what else is included in our policy here.",
      paragragh3: "",
      imageURL: `${SportBike}`,
    },
    {
      id: 6,
      href: "leisure",
      textAlign: "right",
      backgroundCol: "greyBG",
      heading: "Leisure bike",
      paragragh1:
        "Leisure bikes are designed to be efficient and comfortable for daily use, going to the shops or riding to work.",
      paragragh2:
        "Commuting on the roads can often be one of the most dangerous elements of cycling with risks from pedestrians, potholes and other road users. Ensure you and your bicycle are protected with effective bicycle insurance cover so you are never caught short.",
      paragragh3: "",
      imageURL: `${LeisureBike}`,
    },
  ];
};

export default BikesWeCoverData;
