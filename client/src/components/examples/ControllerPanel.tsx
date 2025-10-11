import { useState } from 'react';
import ControllerPanel from '../ControllerPanel';

export default function ControllerPanelExample() {
  const [bannedItems, setBannedItems] = useState<string[]>(['Dead Hard', 'Barbecue & Chilli']);
  
  const items = [
    'Dead Hard', 'Barbecue & Chilli', 'Adrenaline', 'Sprint Burst',
    'Pop Goes the Weasel', 'Borrowed Time', 'Decisive Strike'
  ];

  const handleToggleBan = (item: string) => {
    setBannedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <ControllerPanel
      category="killer-perks"
      items={items}
      bannedItems={bannedItems}
      onToggleBan={handleToggleBan}
      onResetAll={() => setBannedItems([])}
    />
  );
}
