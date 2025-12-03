export default function IndexButton() {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    globalThis.location.href = "/tickets";
  };

  return (
    <button onClick={handleClick} className="buybutton">
      🎟️ Comprar
    </button>
  );
}
