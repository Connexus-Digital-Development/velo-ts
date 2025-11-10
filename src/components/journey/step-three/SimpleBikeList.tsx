import { type Bike } from "@/models/JourneyTypes";

interface SimpleBikeListProps {
  bikes: Bike[];
}

const SimpleBikeList: React.FC<SimpleBikeListProps> = ({ bikes }) => {
  if (!bikes) return "no Bikes";

  return bikes.map((bike) => (
    <div className="row" key={bike.id}>
      <div className="col-6 lufga-regular">
        <p className="lufga-regular font-17">
          {bike.make} {bike.model}
        </p>
      </div>

      <div className="col-6">
        <p className="lufga-regular font-17">£{bike.value}</p>
      </div>
    </div>
  ));
};
export default SimpleBikeList;
