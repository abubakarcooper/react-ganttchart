
export const taskStatuses = [
    {
        name: 'Completed',
        class: 'bg-completed'
    },
    {
        name: 'Paused',
        class: 'bg-Paused'
    },
    {
        name: 'Pending',
        class: `bg-Pending`

    },
    {
        name: 'Processing',
        class: `bg-Processing `
    },
]

export const taskColumns = [
    { id: 'taskName', label: 'Task name' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'actualStart', label: 'Actual Start' },
    { id: 'actualEnd', label: 'Actual End' },
    { id: 'amount', label: 'Amount' },
    { id: 'completion', label: 'Completion' },
    { id: 'action', label: 'Action' }
];


export const documentsColumn =
    [
        {
            "label": "Submitted Name",
            "id": "submitted-name"
        },
        {
            "label": "Submitted Type",
            "id": "submitted-type"
        },
        {
            "label": "Status",
            "id": "status"
        },
        {
            "label": "Trade Code",
            "id": "trade-code"
        },
        {
            "label": "Latest Date",
            "id": "latest-date"
        },
        {
            "label": "Latest Revision",
            "id": "latest-revision"
        },
        {
            "label": "Documents",
            "id": "documents"
        },
        {
            "label": "Action",
            "id": "action"
        }
    ]


export const dprTableColumns =
    [
        { id: 'date', label: 'Date', isActive: true },
        { id: 'projectName', label: 'Project Name', isActive: true },
        { id: 'taskName', label: 'Task Name', isActive: true },
        { id: 'supervisor', label: 'Supervisor', isActive: true },
        { id: 'reference', label: 'Reference', isActive: true },
        { id: 'completion', label: 'Completion', isActive: true },
        // { id: 'action', label: 'Action', isActive: true }
    ];