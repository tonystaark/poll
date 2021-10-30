import React, { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { getQuestions } from '../apis/api';
import { Card, Row, Col} from "antd";
import { currentDateToDt } from '../utils/util';
const Questions = () => {
  const history = useHistory();

  const [questionList, setQuestionList] = useState([]);
  
  useEffect(() => {
    const fetchQuestionList = async() => {
     const response = await getQuestions();
     setQuestionList(response.data)
    }
    fetchQuestionList();
  },[])

  return (
    <>
      <CustomPageHeader
        title="Questions"
        subtitle="this is the page for a list of questions"
        onClickAction={() => history.push('/')}
      />
      <Row gutter={[16, 16]}>

        {
          questionList.length > 0 && questionList.map( (q:any, idx) =>             
            <Col 
            key={idx}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}   
            >
              <Card hoverable className='question-card' title={q.question} onClick={() => history.push(`${q.url}`)}>
                <p>Published At: {currentDateToDt(q.published_at)}</p>
                <p># of Choices: {q.choices.length}</p>
              </Card>
            </Col>
          )
        }
      </Row>

    </>
  )
}

export default Questions;