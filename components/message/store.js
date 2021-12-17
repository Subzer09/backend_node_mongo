const db = require('mongoose');
const Model = require('./model')

const uri = 'mongodb+srv://db_user_jim:3VGjDXuwQMtclii3@cluster0.pvgwd.mongodb.net/test?retryWrites=true&w=majority'

db.Promise = global.Promise;

db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'telegrom'
})

console.log('[db] conectada con exito');

function addMessage(message){
    // list.push(message)
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(){
    // return list
    const messages = await Model.find();
    return messages;
}

async function updateText(id, message){
    const foundMessage = await Model.findOneAndUpdate(
        {_id : id},
        {message},
        {new : true}
    )

    return foundMessage;

}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText
}