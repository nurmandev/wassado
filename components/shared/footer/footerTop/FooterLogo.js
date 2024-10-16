import React from "react";
import Logo from "../../logo/Logo";
import FooterPayment from "./FooterPayment";

const FooterLogo = () => {
  return (
    <section>
      <article className="flex md:flex-col md:justify-normal md:items-start flex-row justify-between items-center gap-y-4">
        <Logo />
        <p className="text-xs md:block hidden">
          Wassado is a multifaceted hospitality establishment designed to cater
          to diverse traveler preferences while championing eco-friendly
          practices and cultural immersion.
        </p>
        <div className="lg:hidden block">
          <FooterPayment />
        </div>
      </article>
    </section>
  );
};

export default FooterLogo;
