const mongoose = require("mongoose");

class database{

    //// contructor which accept a bool;
    constructor(){
        this.connected = false;
    }

    async connect(uri){
        //cheaking if a database is connected or not;
        if (this.connected) return ;
        try{
            // connecting with database via uri;
            await mongoose.connect(uri);
                
            
            /// toggle bool to true;
            this.connected = true;
            console.log("Database is connected succesfully!");
        }

        /// in case of error;
        catch(error){
            console.log(' MongoDB connection error:', err);
            process.exit(1);
        }
    }


    /// for disconnecting database;
    async disconnect(){
        //cheaking if a database is connected or not;
        //
        if (this.connected){
            /// toggle bool to true;
            this.connected=false;
            console.log('MongoDB disconnected');
            
        }
    }
}



module.exports = new database();


