import React, { useEffect } from 'react';
import { Table, Button, Checkbox, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletePerson } from '../../redux/personSlice';
import { useTranslation } from 'react-i18next';
import { toggleSelectRow, deleteSelectedRows, selectAllRows} from './../../redux/selectionSlice';

const PersonTable = ({ data, onEdit }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { selectedRowKeys} = useSelector((state) => state.selection);

    const getFullName = (record) => `${record.firstname || ''} ${record.lastname || ''}`;

    useEffect(() => {
        dispatch(selectAllRows(data.map(item => item.id)));
    }, [data, dispatch]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            dispatch(selectAllRows(data.map(item => item.id)));  // เลือกทั้งหมด
        } else {
            dispatch(selectAllRows([]));  // ยกเลิกการเลือกทั้งหมด
        }
    };

    const handleSelectRow = (record) => {
        dispatch(toggleSelectRow(record.id));
    };

    const handleDeleteSelected = () => {
        selectedRowKeys.forEach(key => dispatch(deletePerson(key)));
        dispatch(deleteSelectedRows());
    };

    const columns = [
        {
            title: (
                <Checkbox
                    indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
                    checked={selectedRowKeys.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                />
            ),
            key: 'select',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.id)}
                    onChange={() => handleSelectRow(record)}
                />
            ),
        },
        {
            title: t('Name'),
            key: 'name',
            render: (text, record) => getFullName(record),
        },
        {
            title: t('Gender'),
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: t('Mobile Phone'),
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        },
        {
            title: t('Nationality'),
            dataIndex: 'nationality',
            key: 'nationality',
        },
        {
            title: t('Manage'),
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
                        {t('Edit')}
                    </Button>
                    <Button onClick={() => dispatch(deletePerson(record.id))}>
                        {t('Delete')}
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="table-container">
            <div className="table-header">
                <div className="table-actions">
                    <Checkbox
                        checked={selectedRowKeys.length === data.length && data.length > 0}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
                        onChange={handleSelectAll}
                    >
                        {t('Select All')}
                    </Checkbox>
                    <Button
                        type="default"
                        onClick={handleDeleteSelected}
                        disabled={selectedRowKeys.length === 0}
                        style={{ marginLeft: 8 }}
                    >
                        {t('Delete')}
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey="id"/>
        </div>
    );
};

export default PersonTable;
