export default function MessagesFromMe({messages, user}){

    return <>
    <h2 style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>Messages From Me:</h2>
        {
            messages.map(message => (message.fromUser.username===user) ? (<div>
                <div key={message._id}>
                <h3>(Sent By Me)</h3>
                <h4>Post: {message.post.title}</h4>
                <p>{message.content}</p>
                </div>
            </div>
            ) : <div></div>)
        }
    </>
    
}