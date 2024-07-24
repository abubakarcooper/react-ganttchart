import React from 'react';
import ProjectGanttChartView from './features/components/projectGantt/ProjectGanttChart';

const GanttChart = () => {
    return (
        <div className='control-pane mt-2 bg-white-3'>
            <ProjectGanttChartView />
        </div>
    );
};

export default GanttChart;
