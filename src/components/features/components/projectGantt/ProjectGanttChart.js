import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Toolbar,
    Sort, Filter, Resize, ColumnMenu, PdfExport, DayMarkers, VirtualScroll, Edit
} from '@syncfusion/ej2-react-gantt';
import '../../../../index.css';
import '../../../../css/gantt.css';
import { generateTasks } from '../../../../utils/estimategatt';
import { toast } from 'react-toastify';
import { getApi } from '../../../../apis/estimatesheet';
import Spinner from "../../../Spinner";
import { BiSolidFilePdf } from "react-icons/bi";
import ProjectStartModal from '../modals/ProjectStartModal';
import { RiBriefcase2Line } from "react-icons/ri";
import TaskModal from './TaskModal';

const splitterSettings = {
    position: "40%"
};

const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    MaterialCost: 'MaterialCost',
    LabourCost: 'LabourCost',
    SubConCost: 'SubConCost',
    child: 'subtasks',
};

const labelSettings = {
    rightLabel: 'TaskName'
};

const ProjectGanttChartView = () => {
    const ganttInstance = useRef(null);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [isOpenStartDateModal, setStartDateModal] = useState(false);
    const [TasksData, setTaskData] = useState([]);
    const [isGanttLoading, setGanttLoading] = useState(true);
    let originalColumnSettings = [];
    const toolbarOptions = [
        {
            text: 'Project Start Date',
            tooltipText: 'Project Start Date',
            click: () => setStartDateModal(!isOpenStartDateModal),
            id: 'ProjectStartDate',
            prefixIcon: 'project-icon relative -right-[5px] text-sm'
        },
        {
            text: 'Export To PDF',
            tooltipText: 'Export To PDF',
            id: 'Test2',
            prefixIcon: 'pdf-icon relative -right-[5px] text-sm'
        },
        'ExpandAll',
        'CollapseAll'
    ];

    const editSettings = {
        allowAdding: false,
        allowEditing: false,
        allowDeleting: false,
        allowTaskbarEditing: false,
        showDeleteConfirmDialog: false
    };

    useEffect(() => {
        getEstimateDetailViewReport();
    }, []);

    useEffect(() => {
        if (ganttInstance?.current) {
            const projectStartDateElement = document.querySelector('.e-toolbar-item .project-icon');
            const exportToPDFElement = document.querySelector('.e-toolbar-item .pdf-icon');

            if (projectStartDateElement) {
                if (projectStartDateElement && projectStartDateElement.parentElement) {
                    projectStartDateElement.parentElement.classList.add('your-new-class');
                }
                ReactDOM.render(<RiBriefcase2Line className='text-sm mb-[0px] text-primary-900' />, projectStartDateElement);
            }
            if (exportToPDFElement) {
                ReactDOM.render(<BiSolidFilePdf className='text-lg mb-[3px]' />, exportToPDFElement);
            }
        }
    });

    useEffect(() => {
        // Function to handle button clicks
        const handleClick = (event) => {
            // Remove 'hello' class from all buttons
            const toolbarItems = document.querySelectorAll('.e-toolbar-items .e-tbar-btn');
            toolbarItems.forEach(btn => btn.classList.remove('active-primary'));
            event.currentTarget.classList.add('active-primary');
        };

        // Attach click event listeners to all buttons
        const toolbarButtons = document.querySelectorAll('.e-toolbar-items .e-tbar-btn');
        toolbarButtons.forEach(button => {
            button.addEventListener('click', handleClick);
        });

        // Cleanup event listeners on component unmount
        return () => {
            toolbarButtons.forEach(button => {
                button.removeEventListener('click', handleClick);
            });
        };
    });


    const getEstimateDetailViewReport = async () => {
        try {
            const projectDate = localStorage.getItem('Project_Start_Date');
            const estimate_no = 652;
            const worksheet = await getApi("All_Estimate_Worksheets1", `Auto_No==${estimate_no}`);

            if (!worksheet) {
                return toast.error('Estimate details not found!');
            }

            if (estimate_no) {
                const data = await getApi(
                    "Estimate_Detail_View_Report",
                    `Add_Estimate_Worksheet.Auto_No==${estimate_no}`
                );
                const tasks = generateTasks(data, worksheet[0]?.Start_Date);
                setTaskData(tasks);
                setGanttLoading(false);
            }
        } catch (error) {
            setGanttLoading(false);
            console.log("GET_ESTIMATE_DETAIL_REPORT_ERROR", error);
            toast.error('Estimate details not found!');
        }
    };

    const onChangeGridPosition = (args) => {
        if (args.value === "1") {
            ganttInstance.current.setSplitterPosition("100%", "position");
        } else if (args.value === "2") {
            ganttInstance.current.setSplitterPosition("0%", "position");
        } else if (args.value === "3") {
            ganttInstance.current.setSplitterPosition("50%", "position");
        }
    };

    const taskbarTemplate = (props) => (
        <div
            className="e-gantt-child-taskbar-inner-div e-gantt-child-taskbar cursor-pointer"
            style={{ height: '100%' }}
        >
            <div
                className="e-gantt-child-progressbar-inner-div e-gantt-child-progressbar"
                style={{
                    width: props.ganttProperties.progressWidth + 'px',
                    height: '100%',
                }}
            ></div>
        </div>
    );

    const handleChangeProjectStartDate = () => {
        // return <ProjectStartModal />
    }
    const toolbarClick = async (args) => {
        if (args.item.text === 'PDF export') {
            saveCurrentLayout();
            adjustLayoutForExport();
            showLoadingSpinner();
            await beforePdfExport();
            setTimeout(async () => {
                await ganttInstance.current.pdfExport();
                setTimeout(() => {
                    afterPdfExport();
                    hideLoadingSpinner();
                    restoreOriginalLayout();
                }, 2000);
            }, 1000);
        }
    };

    const beforePdfExport = () => {
        const materialCostColumn = ganttInstance.current.treeGrid.grid.getColumnByField('MaterialCost');
        const labourCostColumn = ganttInstance.current.treeGrid.grid.getColumnByField('LabourCost');
        const subConCostColumn = ganttInstance.current.treeGrid.grid.getColumnByField('SubConCost');

        materialCostColumn.visible = false;
        labourCostColumn.visible = false;
        subConCostColumn.visible = false;
        ganttInstance.current.treeGrid.grid.refreshColumns();
    };

    const afterPdfExport = () => {
        const materialCostColumn = ganttInstance.current.treeGrid.grid.getColumnByField('MaterialCost');
        const labourCostColumn = ganttInstance.current.treeGrid.grid.getColumnByField('LabourCost');
        materialCostColumn.visible = true;
        labourCostColumn.visible = true;
        ganttInstance.current.treeGrid.grid.refreshColumns();
    };

    const showLoadingSpinner = () => {
        ganttInstance.current.treeGrid.showSpinner();
    };

    const hideLoadingSpinner = () => {
        ganttInstance.current.treeGrid.hideSpinner();
    };

    const saveCurrentLayout = () => {
        originalColumnSettings = ganttInstance.current.treeGrid.columns.map(column => ({
            field: column.field,
            width: column.width
        }));
    };

    const adjustLayoutForExport = () => {
        ganttInstance.current.treeGrid.columns.forEach(column => {
            column.width = '25%';
        });
        ganttInstance.current.treeGrid.grid.refreshColumns();
    };

    const restoreOriginalLayout = () => {
        ganttInstance.current.treeGrid.columns.forEach((column, index) => {
            column.width = originalColumnSettings[index].width;
        });
        ganttInstance.current.treeGrid.grid.refreshColumns();
    };

    const onSingleStartDateeModalClose = () => {
        setStartDateModal(!isOpenStartDateModal)
    }

    const handleTaskbarClick = (args) => {
        // setTaskModalOpen(true)
    };

    const handleRowSelected = (args) => {
        const { data, } = args
        if (data.level == 2) {
            setTaskModalOpen(true)
            console.log(data);
            // alert('Helloo')
        }
    };

    const handleTaskModelOpen = () => {
        setTaskModalOpen(!isTaskModalOpen)
    }

    console.log(isTaskModalOpen, 'isTaskModalOpen')

    if (isGanttLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className='control-pane mt-2 bg-white-900'>
            <button onClick={handleTaskModelOpen}>Hello</button>
            <div className='control-section mt-2'>
                <GanttComponent id='Default' dataSource={TasksData} treeColumnIndex={1}
                    ref={ganttInstance}
                    dateFormat={'MMM dd, y'}
                    taskFields={taskFields}
                    labelSettings={labelSettings}
                    height='780px'
                    taskbarTemplate={taskbarTemplate}
                    allowSorting={true} allowFiltering={true} allowResizing={true}
                    toolbar={toolbarOptions}
                    toolbarClick={toolbarClick}
                    splitterSettings={splitterSettings}
                    allowPdfExport={true}
                    highlightWeekends={true}
                    collapseAllParentTasks={true}
                    className='gantt_estimate'
                    loadingIndicator={'Spinner'}
                    taskbarClick={handleTaskbarClick}
                    editSettings={editSettings}
                    rowSelected={handleRowSelected}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='TaskID' width='80' allowFiltering={false} visible={false}></ColumnDirective>
                        <ColumnDirective field='TaskName' headerText='Task Name' width='200' clipMode='EllipsisWithTooltip' cssClass='Abubakar'></ColumnDirective>
                        <ColumnDirective field='StartDate' ></ColumnDirective>
                        <ColumnDirective field='EndDate' ></ColumnDirective>
                        <ColumnDirective field='Duration' allowFiltering={false}></ColumnDirective> n
                    </ColumnsDirective>
                    <Inject services={[Sort, Filter, Resize, ColumnMenu, Selection, Toolbar, PdfExport, DayMarkers, VirtualScroll, Edit]} />
                </GanttComponent>
            </div>
            <div className='modals'>
                {/* <ProjectStartModal singleStartDateModalOpen={isOpenStartDateModal} onSingleStartDateeModalClose={onSingleStartDateeModalClose} /> */}
                <TaskModal isTaskModalOpen={isTaskModalOpen} handleTaskModelOpen={handleTaskModelOpen} />
            </div>
        </div>
    );
};

export default ProjectGanttChartView;
