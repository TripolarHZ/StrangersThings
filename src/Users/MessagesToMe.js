export default function MessagesToMe({ messages, user }) {

    return <>
        <h2 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: "40px"  }}>Messages To Me:</h2>
        {
            messages.map(message => (message.fromUser.username === user) ? <div></div> : (<div>
                <div className="message" key={message._id}>
                    <h3 style={{fontSize:"30px"}}>From: {message.fromUser.username}</h3>
                    <h4 style={{color:"blue",fontSize:"20px"}}>Post: {message.post.title}</h4>
                    <p>{message.content}</p>
                </div>
            </div>
            ))
        }
    </>

}