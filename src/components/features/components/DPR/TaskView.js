// import { useState } from 'react';
// import Logo from '../../../../images/worksheet/logo.svg'
// const ProjectDetail = () => {
//     return (
//         <div className="projectGroup">
//             <div className="flex justify-between mb-4 p-2.5 rounded-md bg-primary-0">
//                 <p className="font-bold text-lg text-white-0">Project Details</p>
//             </div>
//             <div className="grid grid-cols-1 gap-4 my-4">
//                 <div className="shadow-md rounded-md px-6 py-7">
//                     <h4 className="text-base font-bold ">
//                         Project Name
//                     </h4>
//                     <p className="text-primary-0 font-medium flex items-center gap-2 mt-1 ">
//                         <span className="text-5xl">Tiger Global GYM</span>
//                     </p>
//                 </div>
//             </div>
//             <div className="grid grid-cols-4 gap-4 my-4">
//                 <div className="shadow-md rounded-md p-4">
//                     <h4 className="text-base font-bold ">
//                         Estimated Duration
//                     </h4>
//                     <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
//                         <span className="text-5xl">12</span>
//                         <span className="text-2xl text-gray-1 font-bold">Days</span>
//                     </p>
//                 </div>
//                 <div className="shadow-md rounded-md p-4">
//                     <h4 className="text-base font-bold">Actual Duration</h4>
//                     <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
//                         <span className="text-5xl">18</span>
//                         <span className="text-2xl text-gray-1 font-bold">Days</span>
//                     </p>
//                 </div>
//                 <div className="shadow-md rounded-md p-4">
//                     <h4 className="text-base font-bold">Actual Duration</h4>
//                     <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
//                         <span className="text-5xl">18</span>
//                         <span className="text-2xl text-gray-1 font-bold">Days</span>
//                     </p>
//                 </div>
//                 <div className="shadow-md rounded-md p-4">
//                     <h4 className="text-base font-bold">Actual Duration</h4>
//                     <p className="text-primary-0 font-medium flex items-center gap-2 mt-1">
//                         <span className="text-5xl">18</span>
//                         <span className="text-2xl text-gray-1 font-bold">Days</span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const TaskViewDPR = () => {
//     const [selectedStatus, setSelectedStatus] = useState("Completed");
//     return (
//         <div className='dpr-view-report'>
//             <div className="flex justify-between mx-5 mb-2 items-center">
//                 <h2 className="text-2xl text-primary-0 font-extrabold px-3 py-2">
//                     Daily Progress Form
//                 </h2>
//                 <div>
//                     <img src={Logo} />
//                 </div>
//             </div>
//             <div className="gantt-chart bg-white-2 mx-5 p-3  border-transparent rounded-lg">
//                 <ProjectDetail />
//             </div>
//         </div>


//     );
// };

// export default TaskViewDPR



import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ProjectDetail from './components/ProjectDetail'
import ProjectDescription from './components/ProjectDescription'
import WorkerDetail from './components/WorkerDetail'
import TaskDetail from './components/TaskDetail'
import ProgressAttachment from './components/ProgressAttachment'
import Documents from './components/Documents'


const TaskViewModal = ({ openTask }) => {


    return (
        <>
            <div>
                <ProjectDetail openTask={openTask} />
                <ProjectDescription openTask={openTask} />
                <WorkerDetail openTask={openTask} />
                <TaskDetail openTask={openTask} />
                <ProgressAttachment openTask={openTask} />
                <Documents openTask={openTask} />
            </div>
        </>
    )
}

export default TaskViewModal