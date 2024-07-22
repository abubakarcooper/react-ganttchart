import moment from 'moment'
import { findMaxEndDate, formatAmount } from './func';



const moveToNextMonday = (date) => {
    const day = date.getDay();
    if (day === 6) {
        date.setDate(date.getDate() + 2);
    } else if (day === 0) {
        date.setDate(date.getDate() + 1);
    }
    return date;
};

// const generateDeliverableClassTasks = (allTasks, initialDate) => {
//     let previousObjectEndDate = new Date(initialDate);
//     let previousSubtaskEndDate = new Date(previousObjectEndDate);

//     allTasks.forEach((task) => {
//         let taskMinStartDate = null;
//         let taskMaxEndDate = null;
//         let taskTotalDuration = 0;


//         task.subtasks.forEach((subtask) => {
//             let subtaskMinStartDate = null;
//             let subtaskMaxEndDate = null;
//             let subtaskTotalDuration = 0;
//             let predecessor = ''

//             subtask.subtasks.forEach((tt, nestedIndex) => {

//                 let newEndDate = new Date(previousSubtaskEndDate);
//                 tt.StartDate = new Date(previousSubtaskEndDate);

//                 if (nestedIndex == 0) {
//                     predecessor = tt.TaskID
//                 } else {
//                     tt.Predecessor = predecessor + 'FS';
//                     predecessor = tt.TaskID
//                 }

//                 if (tt.days && +tt.days > 1) {
//                     newEndDate.setDate(previousSubtaskEndDate.getDate() + (+tt.days - 1));
//                 }
//                 moveToNextMonday(newEndDate);
//                 tt.EndDate = new Date(newEndDate);

//                 tt.Duration = +tt.days || 1;
//                 tt.MaterialCost = parseFloat(tt.mCost);
//                 tt.LabourCost = parseFloat(tt.lCost);
//                 tt.SubConCost = parseFloat(tt.subConTotal);

//                 if (!subtaskMinStartDate || new Date(tt.StartDate) < new Date(subtaskMinStartDate)) {
//                     subtaskMinStartDate = tt.StartDate;
//                 }
//                 if (!subtaskMaxEndDate || new Date(tt.EndDate) > new Date(subtaskMaxEndDate)) {
//                     subtaskMaxEndDate = tt.EndDate;
//                 }

//                 previousSubtaskEndDate = new Date(tt.EndDate);
//                 previousSubtaskEndDate.setDate(previousSubtaskEndDate.getDate() + 1);

//                 subtaskTotalDuration += tt.Duration;
//             });

//             subtask.StartDate = subtaskMinStartDate;
//             subtask.EndDate = subtaskMaxEndDate;
//             subtask.Duration = subtaskTotalDuration;
//             subtask.SubConCost = subtask.subtasks.reduce((acc, curr) => acc + (curr.SubConCost || 0), 0);
//             subtask.MaterialCost = subtask.subtasks.reduce((acc, curr) => acc + (curr.MaterialCost || 0), 0);
//             subtask.LabourCost = subtask.subtasks.reduce((acc, curr) => acc + (curr.LabourCost || 0), 0);

//             if (!taskMinStartDate || new Date(subtask.StartDate) < new Date(taskMinStartDate)) {
//                 taskMinStartDate = subtask.StartDate;
//             }
//             if (!taskMaxEndDate || new Date(subtask.EndDate) > new Date(taskMaxEndDate)) {
//                 taskMaxEndDate = subtask.EndDate;
//             }
//             taskTotalDuration += subtaskTotalDuration;
//         });

//         task.SubConCost = formatAmount(task.subtasks.reduce((acc, curr) => acc + (curr.SubConCost || 0), 0));
//         task.MaterialCost = formatAmount(task.subtasks.reduce((acc, curr) => acc + (curr.MaterialCost || 0), 0));
//         task.LabourCost = formatAmount(task.subtasks.reduce((acc, curr) => acc + (curr.LabourCost || 0), 0));
//         task.StartDate = taskMinStartDate;
//         task.EndDate = taskMaxEndDate;
//         task.Duration = taskTotalDuration;
//     });
//     return allTasks;
// };


const generateDeliverableClassTasks = (allTasks, initialDate) => {
    let previousObjectEndDate = new Date(initialDate);
    let previousSubtaskEndDate = new Date(previousObjectEndDate);

    let previousTaskId = 1;

    allTasks.forEach((task, index) => {
        let taskMinStartDate = null;
        let taskMaxEndDate = null;
        let taskTotalDuration = 0;
        let subtaskMinStartDate = null;
        let subtaskMaxEndDate = null;

        task?.subtasks?.forEach((subtask, subtaskIndex) => {

            let subtaskTotalDuration = 0;
            let predecessor = ''
            subtask?.subtasks?.forEach((tt, nestedIndex) => {
                let newEndDate = new Date(previousObjectEndDate);
                tt.StartDate = new Date(previousSubtaskEndDate);


                if (nestedIndex == 0) {
                    predecessor = tt.TaskID
                } else {
                    tt.Predecessor = predecessor + 'FS';
                    predecessor = tt.TaskID
                }

                tt.StartDate = previousObjectEndDate;
                tt.Duration = +tt.days || 1;
                tt.MaterialCost = parseFloat(tt.mCost)
                tt.LabourCost = parseFloat(tt.lCost)
                tt.SubConCost = parseFloat(tt.subConTotal)

                moveToNextMonday(previousObjectEndDate);

                if (tt.days == "" || +tt.days == 1) {
                    tt.EndDate = tt.StartDate;
                } else if (tt.days && +tt.days >= 2) {
                    newEndDate.setDate(previousObjectEndDate.getDate() + ((+tt.days - 1)));
                    moveToNextMonday(newEndDate);
                    tt.EndDate = newEndDate;
                }

                if (!subtaskMinStartDate || new Date(tt.StartDate) < new Date(subtaskMinStartDate)) {
                    subtaskMinStartDate = tt.StartDate;
                }
                if (!subtaskMaxEndDate || new Date(tt.EndDate) > new Date(subtaskMaxEndDate)) {
                    subtaskMaxEndDate = tt.EndDate;
                }

                newEndDate.setDate(newEndDate.getDate() + 1);
                previousObjectEndDate = newEndDate;
                subtaskTotalDuration += tt.Duration;
            });

            subtask.SubConCost = subtask?.subtasks?.length ?
                subtask.subtasks.reduce((acc, curr) => acc + (curr.SubConCost || 0), 0) :
                0;

            subtask.MaterialCost = subtask?.subtasks?.length ?
                subtask.subtasks.reduce((acc, curr) => acc + (curr.MaterialCost || 0), 0) :
                0;

            subtask.LabourCost = subtask?.subtasks?.length ?
                subtask.subtasks.reduce((acc, curr) => acc + (curr.LabourCost || 0), 0) :
                0;

            subtask.StartDate = subtaskMinStartDate;
            subtask.EndDate = subtaskMaxEndDate;
            subtask.Duration = subtaskTotalDuration;

            if (!taskMinStartDate || new Date(subtask.StartDate) < new Date(taskMinStartDate)) {
                taskMinStartDate = subtask.StartDate;
            }
            if (!taskMaxEndDate || new Date(subtask.EndDate) > new Date(taskMaxEndDate)) {
                taskMaxEndDate = subtask.EndDate;
            }
            taskTotalDuration += subtaskTotalDuration;
        });

        task.SubConCost = formatAmount(task?.subtasks?.length ?
            task.subtasks.reduce((acc, curr) => acc + (curr.SubConCost || 0), 0) :
            0);

        task.MaterialCost = formatAmount(task?.subtasks?.length ?
            task.subtasks.reduce((acc, curr) => acc + (curr.MaterialCost || 0), 0) :
            0);

        task.LabourCost = formatAmount(task?.subtasks?.length ?
            task.subtasks.reduce((acc, curr) => acc + (curr.LabourCost || 0), 0) :
            0);

        task.StartDate = taskMinStartDate;
        task.EndDate = taskMaxEndDate;
        task.Duration = taskTotalDuration;
    });
    return allTasks
};

// const groupByDeliverableClassID = (arr) => {
//     const result = arr.reduce((acc, curr) => {
//         const deliverableClassID = curr.Deliverable_Class.ID;

//         if (!acc[deliverableClassID]) {
//             acc[deliverableClassID] = {
//                 Deliverable_Class: curr.Deliverable_Class,
//                 TaskID: curr.Deliverable_Class?.ID,
//                 TaskName: curr.Deliverable_Class?.display_value,
//                 StartDate: '',
//                 EndDate: '',
//                 subtasks: []

//             };
//         }

//         acc[deliverableClassID].subtasks.push(curr);

//         return acc;
//     }, {});
//     return Object.values(result)
// }

const groupByDeliverableClassID = (arr) => {
    const result = arr.reduce((acc, curr) => {
        const deliverableClassID = curr.Deliverable_Class.ID;
        // Skip if Deliverable_Class.ID is null or undefined
        if (deliverableClassID == null) return acc;

        if (!acc[deliverableClassID]) {
            acc[deliverableClassID] = {
                Deliverable_Class: curr.Deliverable_Class,
                TaskID: curr.Deliverable_Class.ID,
                TaskName: curr.Deliverable_Class.display_value,
                StartDate: '',
                EndDate: '',
                subtasks: []
            };
        }

        acc[deliverableClassID].subtasks.push(curr);

        return acc;
    }, {});

    return Object.values(result);
}


const revampSubtasks = (tasks) => {
    tasks?.forEach(task => {
        task?.subtasks.forEach(subtask => {
            subtask.TaskID = subtask?.ID;
            subtask.TaskName = subtask?.Name;
            subtask.StartDate = new Date('04/02/2019');
            subtask.EndDate = new Date('04/21/2019');
            subtask.subtasks = subtask?.Estimate_Tasks?.length ? convertTasksArray(subtask?.Estimate_Tasks) : [];
        });
    });
    return tasks;
}

const convertTasksArray = (displayValueArray) => {
    if (!displayValueArray?.length) return null;
    return displayValueArray.map((item) => {
        const [
            srNo,
            TaskName,
            taskType,
            description,
            mCost,
            lCost,
            TaskID,
            days,
            subConTotal,
            DC,
            total,
            estimateCommentsCount,
            estimateFileLogCounts,
            estimateMaterialsCount,
            estimateLaboursCount,
            estimateSubcontractorsCount,
        ] = item.display_value.split(";");
        return {
            srNo,
            TaskName,
            taskType,
            description,
            mCost,
            lCost,
            TaskID,
            days,
            subConTotal,
            DC,
            total,
            estimateCommentsCount,
            estimateFileLogCounts,
            estimateMaterialsCount,
            estimateLaboursCount,
            estimateSubcontractorsCount,
        };
    });
};

export const generateTasks = (data, startDate) => {
    const classes = groupByDeliverableClassID(data);
    const subtasks = revampSubtasks(classes);
    const date = moment(startDate, 'MM-DD-YYYY');
    const ganttDate = date.format('MM/DD/YYYY');
    const allTasks = generateDeliverableClassTasks(subtasks, ganttDate)
    return allTasks
}

const data = [
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Project Supervision and Coordination during fabrication and Installation. <br /></div>",
        "Rate": "8100.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "8100.00",
        "S_No": "100",
        "Unit": "Lumpsum",
        "Name": "Project Management & Site Supervision",
        "Qty": "1.00",
        "Days": "2",
        "Deliverable_Class": {
            "display_value": "01 - General Requirements",
            "ID": "1556703000040039707"
        },
        "ID": "1556703000046579051",
        "Estimate_Tasks": [
            {
                "display_value": "100;Project Management;Project Management Team;Project Management;7600.00;200.00;1556703000046579068;1;200.00;01 - General Requirements;7600.00;0;3;1;0;1",
                "ID": "1556703000046579068"
            },
            {
                "display_value": "200;Site Superintendent;Site;Daily Site Supervision;0.00;300.00;1556703000046579070;1;300.00;01 - General Requirements;0.00;0;1;0;0;1",
                "ID": "1556703000046579070"
            }
        ],
        "Added_Time": "11-16-2023 13:00:06"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Mobilization and Delivery of Tools and Material to Site<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "200",
        "Unit": "Lumpsum",
        "Name": "Project Management & Site Supervision",
        "Qty": "1.00",
        "Days": "2",
        "Deliverable_Class": {
            "display_value": "01 - General Requirements",
            "ID": "1556703000040039707"
        },
        "ID": "1556703000046579055",
        "Estimate_Tasks": [
            {
                "display_value": "100;Project Management;Project Management Team;Project Management;0.00;0.00;1556703000046579072;1;0.00;01 - General Requirements;0.00;0;0;0;0;0",
                "ID": "1556703000046579072"
            },
            {
                "display_value": "200;Site Superintendent;Site;Daily Site Supervision;0.00;0.00;1556703000046579074;1;0.00;01 - General Requirements;0.00;0;0;0;0;0",
                "ID": "1556703000046579074"
            }
        ],
        "Added_Time": "11-16-2023 13:00:06"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Demobilization and Delivery of Tools and Material from Site to WH<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "300",
        "Unit": "Lumpsum",
        "Name": "Project Management & Site Supervision",
        "Qty": "1.00",
        "Days": "2",
        "Deliverable_Class": {
            "display_value": "01 - General Requirements",
            "ID": "1556703000040039707"
        },
        "ID": "1556703000046579059",
        "Estimate_Tasks": [
            {
                "display_value": "100;Project Management;Project Management Team;Project Management;0.00;0.00;1556703000046579076;3;0.00;01 - General Requirements;0.00;0;0;0;0;0",
                "ID": "1556703000046579076"
            },
            {
                "display_value": "200;Site Superintendent;Site;Daily Site Supervision;0.00;0.00;1556703000046579078;1;0.00;01 - General Requirements;0.00;0;0;0;0;0",
                "ID": "1556703000046579078"
            }
        ],
        "Added_Time": "11-16-2023 13:00:06"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Protection of Existing and New Conditions<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "400",
        "Unit": "Unit",
        "Name": "Protection of Existing/New Conditions",
        "Qty": "1.00",
        "Days": "0",
        "Deliverable_Class": {
            "display_value": "02 - Site Preparation",
            "ID": "1556703000040039708"
        },
        "ID": "1556703000046579094",
        "Estimate_Tasks": [
            {
                "display_value": "200;Wall Protection;Site;Plastic Protection Installation on Walls;0.00;0.00;1556703000046579126;1;0.00;02 - Site Preparation;0.00;0;0;0;0;0",
                "ID": "1556703000046579126"
            },
            {
                "display_value": "300;Floor Protection;Site;Ram Board Installation on Flooring;0.00;0.00;1556703000046579128;1;0.00;02 - Site Preparation;0.00;0;0;0;0;0",
                "ID": "1556703000046579128"
            },
            {
                "display_value": "400;Rubbish Removal;Site;Removal of debris/garbage/refuse;0.00;0.00;1556703000046579140;1;0.00;02 - Site Preparation;0.00;0;0;0;0;0",
                "ID": "1556703000046579140"
            }
        ],
        "Added_Time": "11-16-2023 13:09:56"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Demolition of Partition as per Approved Plan or Drawing<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "500",
        "Unit": "Lumpsum",
        "Name": "Demolition ",
        "Qty": "1.00",
        "Days": "4",
        "Deliverable_Class": {
            "display_value": "02 - Site Preparation",
            "ID": "1556703000040039708"
        },
        "ID": "1556703000046579098",
        "Estimate_Tasks": [
            {
                "display_value": "100;Architectural Demolition;Site;Removal/Demolition of Architectural Elements as per plan/drawing;0.00;0.00;1556703000046579112;3;0.00;02 - Site Preparation;0.00;0;0;0;0;0",
                "ID": "1556703000046579112"
            },
            {
                "display_value": "200;Electrical Demolition;Site;Removal/Demolition of Electrical Elements as per plan/drawing;0.00;0.00;1556703000046579114;1;0.00;02 - Site Preparation;0.00;0;0;0;0;0",
                "ID": "1556703000046579114"
            }
        ],
        "Added_Time": "11-16-2023 13:09:56"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Site Cleaning and Rubbish Removal<br /></div>",
        "Rate": "16.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "16.00",
        "S_No": "600",
        "Unit": "Lumpsum",
        "Name": "Site Cleaning",
        "Qty": "1.00",
        "Days": "3",
        "Deliverable_Class": {
            "display_value": "02 - Site Preparation",
            "ID": "1556703000040039708"
        },
        "ID": "1556703000046579102",
        "Estimate_Tasks": [
            {
                "display_value": "100;Cleaning;Site;Cleaning the adjacent areas on the wall due to demolition;0.00;16.00;1556703000046579120;1;16.00;02 - Site Preparation;0.00;0;0;0;0;1",
                "ID": "1556703000046579120"
            }
        ],
        "Added_Time": "11-16-2023 13:09:56"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Miscellaneous patching of walls after demo<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "900",
        "Unit": "Square Foot",
        "Name": "Rough Carpentry, Miscellaneous patching of walls after demo",
        "Qty": "1.00",
        "Days": "0",
        "Deliverable_Class": {
            "display_value": "06 - Woods and Plastics",
            "ID": "1556703000040039712"
        },
        "ID": "1556703000046579232",
        "Estimate_Tasks": [],
        "Added_Time": "11-16-2023 13:43:25"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Patch flooring at areas of wall removals to match existing<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "1000",
        "Unit": "Square Foot",
        "Name": "Rough Carpentry, Patch flooring",
        "Qty": "1.00",
        "Days": "0",
        "Deliverable_Class": {
            "display_value": "06 - Woods and Plastics",
            "ID": "1556703000040039712"
        },
        "ID": "1556703000046579236",
        "Estimate_Tasks": [],
        "Added_Time": "11-16-2023 13:43:25"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Walk-in Closet Fabrication<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "700",
        "Unit": "Linear Foot",
        "Name": "Closet Fabrication",
        "Qty": "30.00",
        "Days": "27",
        "Deliverable_Class": {
            "display_value": "Millwork/Cabinetry",
            "ID": "1556703000046235045"
        },
        "ID": "1556703000046579188",
        "Estimate_Tasks": [
            {
                "display_value": "100;Site Measurement;Site;Site Measurement for the Actual Dimensions;0.00;0.00;1556703000046579196;1;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579196"
            },
            {
                "display_value": "200;Procurement of Materials;Procurement;Buying All Necessary Materials;0.00;0.00;1556703000046579198;1;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579198"
            },
            {
                "display_value": "300;Fabrication;Millwork Shop;Fabrication of Closet (Drawers, shelves and Carcass);0.00;0.00;1556703000046579200;3;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579200"
            },
            {
                "display_value": "400;Finishing;Millwork Shop;Painting or Installation of Finish;0.00;0.00;1556703000046579202;1;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579202"
            }
        ],
        "Added_Time": "11-16-2023 13:33:30"
    },
    {
        "Add_Estimate_Worksheet.Estimate_No": "EST-0302",
        "ATTENTION": "",
        "Add_Estimate_Worksheet.Auto_No": "302",
        "Description": "<div>Walk-in Closet Fabrication<br /></div>",
        "Rate": "0.00",
        "Apply_Tax_8_875": "false",
        "Add_Estimate_Worksheet": {
            "display_value": "1556703000046579063",
            "ID": "1556703000046579063"
        },
        "Final_Total": "",
        "Sub_Total": "0.00",
        "S_No": "800",
        "Unit": "Linear Foot",
        "Name": "Closet Installation",
        "Qty": "30.00",
        "Days": "6",
        "Deliverable_Class": {
            "display_value": "Millwork/Cabinetry",
            "ID": "1556703000046235045"
        },
        "ID": "1556703000046579218",
        "Estimate_Tasks": [
            {
                "display_value": "100;Delivery;Logistics;Delivery of Fabricated Millwork to Site;0.00;0.00;1556703000046579226;1;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579226"
            },
            {
                "display_value": "200;Installation;Site;Installation of Fabricated Millwork ;0.00;0.00;1556703000046579228;1;0.00;Millwork/Cabinetry;0.00;0;0;0;0;0",
                "ID": "1556703000046579228"
            }
        ],
        "Added_Time": "11-16-2023 13:41:39"
    }
]

const startDate = ''

// generateTasks(data, startDate)





// // Example data
// export const tasks = [
//     {
//         "TaskID": "1556703000040039707",
//         "TaskName": "01 - General Requirements",
//         "StartDate": "",
//         "EndDate": "",
//         "subtasks": [
//             {
//                 "TaskID": "1556703000046579051",
//                 "TaskName": "Project Management & Site Supervision",
//                 "StartDate": "",
//                 "EndDate": "",
//                 "subtasks": [
//                     {
//                         "TaskName": "Project Management",
//                         "TaskID": "1556703000046579068",
//                         "days": "1",
//                     },
//                     {
//                         "TaskName": "Site Superintendent",
//                         "TaskID": "1556703000046579070",
//                         "days": "1",
//                     }
//                 ]
//             },
//             {
//                 "TaskID": "1556703000046579052",
//                 "TaskName": "Another Task",
//                 "StartDate": "",
//                 "EndDate": "",
//                 "subtasks": [
//                     {
//                         "TaskName": "Subtask A",
//                         "TaskID": "1556703000046579069",
//                         "days": "3",
//                     },
//                     {
//                         "TaskName": "Subtask B",
//                         "TaskID": "1556703000046579071",
//                         "days": "1",
//                     }
//                 ]
//             }
//         ]
//     }
// ];

