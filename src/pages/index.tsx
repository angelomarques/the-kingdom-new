import type { NextPage } from 'next';
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { ComponentType } from 'react';
import Home from '../views/Home';

const HomePage: NextPage = () => {
  return <Home />;
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(HomePage as ComponentType<unknown>);
