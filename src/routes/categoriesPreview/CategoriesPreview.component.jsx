import React from 'react';
import { useContext } from 'react';
import { CategoryContext } from '../../context/Categories.context';
import CategoryPreview from '../../componet/categoryPreview/categoryPreview.component';
const CategoriesPreview = () => {
  const { categoryMap } = useContext(CategoryContext);
  const titles = Object.keys(categoryMap);

  return titles.map((title) => {
    const products = categoryMap[title];
    return (
      <div key={title} id={title}>
        <div>
          <CategoryPreview key={title} title={title} products={products} />
        </div>
      </div>
    );
  });
};

export default CategoriesPreview;
