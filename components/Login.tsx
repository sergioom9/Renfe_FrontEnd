import { useState } from "preact/hooks";
import styles from "../assets/Login.module.css";
import AlertIsland from "../islands/Alert.tsx";
import { alertVisible } from "../signals.ts";

type Message = {
  message:string,
  visible:boolean
}


const LoginPage=()=> {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [msg, setMsg] = useState<Message>({message:"", visible:false});
  
  async function handleLogin (e: Event){
    e.preventDefault();
    const bodyData = { email: email, password: password };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg({message:"✅ Login correcto",visible:true});
      alertVisible.value = true;
    } else {
      setMsg({message:`❌ ${data.error}`, visible:true});
      alertVisible.value = true;
    }
}


  return (
    <div className={styles.container}>
      <div className={styles.glassBox}>
        <h1 className={styles.title}>Login</h1>
       {msg.visible && (
        <AlertIsland message={msg.message} error={!msg.message.toLowerCase().includes("✅")}/>
    )}
        <form onSubmit={handleLogin} className={styles.form} action="javascript:void(0)">
          
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
              type="password"
              placeholder="Password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>🔒</span>
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe((e.target as HTMLInputElement).checked)}
              />
              Remember me
            </label>
            <a href="#" className={styles.link}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.register}>
          Don't have an account? <a href="/register" className={styles.registerLink}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;