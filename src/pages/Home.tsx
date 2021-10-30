import React from 'react';
import { useHistory } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { Card } from "antd";
import { RightOutlined } from '@ant-design/icons';
const Home = () => {
  const history = useHistory();

  return (
    <>
      <CustomPageHeader
        title="Home"
        subtitle="this is the home page"
      />
      <div className='page-content home-page-content'>
        <Card hoverable onClick={() => history.push('/questions')} style={{ width: 300 }}>
          View Questions
          <RightOutlined />
        </Card>
        <Card hoverable onClick={() => history.push('/question/')} style={{ width: 300 }}>
          Create New Question
          <RightOutlined />
        </Card>

      </div>
    
    </>
  )
}

export default Home;