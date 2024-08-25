import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue="en"
      style={{ width: 60}}
      onChange={changeLanguage}
    >
      <Option value="th">TH</Option>
      <Option value="en">EN</Option>
    </Select>
  );
};

export default LanguageSwitcher;
