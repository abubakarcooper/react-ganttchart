import React, { useState } from 'react';
import Spinner from './Spinner';

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
        <div className='control-pane mt-2 bg-white-3 h-[100vh]'>
            <p></p>
        </div>
    );
};

export default ProjectOverview;
