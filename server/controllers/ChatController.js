const { Op } = require("sequelize")
const { Chat } = require("../models")

class ChatController {
    sendMessage = async (req, res) => {
        try {
            await Chat.create(req.body)
            res.status(200).send({
                success: true,
                data: null,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }

    getMessages = async (req, res) => {
        try {
            let chats = await Chat.findAll({
                where: {
                    new_messages: true,
                    from: {
                        [Op.ne]: 'admin'
                    }
                }, attributes: ["from", "text", "new_messages"]
            })

            let finalArray = Object.values(chats.reduce((acc, { from, text, new_messages }) => {
                if (!acc[from]) {
                    acc[from] = { from, last_message: text, new_messages_count: 1 };
                } else {
                    acc[from].last_message = text;
                    acc[from].new_messages_count += new_messages ? 1 : 0;
                }
                return acc;
            }, {}));

            res.status(200).send({
                success: true,
                data: finalArray,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }

    openChat = async (req, res) => {
        try {
            let chats = await Chat.findAll({
                where: {
                    [Op.or]: [
                        { from: req.body.usdot },
                        { to: req.body.usdot },
                    ]
                }
            })

            res.status(200).send({
                success: true,
                data: chats,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }
}

module.exports = new ChatController


