import useStyles from "./styles";

const Card = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <h1>Card</h1>
    </div>
  );
};

export default Card;
