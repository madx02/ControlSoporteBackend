const mongoose = require('mongoose');

const dbConnection = async()=> {
    try {
        const connectionString = 'mongodb+srv://admin:ugM9ut24I5Pp9TYj@cluster0.acjl2it.mongodb.net/DBControlSoporte?retryWrites=true&w=majority';

        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

// Export the connection
module.exports = dbConnection;