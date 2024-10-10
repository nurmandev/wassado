/**
 * Title: Write a program using JavaScript on Index
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, November 2023
 */

import Panel from "@/layouts/Panel";
import React from "react";

const Dashboard = () => {
  return (
    <Panel>
      <div className="w-full h-full flex justify-center items-center !rounded">
        <iframe
          title="Portfolio"
          src="https://bento.me/devhasibulislam"
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          frameBorder="0"
          scrolling="auto"
        ></iframe>
      </div>
    </Panel>
  );
};

export default Dashboard;
