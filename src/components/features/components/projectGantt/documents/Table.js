import { useState } from 'react';
import bin from '../../../../../images/redDelete.svg';
import edit from '../../../../../images/edit.png';
import docs from '../../../../../images/docs.svg';
import { taskColumns, documentsColumn } from '../../../../../constant/data';

const tasks = [
    {
        id: 1,
        name: 'Test Document',
        log: 'UE-49 FLDR',
        type: 'Field report',
        status: 'Approved',
        code: 'IT Site Work Place',
        latestDate: '11/03/2022',
        LatestRevision: 'Rev.007',
        Documents: ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']
    },
    {
        id: 1,
        name: 'Test Document',
        log: 'UE-49 FLDR',
        type: 'Field report',
        status: 'Approved',
        code: 'IT Site Work Place',
        latestDate: '11/03/2022',
        LatestRevision: 'Rev.007',
        Documents: ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']
    },
    {
        id: 1,
        name: 'UE-49 FLDR',
        type: 'Field report',
        status: 'Approved',
        code: 'IT Site Work Place',
        latestDate: '11/03/2022',
        LatestRevision: 'Rev.007',
        Documents: ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']
    },
    {
        id: 1,
        name: 'UE-49 FLDR',
        log: 'UE-49 FLDR',
        type: 'Field report',
        status: 'Approved',
        code: 'IT Site Work Place',
        latestDate: '11/03/2022',
        LatestRevision: 'Rev.007',
        Documents: ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']
    },
];

const Table = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const handleDelete = () => {
        // Handle the deletion logic here
        closeDeleteModal();
    };

    const renderDocuments = (documents) => {
        if (documents.length === 1) {
            return documents[0];
        } else if (documents.length > 1) {
            return `+${documents.length - 1} more`;
        }
        return '';
    };

    return (
        <div className=''>
            <div className=''>
                <div className="relative overflow-x-auto shadow-md border border-gray-0">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 bg-primary-5">
                            <tr className=" font-semibold ">

                                {documentsColumn.map((column) => (
                                    <th scope="col" className="text-left text-sm py-3 px-2">

                                        {column.label}
                                    </th>
                                ))}
                            </tr>

                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-left py-3 font-medium">
                                    <td scope="row" className="py-4 px-2">{task.name}</td>
                                    <td className="py-4 px-2">{task.type}</td>
                                    <td className={`py-4 px-2 ${task.status.includes('Approved') ? 'text-green-500' : task.status.includes('Rejected') ? 'text-red-500' : ''}`}>
                                        {task.status}
                                    </td>
                                    <td className="py-4 px-2 ">{task.code}</td>
                                    <td className="py-4 px-">{task.latestDate}</td>
                                    <td className="py-4 px-2">{task.LatestRevision}</td>
                                    <td className="py-4 px-2">
                                        <div className='flex gap-1'>
                                            <img src={docs} alt="document" />
                                            {renderDocuments(task.Documents)}
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className='flex gap-2'>
                                            <img src={edit} alt="edit" />
                                            <img src={bin} alt="delete" onClick={() => openDeleteModal(task)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-primary-6 bg-opacity-50 z-50">
                    <div className="bg-white-0 p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Are you sure you want to delete?</h2>
                        <p className="mb-4">You are about to delete the task: <strong className='text-primary-0'>{taskToDelete?.name}</strong></p>
                        <div className="flex justify-end gap-4">
                            <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-300 rounded-md border border-primary-0">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 border border-primary-0 bg-primary-0 text-white-0 rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;


