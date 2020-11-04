import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next js App</title>
      </Head>
      <h3>Possible improvements</h3>
      <ul>
        <li>Adding state machine</li>
        <li>Moving translation to separates files</li>
        <li>Improving test code coverage</li>
      </ul>
    </>
  );
}
