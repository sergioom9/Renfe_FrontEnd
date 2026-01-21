import styles from "../assets/Ticket.module.css";

type Ticket = {
    ticketid:string,
    origin:string,  
    destination:string,
    date:string,
    price:string,
    available:number,
};

type TicketCardProps = {
    item: Ticket;
};

const TicketCard = ({ item }: TicketCardProps) => {
  const handleClick = () => {
    if(item.available>0){
      globalThis.location.href = `/tickets/${btoa(item.ticketid)}`;
    }
  }
  
  return (
    <div
      className={`${styles.liquidglass2} ${item.available<1 ? styles.sold : ""}`}
      style={{
        cursor: item.available<1 ? "not-allowed" : "pointer",
        pointerEvents: item.available<1 ? "none" : "auto",
        opacity: item.available<1 ? 0.5 : 1,
        transition: "all 0.3s ease-in-out",
        position: "relative",
        overflow: "hidden", 
      }}
    >
      {item.available<1 && (
        <div style={{
          position: "absolute",
          top: "30px",
          right: "-35px",
          background: "linear-gradient(45deg, #dc2626, #ef4444)",
          color: "white",
          padding: "8px 50px",
          transform: "rotate(45deg)",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 10,
          letterSpacing: "1px",
        }}>
          LLENO
        </div>
      )}
      
      <div style={{ 
        opacity: item.available<1 ? 0.5 : 1,
        filter: item.available<1 ? "blur(1px)" : "none",
        transition: "all 0.3s ease-in-out",
      }}>
        <h2 className={styles.sectionTitle}>
          {item.origin} ➡️ {item.destination}
        </h2>
        <p className={styles.sectionText}>
          📅 {item.date}
        </p>
        <p style="color: #44eb44;" className={styles.sectionText}>
          💰 {item.price} €
        </p>
        <p style="color: #44eb44;" className={styles.sectionText}>
          Disponibles : {item.available} 
        </p>
        <button onClick={handleClick}>Comprar</button>
      </div>
    </div>
  );
};

export default TicketCard;
