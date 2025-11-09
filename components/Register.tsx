import { useState } from "preact/hooks";
import styles from "../assets/Register.module.css";
import AlertIsland from "../islands/Alert.tsx";
import { alertVisible2 } from "../signals.ts";

type Message = {
  message:string,
  visible:boolean
}

const RegisterPage = ()=> {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<Message>({message:"", visible:false});

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const bodyData = { userid:userid,email: email, password: password,name:name };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg({message:"✅ Registro correcto",visible:true});
      alertVisible2.value = true;
    } else {
      setMsg({message:`❌ ${data.error}`, visible:true});
      alertVisible2.value = true;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.glassBox}>
        <h1 className={styles.title}>Registro</h1>
        {msg.visible && alertVisible2.value && (
        <AlertIsland type={2} message={msg.message} error={!msg.message.toLowerCase().includes("✅")}/>
    )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>👤</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>✉️</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              value={userid}
              onInput={(e) => setUserid((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>🔍</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>🔒</span>
          </div>

          <button type="submit" className={styles.button}>
            Registro
          </button>
        </form>

        <p className={styles.register}>
          Ya tienes una cuenta?{" "}
          <a href="/login" className={styles.registerLink}>Iniciar Sesion</a>
        </p>
      </div>
    </div>
  );
}
export default RegisterPage;
