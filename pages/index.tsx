import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

type Image = {
  url: string;
};
const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.button}>
        他のにゃんこも見る
      </button>
      <div>{loading || <img src={imageUrl} className={styles.img} />}</div>
    </div>
  );
};
export default IndexPage;

const fetchImage = async (): Promise<Image> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const images = await res.json();
  console.log(images);
  return images[0];
};
