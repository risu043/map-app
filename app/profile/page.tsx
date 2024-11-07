import UserFavorite from '../components/UserFavorite';
import UserProfile from '../components/UserProfile';

export default async function StaticPage() {
  return (
    <>
      <UserProfile />
      <UserFavorite />
    </>
  );
}
