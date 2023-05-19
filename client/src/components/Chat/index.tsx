import { ChatForm } from './ChatForm';
import { ReactComponent as File } from '../../assets/images/file.svg'
import { ReactComponent as Send } from '../../assets/images/send.svg'
import './style.scss'
import { useEffect, useRef, useState } from 'react';
import { socket } from '../../api/socket';

interface ChatI {
    isOpen: boolean;
    toggle: Function
}

export const Chat: React.FC<ChatI> = (props: ChatI): JSX.Element => {
    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const [messages, setMessages] = useState<any>([
        { text: 'This is message from admin', name: 'admin', time: '9:10' },
        { text: 'This is message from admin', name: 'admin', time: '9:11' },
        { text: 'This is message from you', name: 'Dan', time: '10:16', usdot: localStorage.getItem('usdot') },
        { text: 'This is message from you', name: 'Dan', time: '10:17', usdot: localStorage.getItem('usdot') },
    ]) //message type
    const [message, setMessage] = useState<string>("")
    const [img, setImg] = useState<File | null>(null)
    const lastMessageRef = useRef<any>(null);

    // useEffect(() => {
    //     // socket.on("messageResponse", data => setMessages([...messages, data]))
    // }, [socket, messages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (localStorage.getItem('usdot')) {
            setChatOpen(true)
        }
    }, [])

    const open = () => {
        setChatOpen(true)
    }

    // console.log(img);


    const handleSendMessage = () => {
        // if (message.trim() && localStorage.getItem("name")) {
        //     socket.emit("message",
        //         {
        //             text: message,
        //             name: localStorage.getItem("name"),
        //             id: `${socket.id}${Math.random()}`,
        //             socketID: socket.id
        //         }
        //     )
        // }

        if (message)
            setMessages([...messages, { text: message, name: localStorage.getItem("name"), time: `${new Date().getHours()}:${new Date().getMinutes()}` }])
        setMessage("")
    }

    return (<div className={props.isOpen ? "chat is-open" : "chat"}>
        <div className="chat__header">
            <h1>Live Chat</h1>
            <button onClick={() => props.toggle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 2.79083L21.2092 0L12 9.20917L2.79083 0L0 2.79083L9.20917 12L0 21.2092L2.79083 24L12 14.7908L21.2092 24L24 21.2092L14.7908 12L24 2.79083Z" fill="#39979C"></path></svg>
            </button>
        </div>
        {chatOpen ?
            <>
                <div className='chat__content'>
                    {messages.map((mes: any, i: number) => {
                        return <div className={mes.usdot === localStorage.getItem('usdot') ? 'message-container my' : 'message-container'} key={i}>
                            <p>{mes.name} {mes.time}</p>
                            <div className='message'>{mes.text}</div>
                        </div>
                    })}
                    <div ref={lastMessageRef} />
                </div>
                <div className='chat__send'>
                    <div className='chat__send__cont'>
                        <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
                        <div>
                            <File />
                            <input type="file" onChange={(e: any) => setImg(e.target.files[0])} />
                            <Send className='send' onClick={handleSendMessage} />
                        </div>
                    </div>
                </div>
            </>
            :
            <div className='chat__form'>
                <ChatForm open={open} />
            </div>
        }

    </div>)
}