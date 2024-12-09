import { Link } from 'react-router-dom';
import postPledge from '../api/post-pledge';
import ProjectPage from '../pages/ProjectPage';
import usePledge from '../hooks/use-pledge';


function PledgeCard({ pledgeData }) {
if (!pledgeData) 
    return <div>Invalid pledge data</div>; 

    const { amount, anonymous, supporter_username, comment } = pledgeData;

    return (
        <div className="pledge-card">
            <h3>  {/* Checks if anonymous = True */}
                {anonymous? 'Anonymous' : `${supporter_username}` || 'Supporter'}
            </h3>
            <p> {comment || 'No comment'} </p>
            <p>Amount: ${amount || '0'} </p>
            
        </div>
    );
}

export default PledgeCard;
