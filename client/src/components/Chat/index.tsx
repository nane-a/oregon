import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, selectMessages, updateState } from '../../redux/slices/chatSlice';
import { AppDispatch } from '../../redux/store';
import { io } from 'socket.io-client';
import { ChatForm } from './ChatForm';
import { ReactComponent as File } from '../../assets/images/file.svg'
import { ReactComponent as Send } from '../../assets/images/send.svg'
import './style.scss'

interface ChatI {
    isOpen: boolean;
    toggle: Function
}

export const Chat: React.FC<ChatI> = (props: ChatI): JSX.Element => {
    const socket = io("http://localhost:5000");

    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const messages = useSelector(selectMessages)
    const [message, setMessage] = useState<string>("")
    const [img, setImg] = useState<File | null>(null)
    const lastMessageRef = useRef<any>(null);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        socket.on("receive_message", (data) => {
            dispatch(updateState(data));
        });
    }, [socket, messages]);

    const joinRoom = () => {
        if (localStorage.getItem('usdot') !== "") {
            socket.emit("join_room", localStorage.getItem('usdot'));
        }
    };

    useEffect(() => {
        joinRoom();
        const usdot = localStorage.getItem('usdot')
        if (usdot) dispatch(getMessages({ usdot }))
        return () => {
            socket.disconnect();
        };
    }, [localStorage.getItem('usdot')]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (localStorage.getItem('usdot') !== null) {
            setChatOpen(true)

        }
    }, [])

    const open = () => {
        setChatOpen(true)
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1
        }/${currentDate.getDate()}/${currentDate.getFullYear()}, ${currentDate.toLocaleTimeString()}`;

    const handleSendMessage = () => {
        if (message.length && localStorage.getItem("usdot")) {
            socket.emit("send_message",
                {
                    text: message,
                    room: localStorage.getItem('usdot'),
                    time: formattedDate,
                    from: localStorage.getItem('usdot'),
                    to: "admin"
                }
            )
        }
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
                    {messages?.data?.map((mes: any, i: number) => {
                        return <div className={mes.from === localStorage.getItem('usdot') ? 'message-container my' : 'message-container'} key={i}>
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