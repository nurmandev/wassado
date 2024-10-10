/**
 * Title: Write a program using JavaScript on FooterSocial
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, August 2023
 */

import Link from "next/link";
import React from "react";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoPinterest,
  BiLogoTiktok,
} from "react-icons/bi";
import Tooltip from "../../tooltip/Tooltip";

const FooterSocial = () => {
  const items = [
    {
      id: 1,
      name: "Linkedin",
      icon: <BiLogoLinkedin className="text-lg" />,
      href: "https://www.linkedin.com/in/",
    },
    {
      id: 2,
      name: "Facebook",
      icon: <BiLogoFacebook className="text-lg" />,
      href: "https://www.facebook.com/",
    },
    {
      id: 3,
      name: "Instagram",
      icon: <BiLogoInstagram className="text-lg" />,
      href: "https://www.instagram.com/wassa_do",
    },
    {
      id: 4,
      name: "Twitter",
      icon: <BiLogoTwitter className="text-lg" />,
      href: "https://www.twitter.com/",
    },

    {
      id: 5,
      name: "Tiktok",
      icon: <BiLogoTiktok className="text-lg" />,
      href: "https://www.tiktok.com/",
    },
  ];

  return (
    <section>
      <div className="flex flex-row flex-wrap md:justify-normal justify-center items-center gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="border border-primary/20 hover:border-primary rounded p-1 h-fit w-fit"
          >
            <Tooltip text={item.name}>
              <Link href={item.href} title={item.name}>
                {item.icon}
              </Link>
            </Tooltip>
          </span>
        ))}
      </div>
    </section>
  );
};

export default FooterSocial;
