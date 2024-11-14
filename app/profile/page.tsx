import UserFavorite from '../components/UserFavorite';
import UserProfile from '../components/UserProfile';

export default async function StaticPage() {
  return (
    <div className="flex flex-col gap-4 py-8 px-4">
      <UserProfile />
      <UserFavorite />
    </div>
  );
}
