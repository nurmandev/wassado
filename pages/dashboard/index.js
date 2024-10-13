import Panel from "@/layouts/Panel";
import React from "react";
import { DashboardUi } from "./dashbord_comp";

const Dashboard = () => {
  return (
    <Panel>
      <div className="w-full h-full flex justify-center items-center !rounded">
       <DashboardUi/>
      </div>
    </Panel>
  );
};

export default Dashboard;
