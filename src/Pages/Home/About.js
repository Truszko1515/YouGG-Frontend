import React from "react";
import styles from "../../CSS/About.module.css";

export default function About() {
  return (
    <div className="body">
      <h2>O nas!</h2>
        <p className="paragraph">Jesteśmy stroną która może zaoferować analizę statystyk i historię rozgrywek Właśnie Tobie!</p>
        <p className="paragraph">Nie wiesz co poprawić w swojej grze? Spójrz na wskaźnik KDA! </p>
        <p className="paragraph">Chcesz dowiedzieć się ile ostatnich gier to porażki bo chcesz zrobić sobie przerwę od gry? Spójrz na historię meczy!</p>
        <p className="paragraph">Interesuje cię ile zabijałeś przeciętnie stworów na minutę? Nie ma problemu, możesz sprawdzić to dla każdego rozegranego meczu!</p>
        <p className="paragraph">Wreszczie, chcesz poznać swój całkowity winrate? Własnie to możemy ci pokazać!</p>
        <p className="paragraph">U nas zobaczysz także jakimi bohaterami najczęściej grasz na przestrzenii wszystkich rozegranych meczy!</p>
      </div>
    )
  }

/* export default function About() {
  return (
    <div className={styles.about}>
      <h2>About Us</h2>
      <p className={styles.paragraph}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui provident
        consequuntur vel omnis quisquam rem harum, maxime expedita, ullam ut
        dolore! Distinctio eos minima voluptatum totam id hic! Sapiente debitis
        quia illum officia obcaecati provident nulla odio molestiae suscipit
        quasi.
      </p>
      <p className={styles.paragraph}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui provident
        consequuntur vel omnis quisquam rem harum, maxime expedita, ullam ut
        dolore! Distinctio eos minima voluptatum totam id hic! Sapiente debitis
        quia illum officia obcaecati provident nulla odio molestiae suscipit
        quasi.
      </p>
      <p className={styles.paragraph}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui provident
        consequuntur vel omnis quisquam rem harum, maxime expedita, ullam ut
        dolore! Distinctio eos minima voluptatum totam id hic! Sapiente debitis
        quia illum officia obcaecati provident nulla odio molestiae suscipit
        quasi.
      </p>
    </div>
  );
} */