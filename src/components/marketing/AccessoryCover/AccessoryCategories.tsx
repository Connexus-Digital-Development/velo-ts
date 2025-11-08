import { Accordion } from "@mantine/core";

const AccessoryCategories = () => {
  return (
    <div className="container mt-5 mb-5">
      <Accordion id="AccessoriesAccordion" variant="separated" radius="lg">
        <Accordion.Item value="Electronic">
          <Accordion.Control>
            <h4>Electronic</h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="row bg-white lightgreyFont mt-3">
              <div className="col-6">
                <p className="bulletPoint">GPS</p>
                <p className="bulletPoint">Cameras</p>
                <p className="bulletPoint">Cycle Computers</p>
                <p className="bulletPoint">Heartrate monitors</p>
              </div>
              <div className="col-6">
                <p className="bulletPoint">Lights</p>
                <p className="bulletPoint">Headphones</p>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Storage">
          <Accordion.Control>
            <h4>Storage</h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="row lightgreyFont mt-3">
              <div className="col-6">
                <p className="bulletPoint">Panniers</p>
                <p className="bulletPoint">Pannier racks</p>
                <p className="bulletPoint">Saddle bags</p>
              </div>
              <div className="col-6">
                <p className="bulletPoint">Handlebar bags</p>
                <p className="bulletPoint">Frame bags</p>
                <p className="bulletPoint">Baskets</p>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Clothing &amp; headgear">
          <Accordion.Control>
            <h4>Clothing &amp; headgear</h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="row lightgreyFont mt-3">
              <div className="col-sm-4 col-6">
                <p className="bulletPoint">Cycling shorts</p>
                <p className="bulletPoint">Tights</p>
                <p className="bulletPoint">Wetsuits</p>
                <p className="bulletPoint">Cycling trousers</p>
                <p className="bulletPoint">Gloves</p>
                <p className="bulletPoint">Gilets</p>
              </div>
              <div className="col-sm-4 col-6">
                <p className="bulletPoint">Jerseys</p>
                <p className="bulletPoint">Cycling caps</p>
                <p className="bulletPoint">Helmets</p>
                <p className="bulletPoint">Cycling shoes</p>
                <p className="bulletPoint">Oveshoes</p>
                <p className="bulletPoint">Socks</p>
              </div>
              <div className="col-sm-4 col-6 ">
                <p className="bulletPoint">Hydration packs</p>
                <p className="bulletPoint">Rucksacks</p>
                <p className="bulletPoint">Arm, leg and knee warmers</p>
                <p className="bulletPoint">Jackets</p>
                <p className="bulletPoint">Knee &amp; elbow pads</p>
                <p className="bulletPoint">Masks</p>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Other">
          <Accordion.Control>
            <h4>Other</h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="row lightgreyFont">
              <div className="col-6 mt-3">
                <p className="bulletPoint">Locks</p>
                <p className="bulletPoint">Tools</p>
                <p className="bulletPoint">Mirrors</p>
                <p className="bulletPoint">Bells &amp; Horns</p>
                <p className="bulletPoint">Pumps</p>
                <p className="bulletPoint">Child seats</p>
              </div>
              <div className="col-6 mt-3">
                <p className="bulletPoint">Child trailers</p>
                <p className="bulletPoint">Bottles</p>
                <p className="bulletPoint">Bottle cages</p>
                <p className="bulletPoint">Equipment pouches</p>
                <p className="bulletPoint">Mud guards</p>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Bike boxes">
          <Accordion.Control>
            <h4>Bike boxes </h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="col-12 lightgreyFont mt-4">
              <p>
                A bike box includes any luggage that is specifically designed
                for the carriage and protection of cycles. This includes rigid
                or semi-rigid bike boxes.
              </p>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccessoryCategories;
