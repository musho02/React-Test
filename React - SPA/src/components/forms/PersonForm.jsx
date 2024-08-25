import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, InputNumber, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { addPerson, editPerson } from '../../redux/personSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { clearPersonToEdit } from '../../redux/personEditSlice';
import Flag from 'react-flagkit';

const { Option } = Select;

const PersonForm = ({ personToEdit }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (personToEdit) {
            form.setFieldsValue({
                ...personToEdit,
                birthday: personToEdit.birthday ? moment(personToEdit.birthday) : null,
            });
        } else {
            form.resetFields();
        }
    }, [personToEdit]);

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
        };

        if (personToEdit) {
            dispatch(editPerson({ ...personToEdit, ...formattedValues }));
        } else {
            dispatch(addPerson({ ...formattedValues, id: Date.now() }));
        }
        form.resetFields();
        dispatch(clearPersonToEdit());
    };

    const handleReset = () => {
        form.resetFields();
        dispatch(clearPersonToEdit());
    };

    return (
        <div className="form-container">
            <Form form={form} onFinish={onFinish} layout="horizontal"wrapperCol={{ span: 16 }} className="custom-form">
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name='title' label={t('Title')} rules={[{ required: true }]}>
                            <Select placeholder={t('Select Title')}>
                                <Option value="mr">{t('Mr.')}</Option>
                                <Option value="mrs">{t('Mrs.')}</Option>
                                <Option value="ms">{t('Ms.')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name='firstname' label={t('Firstname')} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name='lastname' label={t('Lastname')} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name='birthday' label={t('Birthday')} rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} placeholder={t('yyyy/mm/dd')}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='nationality' label={t('Nationality')} rules={[{ required: true }]}>
                            <Select placeholder={t('Select Nationality')}>
                                <Option value="thai">Thai</Option>
                                <Option value="american">American</Option>
                                <Option value="french">French</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name='citizenID' label={t('CitizenID')}>
                            <Input type="tel" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name='gender' label={t('Gender')} rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="male">{t('Male')}</Radio>
                                <Radio value="female">{t('Female')}</Radio>
                                <Radio value="unsex">{t('Unsex')}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name='mobilePhone' label={t('Mobile Phone')} rules={[{ required: true }]}>
                            <Input addonBefore={
                                <Select defaultValue="+66" style={{ width: 100, backgroundColor: 'white'}}>
                                    <Option value="+66"><Flag country="TH" style={{ marginRight: 8, width: 15, height: 15 }} /> +66</Option>
                                    <Option value="+1"><Flag country="US" style={{ marginRight: 8, width: 15, height: 15 }} /> +1</Option>
                                    <Option value="+33"><Flag country="FR" style={{ marginRight: 8, width: 15, height: 15 }} />+33</Option>
                                </Select>
                            } />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name='passportNo' label={t('Passport No')}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="form-row-end">
                    <Col span={12}>
                        <Form.Item name='expectedSalary' label={t('Expected Salary')} rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12} className="form-actions">
                        <Form.Item>
                            <Button type="default" onClick={handleReset} style={{ bottom: '8px', fontWeight: 'bold' }}>
                                {t('Reset')}
                            </Button>
                            <Button type="default" htmlType="submit" style={{ bottom: '8px', fontWeight: 'bold' }}>
                                {t('Submit')}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default PersonForm;
