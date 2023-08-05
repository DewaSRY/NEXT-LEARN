import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-gray-400 ">
        Hello world!
      </h1>
      <p>
        {" "}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
        voluptates veniam explicabo officiis temporibus fuga mollitia maiores
        minima dolore? Excepturi aut vitae quis, tempora nobis numquam ipsam
        quas amet veniam.
      </p>
    </>
  );
};

export default Home;
