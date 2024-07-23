import React, { useState } from 'react';
import GanttCharts from "../components/GanttCharts.js";
import ProjectOverview from "../components/ProjectOverview.js";
import { Tabs } from "flowbite-react";
import { FaChartSimple } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";
import '../css/projectoverview.css'


const GanttChartPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className='gantt-chart  bg-white-2 m-1.5	p-2.5'>
            <Tabs
                aria-label="Tabs with underline"
                variant="underline"
                onActiveTabChange={(tab) => setActiveTab(tab)}
                className='ganttTabs'
            >
                <Tabs.Item active title="Project Overview" icon={FaChartSimple} value="Project Overview" className=''>
                    {
                        activeTab == 0 &&
                        <ProjectOverview />
                    }
                </Tabs.Item>
                <Tabs.Item title="Gantt Charts" icon={GiPieChart} value="Gantt Charts">
                    {activeTab === 1 && <GanttCharts />}
                </Tabs.Item>
                <Tabs.Item title="Budget Report" icon={BiSolidReport} value="Budget Report">
                    {/* {activeTab === 1 && <GanttCharts />} */}
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default GanttChartPage;
