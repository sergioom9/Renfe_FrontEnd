import styles from "../assets/News.module.css";

type News = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};

type NewsProps = {
  item: News;
};

const NewsCard = ({ item }: NewsProps) => {
  const handleClick = () => {
    globalThis.location.href = `/news/${item.newid}`;
  }

  return (
    <div
      key={item.newid}
      className={styles.liquidglass2}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={item.image} alt={item.title} className={styles.newsImage} />
      <div>
        <h2 className={styles.sectionTitle}>{item.title}</h2>
        <p className={styles.sectionText}>{item.content}</p>
        <p>{item.date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
