import UserFavorite from '../components/UserFavorite';
import UserProfile from '../components/UserProfile';

export default async function StaticPage() {
  return (
    <div className="grid grid-rows-2 items-start gap-4 py-8">
      <UserProfile />
      <UserFavorite />
    </div>
  );
}
