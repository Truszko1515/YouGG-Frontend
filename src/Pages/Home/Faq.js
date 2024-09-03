import styles from "../../CSS/Faq.module.css";

export default function Faq() {
  return (
    <div className="body">
      <h3>FAQ</h3>

      <div className="question">
        <p className="paragraph"><strong>Czym jest YouGG?</strong></p>
        <p className="paragraph">YouGG jest platformą dedykowaną dla graczy League of Legends. Możesz tu zobaczyć szczegółowe analizy. Możesz również sprawdzić historię swoich meczów. Znajdziesz tu również wykaz bohaterów których najczęściej wybierasz podczas potyczek na Summoner's Rift</p>
      </div>

      <div className="question">
        <p className="paragraph"><strong>Czy muszę mieć konto aby korzystać z usług YouGG?</strong></p>
        <p className="paragraph">Aby korzystać z funkcji YouGG musisz być zalogowany na swoje konto!</p>
      </div>

      <div className="question">
        <p className="paragraph"><strong>Czy YouGG jest zgodne z zasadami firmy Riot Games i jest bezpieczne w użyciu?</strong></p>
        <p className="paragraph">Tak, YouGG jest zgodne z zasadami Riot Games. Strona wykorzystuje publiczne API twórców gry aby dostarczać szczegółowe analizy i przedstawiać historię poczynań graczy.</p>
      </div>

    </div>
  )
}

/* export default function Faq() {
  return (
    <div className={styles.faqContainer}>
      <h3>Frequently Asked Questions</h3>

      <div className={styles.question}>
        <p><strong>Lorem ipsum dolor sit amet.</strong></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, recusandae doloribus qui molestias similique asperiores incidunt. Obcaecati tenetur consectetur dolorem eius ex, ad, laudantium inventore quia odio minus eligendi ipsa?</p>
      </div>

      <div className={styles.question}>
        <p><strong>Lorem ipsum dolor sit amet.</strong></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, recusandae doloribus qui molestias similique asperiores incidunt. Obcaecati tenetur consectetur dolorem eius ex, ad, laudantium inventore quia odio minus eligendi ipsa?</p>
      </div>

      <div className={styles.question}>
        <p><strong>Lorem ipsum dolor sit amet.</strong></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, recusandae doloribus qui molestias similique asperiores incidunt. Obcaecati tenetur consectetur dolorem eius ex, ad, laudantium inventore quia odio minus eligendi ipsa?</p>
      </div>

      <div className={styles.question}>
        <p><strong>Lorem ipsum dolor sit amet.</strong></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, recusandae doloribus qui molestias similique asperiores incidunt. Obcaecati tenetur consectetur dolorem eius ex, ad, laudantium inventore quia odio minus eligendi ipsa?</p>
      </div>

      <div className={styles.question}>
        <p><strong>Lorem ipsum dolor sit amet.</strong></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, recusandae doloribus qui molestias similique asperiores incidunt. Obcaecati tenetur consectetur dolorem eius ex, ad, laudantium inventore quia odio minus eligendi ipsa?</p>
      </div>
    </div>
  );
} */