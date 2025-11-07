const cookieData = [
  {
    name: "accepted",
    domain: "localhost",
    purpose: "Indicates that cookies have been accepted on the site.",
    whenSet: "When cookies are accepted on the main page.",
    expiry: "Session",
  },
  {
    name: "visid_incap_*",
    domain: ".connexus.co.uk",
    purpose:
      "Incapsula sets this cookie to provide cloud-based website security services.",
    whenSet: "On initial visit to the website.",
    expiry: "1 year",
  },

  {
    name: "ROUTEID",
    domain: "c2001.report.gbs...",
    purpose: "Likely used for load balancing or routing purposes.",
    whenSet: "On initial connection to the server.",
    expiry: "Session",
  },

  {
    name: "_dck",
    domain: ".elfsight.com",
    purpose: "Elfsight tracking or functionality cookie.",
    whenSet: "When interacting with Elfsight widgets.",
    expiry: "1 Year",
  },
  {
    name: "_clsk",
    domain: ".elfsight.com",
    purpose: "Elfsight analytics or session tracking.",
    whenSet: "During user interaction with Elfsight components.",
    expiry: "1 Day",
  },

  {
    name: "_uetsid",
    domain: ".elfsight.com",
    purpose: "Elfsight user session identifier.",
    whenSet: "When a new session starts with Elfsight services.",
    expiry: "1 Day",
  },
  {
    name: "_uetvid",
    domain: ".elfsight.com",
    purpose: "Elfsight unique visitor identifier.",
    whenSet: "On first visit to a site using Elfsight services.",
    expiry: "13 Months",
  },
  {
    name: "_ym_d",
    domain: ".elfsight.com",
    purpose: "Yandex Metrica analytics cookie for first visit date.",
    whenSet: "On first visit to a site using Yandex Metrica via Elfsight.",
    expiry: "1 Year",
  },
  {
    name: "_ym_isad",
    domain: ".elfsight.com",
    purpose: "Yandex Metrica cookie for ad blocker detection.",
    whenSet: "When Yandex Metrica checks for ad blockers.",
    expiry: "2 Days",
  },
  {
    name: "_ym_uid",
    domain: ".elfsight.com",
    purpose: "Yandex Metrica unique user ID.",
    whenSet: "On first visit to a site using Yandex Metrica via Elfsight.",
    expiry: "1 Year",
  },
  {
    name: "_ym_visorc",
    domain: ".elfsight.com",
    purpose: "Yandex Metrica cookie for WebVisor session recording.",
    whenSet: "When Yandex Metrica WebVisor is active.",
    expiry: "Session",
  },
  {
    name: "elfsight_viewed_recently",
    domain: "core.service.elfsight.com",
    purpose: "Used for implementing social platforms on the website.",
    whenSet: "When interacting with Elfsight-powered elements on the page.",
    expiry: "15 seconds",
  },
  {
    name: "elfsight_ab_group",
    domain: ".elfsight.com",
    purpose: "Elfsight A/B testing group assignment.",
    whenSet: "When participating in Elfsight A/B tests.",
    expiry: "1 Year",
  },

  {
    name: "elfsight_sign_up_landing_page",
    domain: ".elfsight.com",
    purpose: "Tracks the landing page for Elfsight sign-ups.",
    whenSet: "When visiting Elfsight sign-up pages.",
    expiry: "1 Month",
  },
  {
    name: "elfsight_sign_up_meta",
    domain: ".elfsight.com",
    purpose: "Stores metadata about the Elfsight sign-up process.",
    whenSet: "During the Elfsight sign-up process.",
    expiry: "Session",
  },
  {
    name: "elfsight_tracked_clicks",
    domain: ".elfsight.com",
    purpose: "Tracks clicks on Elfsight widgets or elements.",
    whenSet: "When interacting with clickable Elfsight elements.",
    expiry: "14 Days",
  },
  {
    name: "elfsight_tracked_clicks_active_session",
    domain: ".elfsight.com",
    purpose: "Indicates an active session for tracking Elfsight clicks.",
    whenSet: "When a session with click tracking begins.",
    expiry: "7 Days",
  },
  {
    name: "language",
    domain: ".elfsight.com",
    purpose: "Sets the language preference for Elfsight services.",
    whenSet: "When language is detected or set for Elfsight components.",
    expiry: "1 Year",
  },
];

const CookieTable = () => {
  return (
    <div className="cookie-table-container">
      <table className="cookie-table">
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>When are cookies set on visitor's device/PC?</th>
            <th>Expiry Time of Cookie</th>
          </tr>
        </thead>
        <tbody>
          {cookieData.map((cookie, index) => (
            <tr key={index}>
              <td>{cookie.name}</td>
              <td>{cookie.purpose}</td>
              <td>{cookie.whenSet}</td>
              <td>{cookie.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CookieTable;
