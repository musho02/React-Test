import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PersonForm from './components/forms/PersonForm';
import PersonTable from './components/tables/PersonTable';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonToEdit, clearPersonToEdit } from './redux/personEditSlice';
import './components/forms/PersonForm.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleMenuClick = (e) => {
    i18n.changeLanguage(e.key);
  };

  const menuItems = [
    { key: 'en', label: 'EN' },
    { key: 'th', label: 'ไทย' },
  ];

  return (
    <Dropdown
      overlay={<Menu onClick={handleMenuClick} items={menuItems} />}
      trigger={['click']}
    >
      <Button>
        {i18n.language === 'en' ? 'EN' : 'ไทย'} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const personToEdit = useSelector(state => state.personEdit);
  const { t } = useTranslation();
  const people = useSelector((state) => state.person);

  const handleEdit = (person) => {
    dispatch(setPersonToEdit(person));
  };

  const handleClear = () => {
    dispatch(clearPersonToEdit());
  };

  return (
    <div>
      <div className="header-container">
        {t('Form & Table')}
      <LanguageSwitcher /></div>
      
      <PersonForm personToEdit={personToEdit} onClear={handleClear}/>
      <PersonTable data={people} onEdit={handleEdit}/>
    </div>
  );
};

export default App;
