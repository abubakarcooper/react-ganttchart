import React, { useState } from 'react';
import Spinner from './Spinner';
import OverviewCard from './features/components/projectOverview/Overview1.js';
import TaskPerformance from './features/components/projectOverview/Taskperformance.js';
import ProjectTaskTable from './features/components/projectOverview/ProjectTask.js';

const ProjectOverview = () => {
    const [isGanttLoading, setLoading] = useState(false)

    if (isGanttLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className='control-pane mt-2 bg-white-3'>
            <div className='flex gap-5'>
                <div className='w-[30%]'>
                    <OverviewCard />
                </div>
                <div className='w-[70%]'>
                    <TaskPerformance />
                </div>
            </div>
            <div className=''>
                <ProjectTaskTable />
            </div>
        </div>
    );
};

export default ProjectOverview;
