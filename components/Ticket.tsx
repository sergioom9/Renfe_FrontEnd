import styles from "../assets/Ticket.module.css";

type Ticket = {
    ticketid:string,
    userid?:string,
    origin:string,  
    destination:string,
    date:string,
    price:string,
    coinsGained?:string,
    vendido?:boolean
};

type TicketProp = {
  item: Ticket;
};

const TicketCard = ({ item }: TicketProp) => {
  const handleClick = () => {
    if(item.vendido != true){
      globalThis.location.href = `/tickets/${item.ticketid}`;
    }
  }
  
  return (
    <div
      key={item.ticketid}
      className={`${styles.liquidglass2} ${item.vendido ? styles.sold : ""}`}
      onClick={handleClick}
      style={{
        cursor: item.vendido ? "not-allowed" : "pointer",
        pointerEvents: item.vendido ? "none" : "auto",
        opacity: item.vendido ? 0.5 : 1,
        transition: "all 0.3s ease-in-out",
        position: "relative",
        overflow: "hidden", 
      }}
    >
      {item.vendido && (
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
          VENDIDO
        </div>
      )}
      
      <div style={{ 
        opacity: item.vendido ? 0.5 : 1,
        filter: item.vendido ? "blur(1px)" : "none",
        transition: "all 0.3s ease-in-out",
      }}>
        <h2 className={styles.sectionTitle}>
          {item.origin} ➡️ {item.destination}
        </h2>
        <p className={styles.sectionText}>
          📅 {item.date}
        </p>
        <p style="color: #44eb44;" className={styles.sectionText}>
          💰 {item.price} $
        </p>
      </div>
    </div>
  );
};

export default TicketCard;