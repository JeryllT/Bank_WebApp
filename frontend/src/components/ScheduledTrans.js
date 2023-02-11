import ListGroup from 'react-bootstrap/ListGroup';


const ScheduledTrans = ({ receivingBoolean, transactionId, senderReceiverID, senderReceiverName, date, amt, comment }) => {

    const formattedDate = new Date(date)
      .toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit"})
    return (
        <ListGroup.Item>
            <div style={{fontWeight: "bold"}}>Transaction ID: </div>
            <div style={{marginLeft: "1rem"}}>{transactionId}</div>
            <div style={{fontWeight: "bold"}}>{ receivingBoolean ? "Sent By:" : "Received By: "}</div>
            <div style={{marginLeft: "1rem"}}>{`${senderReceiverID} (${senderReceiverName})`}</div>
            <div style={{fontWeight: "bold"}}>Date: </div>
            <div style={{marginLeft: "1rem"}}>{formattedDate}</div>
            <div style={{fontWeight: "bold"}}>Comment: </div>
            <div style={{marginLeft: "1rem"}}>{comment}</div>
            <div style={{textAlign:"right", fontWeight: "bold"}}>${amt}</div>
        </ListGroup.Item>
    );
}

export default ScheduledTrans