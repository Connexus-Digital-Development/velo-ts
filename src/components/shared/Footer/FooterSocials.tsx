import YouTubeIcon from "@/assets/svgs/youtube-icon.svg?url";
import InstagramIcon from "@/assets/svgs/instagram-icon.svg?url";
import LinkedinIcon from "@/assets/svgs/linkedin-icon.svg?url";
import TwitterIcon from "@/assets/svgs/twitter-icon.svg?url";
import FacebookIcon from "@/assets/svgs/facebook-icon.svg?url";

interface SocialItem {
  href: string;
  icon: string;
  alt: string;
  className: string;
}

const commonSocials: SocialItem[] = [
  {
    href: "https://www.linkedin.com/company/velosure-cycling-insurance?trk=company_name&original_referer=https%3A%2F%2Fvelosure.co.uk%2F",
    icon: LinkedinIcon,
    alt: "LinkedIn",
    className: "linkedIn",
  },
  {
    href: "https://twitter.com/cyclevelosure",
    icon: TwitterIcon,
    alt: "Twitter",
    className: "twitter",
  },
  {
    href: "https://www.facebook.com/Velosure/",
    icon: FacebookIcon,
    alt: "Facebook",
    className: "facebook",
  },
];

const smallSocials: SocialItem[] = [
  {
    href: "https://www.youtube.com/channel/UCj5XK8P8-ZIj-PBuNU3nSZg",
    icon: YouTubeIcon,
    alt: "YouTube",
    className: "youtube",
  },
  ...commonSocials,
];

const largeSocials: SocialItem[] = [
  {
    href: "https://www.instagram.com/velosure_uk",
    icon: InstagramIcon,
    alt: "Instagram",
    className: "instagram",
  },
  ...commonSocials,
];

function renderSocials(socials: SocialItem[], containerClass: string) {
  return (
    <div id="socials" className={containerClass}>
      <ul className="socials-list">
        {socials.map((social) => (
          <li key={social.className}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={social.className}
            >
              <img src={social.icon} alt={social.alt} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterSocials({ isSmall }: { isSmall?: boolean }) {
  return isSmall
    ? renderSocials(smallSocials, "socials-small")
    : renderSocials(largeSocials, "d-none d-lg-block socialsNarrow");
}
