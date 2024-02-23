import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const username = 'ph335579';
const password = 'Harsh@213';

// const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.0obpanm.mongodb.net/DesignENG?retryWrites=true&w=majority`;

const uri= process.env.MONGO_URI ;
async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

export default connectDB;
