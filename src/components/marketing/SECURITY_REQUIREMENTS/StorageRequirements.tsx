const StorageRequirements = () => {
  return (
    <div className="container-fluid whiteBG ">
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <h3>
              What are the bike{' '}
              <span className="blueFont">
                storage <br />
                requirements?
              </span>
            </h3>
            <p>
              When your cycle is not in use, you need to ensure your bike is
              stored correctly using an approved bike lock.
            </p>
            <p className="blueFont">
              You should meet at least one of the below security requirements at
              all times depending on the insured location of your cycle(s):
            </p>
            <p className="bulletPoint">
              If your cycle is kept inside your property or its private integral
              garage please ensure all security devices are in operation (i.e.
              all external doors and accessible windows must be locked)
            </p>
            <p className="bulletPoint">
              If you are keeping your cycle in an attached garage (no
              interconnecting door into your property), detached garage, wooden
              or metal shed then all external doors must be secured by a minimum
              of one of these bike locks:
            </p>
            <p>
              <span className="blueFont pl-3">- </span>5 lever mortice deadlock
            </p>
            <p>
              <span className="blueFont pl-3">- </span>5 lever padlock
            </p>
            <p>
              <span className="blueFont pl-3">- </span>A CEN grade 3, 4, 5 or 6
              rated padlock
            </p>

            <p>
              Alternatively, please ensure the cycle is secured through the
              frame by an approved{' '}
              <a href="https://www.soldsecure.com">Sold Secure </a>lock to an
              immovable object within the building. If your cycle is stored in a
              communal hallway or communal outbuilding, please ensure the cycle
              is secured through the frame by an approved bike lock to an
              immovable object within the building.
            </p>

            <p>
              When it comes to the type of lock you use to secure your cycle,
              unless we confirm otherwise in writing, we require you to have a
              <a href="https://www.soldsecure.com"> Sold Secure </a> rated lock
              and require you to secure all cycles through the frame to an
              immovable object.
            </p>
          </div>
        </div>
        <div className="row mt-sm-5 ">
          <div className="col-4">
            <img
              src="/static/media/tiltedLock.cb8094aefbee98032c28.png"
              alt="Bike Lock"
              className="bestLockImage d-none d-sm-block"
            />
          </div>

          <div className="col-12 col-sm-8 mt-sm-5 mt-2">
            <h3>
              What is the best bike lock
              <br />
              <span className="blueFont">for you?</span>
            </h3>
            <p>
              There are three available categories for a{' '}
              <a href="https://www.soldsecure.com">Sold Secure </a> lock;
              Bronze, Silver and Gold which represents the best bike lock for
              you, dependent on the value of your bike. When you obtain a quote
              from us either online or from our cycle team, we are able to tell
              you which category of lock you need. These can be purchased either
              from the <a href="https://www.soldsecure.com">Sold Secure </a>{' '}
              website or from a range of other retailers.
            </p>
          </div>

          <div className="col-12 mb-5">
            <h3>
              Securing your cycle to
              <br />
              <span className="blueFont"> an immovable object</span>
            </h3>
            <p className="blueFont">
              If you are using a lock to secure your cycle to an immovable
              object, here's the policy definition of what an immovable object
              is:
            </p>
            <p className="bulletPoint">
              Any solid object fixed in or on to concrete or stone, which is not
              capable of being undone, removed with, or lifted under/over the
              cycle.
            </p>
            <p className="bulletPoint">
              A properly fixed motor vehicle roof rack or properly fixed vehicle
              cycle rack.
            </p>
            <p className="bulletPoint">
              At train stations, a cycle rack supplied by the train station
              expressly for the purpose of securing bikes, and within the
              jurisdiction of the transport police.
            </p>
            <p>
              Full bicycle lock and security information can be found in our
              Policy Wording under <b>'Security Requirements'</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageRequirements;
