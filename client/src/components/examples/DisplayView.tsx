import DisplayView from '../DisplayView';

export default function DisplayViewExample() {
  const bannedItems = ['Dead Hard', 'Barbecue & Chilli', 'Adrenaline'];

  return (
    <DisplayView
      category="killer-perks"
      bannedItems={bannedItems}
    />
  );
}
