import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    //const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      'mongodb+srv://vicky:Vicky321@cluster0.vuher.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups'); // collection name must be any not related to db name
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' }); // 201 is success status code
  }
};

export default handler();
