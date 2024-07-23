
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
    { id: 'completion', label: '%age Completion' },
    { id: 'action', label: 'Action' }
];
