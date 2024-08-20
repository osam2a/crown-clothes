import { useContext, useState } from 'react';
import Card from './Card';
import { CategoryContext } from '../../context/Categories.context';
const Home = () => {
  const { categoryMap } = useContext(CategoryContext);
  const titles = Object.keys(categoryMap);
  const proudcts = titles.map((title) => {
    return { ...categoryMap[title][0], title: title };
  });
  console.log(`product`);

  console.log(proudcts);

  return (
    <header className='flex flex-wrap justify-evenly gap-y-3 gap-x-8 '>
      {proudcts.map((proudct, index) => {
        {
          return (
            <Card key={proudct.id} props={proudct} title={titles[index]} />
          );
        }
      })}
    </header>
  );
};

export default Home;
