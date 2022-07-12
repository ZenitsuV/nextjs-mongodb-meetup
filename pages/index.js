import Head from 'next/head';
import { MongoClient } from 'mongodb;';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react;';

const HomePage = (props) => {
  return;
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name="description"
        content="Browse a huge list of highly active React meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>;
};

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://vicky:Vicky321@cluster0.vuher.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups'); // collection name must be any not related to db name

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(), // _id is a mongodb data entry id which is a object. so we need to convert it to string
      })),
    },
    revalidate: 10, // regenerate the page for every 10 sec
  };
}

export default HomePage;
