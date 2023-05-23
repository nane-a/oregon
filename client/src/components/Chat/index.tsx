import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, selectIsLoading, selectMessages, updateState } from '../../redux/slices/chatSlice';
import { AppDispatch } from '../../redux/store';
import { useEnter } from '../../setup/hooks/enter';
import { io } from 'socket.io-client';
import { ChatForm } from './ChatForm';
import { ReactComponent as Send } from '../../assets/images/send.svg'
import { ReactComponent as Close } from '../../assets/images/delete.svg'
import { ChatSceleton } from '../ChatSkeleton';
import './style.scss'

interface ChatI {
    isOpen: boolean;
    toggle: Function
}

export const Chat: React.FC<ChatI> = ({ isOpen, toggle }: ChatI): JSX.Element => {
    const socket = io("http://localhost:5000");
    const dispatch = useDispatch<AppDispatch>()

    const messages = useSelector(selectMessages)
    const isLoading = useSelector(selectIsLoading)
    const lastMessageRef = useRef<any>(null);
    const usdot = localStorage.getItem('usdot')

    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        socket.on("receive_message", (data) => {
            dispatch(updateState(data));
        });
    }, [socket, messages]);

    const joinRoom = () => {
        if (usdot !== "") {
            socket.emit("join_room", usdot);
        }
    };

    useEffect(() => {
        if (isOpen && usdot) {
            dispatch(getMessages({ usdot }))
            joinRoom();
        } else {
            socket.disconnect();
        }
        return () => {
            socket.disconnect()
        }
    }, [usdot, isOpen]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (usdot !== null) {
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
                    room: usdot,
                    time: formattedDate,
                    from: usdot,
                    to: "admin"
                }
            )
        }
        setMessage("")
    }

    useEnter(handleSendMessage, isOpen)

    return (<div className={isOpen ? "chat is-open" : "chat"}>

        <div className="chat__header">
            <div className='chat__header__group'>
                <h1>Live Chat</h1>
                {usdot !== '' && <p>{usdot}</p>}
            </div>
            <button onClick={() => toggle()}>
                <Close />
            </button>
        </div>
        {chatOpen ?
            <>
                <div className='chat__content'>
                    {isLoading && <>
                        {[1, 2, 3, 4, 5].map((e) => {
                            return <ChatSceleton key={e} />
                        })}
                    </>}
                    {messages?.data?.map((mes: any, i: number) => {
                        return <div className={mes.from === usdot ? 'message-container my' : 'message-container'} key={i}>
                            <p>{mes.name} {mes.time}</p>
                            <div className='message'>{mes.text}</div>
                        </div>
                    })}
                    <div ref={lastMessageRef} />
                </div>
                <div className='chat__send'>
                    <div className='chat__send__cont'>
                        <textarea placeholder='Type a message here...' value={message} onChange={e => setMessage(e.target.value)}></textarea>
                        <div>
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