import Form from "../../Components/Form";
import Logo from "../../Components/LogoSVG";
//import styles from "../../CSS/Home.module.css
import styles from "../../CSS/Logo.module.css";

export default function Home() {
  return (
    <div className="body">
      <div className={styles.logo}>
      <Logo />
      </div>
      
      <Form />
    </div>
  );
}


// export default function Home() {
//   return (
//     <div className={styles.home}}>
//       <div className={styles.logo}>
//       <Logo />
//       </div>
      
//       <Form />
//     </div>
//   );
// }
