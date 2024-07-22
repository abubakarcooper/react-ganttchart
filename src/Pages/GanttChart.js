import { useEffect } from "react"
import EstimateProjectManagement from "../Component/gantt/ProjectManagement"
const GanttChartPage = () => {

    useEffect(() => {
        const apiHeaders = {
            "Authorization": "Zoho-oauthtoken 1000.c6c031b8d69bd1823ab3c12b6b504be4.da207035394f17eb541f179418f39445"
        };

        const fetchData = async () => {
            try {
                const response = await fetch("https://www.zohoapis.com/creator/v2.1/data/cooperdevelopment/cooper-build/report/Estimate_Deliverable_Report?max_records=200", {
                    method: "GET",
                    headers: apiHeaders
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data, 'zoho creeator app');
            } catch (exception) {
                console.error(exception);
            }
        };

        fetchData();
    }, []);


    return <div className='gantt-chart'>
        <EstimateProjectManagement />
    </div>
}

export default GanttChartPage