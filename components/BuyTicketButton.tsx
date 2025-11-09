export default function BuyButton() {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    globalThis.location.href = "/buy";
  };

  return (
    <button onClick={handleClick} className="buybutton">
      🎟️ Buy ticket !
    </button>
  );
}