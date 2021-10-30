import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, List } from 'antd';
import CustomPageHeader from "../components/CustomPageHeader";
import { getQuestionsDetails, voteOnChoices } from '../apis/api';


const calculateVotePercentage = (votes: number, totalNumOfVotes: number) => {
  if (totalNumOfVotes === 0) {
    return '0 %';
  } else {
    return `${(votes / totalNumOfVotes * 100).toFixed(2)}%`;
  }
}

const Questions = () => {
  const location = useLocation();
  const history = useHistory();
  const [questionDetail, setQuestionDetail] = useState({} as any);
  const [votedChoiceUrl, setVotedChoiceUrl] = useState('');
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);

  const extractQuestionNumber = location.pathname.match(/\d+/);
  const questionNumber = extractQuestionNumber && extractQuestionNumber[0];
  const fetchQuestionDetail = async() => {
    const response = questionNumber && await getQuestionsDetails(questionNumber);
    if(response){
      setQuestionDetail(response.data)
      const sumOfVotes = response.data.choices.reduce((prev:any, next:any) =>  {
        return prev + next.votes 
      }, 0)
      setTotalNumOfVotes(sumOfVotes);
    }
   }

  const saveVotes = async() => {
    await voteOnChoices(votedChoiceUrl);
    fetchQuestionDetail();
    setVotedChoiceUrl('');
  }

  const voteHandler = async(url: string) => {
    setVotedChoiceUrl(url);
  }

  useEffect(() => {
    questionNumber && fetchQuestionDetail();
    // eslint-disable-next-line
  },[questionNumber, JSON.stringify(questionDetail.choices)])



  return (
    <>
      <CustomPageHeader
        title="Questions Detail"
        subtitle="this is the page for the question detail"
        onClickAction={() => history.push('/questions')}
      />
      <div className='page-content'>
        {
          questionDetail &&
          <>
            <h1>
              Question: {questionDetail.question}
            </h1>
            <List
              dataSource={questionDetail.choices}
              renderItem={(item: any) => {
                return (
                  <List.Item key={item.url}>
                    <List.Item.Meta
                      title={item.choice}
                    />
                       
                    <div className='vote-count-col'>
                      Votes: {item.votes} / {calculateVotePercentage(item.votes, totalNumOfVotes)}

                    </div>
        
                    <Button className='vote-button' type="primary" disabled={!!votedChoiceUrl} onClick={() => voteHandler(item.url)}>Vote</Button>
               
                  </List.Item>
                )
              }}
            />
            <Button type="primary" className='save-vote-button' disabled={!votedChoiceUrl} onClick={() => saveVotes()}>Save Vote</Button>
          </>
        }
      </div>
    
    </>
  )
}

export default Questions;