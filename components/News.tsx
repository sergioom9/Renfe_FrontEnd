import styles from "../assets/News.module.css";
import Loading from "./Loading.tsx";
import NewsCard from "./New.tsx";

type News = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};

interface NewsProps {
  news: News[];
}

const NewsPage = ({ news }: NewsProps) => {
  return (
    <>
      {news?.length > 0 ? (
        <div className={styles.maincontent}>
          <div className={styles.liquidglass2}>
            <h1>NOTICIAS</h1>
          </div>
          {news.map((item: News) => (
            <NewsCard key={item.newid} item={item} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default NewsPage;