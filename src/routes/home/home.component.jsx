import { useState } from 'react';
import data from '../../data.json';
import Card from './Card';

const Home = () => {
  const [category, setCategory] = useState(data.category);
  return (
    <header className='flex flex-wrap justify-evenly gap-y-3 gap-x-8 '>
      {category.map((elemnt) => (
        <Card key={elemnt.id} {...elemnt} />
      ))}
    </header>
  );
};

export default Home;
