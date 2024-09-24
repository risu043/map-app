import GoogleMap from './components/GoogleMap';

export default async function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <GoogleMap />
    </div>
  );
}
