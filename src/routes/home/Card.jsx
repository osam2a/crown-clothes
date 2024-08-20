import { useNavigate } from 'react-router-dom';
import Button from '../../componet/button/Button.component';
const Card = ({ props }) => {
  const { id, name, imageUrl, title } = props;
  console.log(`props`);
  console.log(props);

  const navigate = useNavigate();
  const moveToCategory = () => navigate(`/shop/${title}`);
  return (
    <div
      onClick={moveToCategory}
      className={` bg-no-repeat bg-cover bg-center 
      min-w-[30%] max-w-xl h-60 flex grow shrink basis-1 items-center  justify-center border border-black overflow-hidden cursor-pointer `}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Button buttonType='inverted'>
        <h1 className='text-xl font-bold'>{title.toUpperCase()}</h1>
        <p>SHOP NOW</p>
      </Button>
    </div>
  );
};

export default Card;
