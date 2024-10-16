import React from "react";

const FooterCopyright = () => {
  return (
    <section>
      <p className="text-sm text-center">
        © {new Date().getFullYear()} All Right Reserved by <b>wassado</b>
      </p>
    </section>
  );
};

export default FooterCopyright;
