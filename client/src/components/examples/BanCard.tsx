import BanCard from '../BanCard';

export default function BanCardExample() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <BanCard name="Barbecue & Chilli" />
      <BanCard name="Dead Hard" isBanned={true} />
      <BanCard name="Haddonfield" showControls={true} onToggleBan={() => console.log('Toggle ban')} />
    </div>
  );
}
