import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FavouritesPage, HomePage } from './pages';
import { Navigation } from './components';

export const App: FC = () => {
  return (
    <>
    <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
};
