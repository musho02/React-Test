import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ButtonFC from  './pages/ButtonFC';
import { Layout, Button } from 'antd';
import 'antd/dist/reset.css'; // นำเข้า CSS รีเซ็ตจาก Ant Design

const { Header, Content } = Layout;

function App() {
  return (
    <ButtonFC/>
  )
}

export default App;
