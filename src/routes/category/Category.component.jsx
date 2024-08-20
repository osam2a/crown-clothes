import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { CategoryContext } from '../../context/Categories.context';

import ProductCard from '../../componet/product-card/Product-card.component';

const Category = () => {
  const { category } = useParams();
  const { categoryMap } = useContext(CategoryContext);
  const [products, setProducts] = useState(categoryMap[category]);

  useEffect(() => {
    setProducts(categoryMap[category]);
  }, [category, categoryMap]);

  return (
    <>
      <h1 className='text-3xl font-extrabold text-center uppercase my-3 mb-4'>
        {category}
      </h1>
      <div className='preview grid grid-cols-4 max-sm:grid-cols-1 gap-x-2 gap-y-1 '>
        {products &&
          products.map((product) => (
            <ProductCard props={product} key={product.id} />
          ))}
      </div>
    </>
  );
};

export default Category;
