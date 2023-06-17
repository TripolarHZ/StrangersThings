export default function MessagesToMe({messages, user}){

    return <>
     <h2 style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>Messages To Me:</h2>
        {
            messages.map(message => (message.fromUser.username===user) ? <div></div> : (<div>
                <div key={message._id}>
                <h3>From: {message.fromUser.username}</h3>
                <h4>Post: {message.post.title}</h4>
                <p>{message.content}</p>
                </div>
            </div>
            ))
        }
    </>
    
}