import { Link } from 'react-router-dom';
import ProductCard from '../product-card/Product-card.component';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2 className='mt-3 text-2xl font-extrabold'>
        <Link className={title} to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview grid grid-cols-4 max-sm:grid-cols-1 gap-x-2 gap-y-1 '>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard props={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
