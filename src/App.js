import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [choice, setChoice] = useState(null);
  const [dice, setDice] = useState([null, null]);
  const [message, setMessage] = useState("");
  const [animClass, setAnimClass] = useState("");
  const [diceAnim, setDiceAnim] = useState(false);
  const [popup, setPopup] = useState(null);
  const [moneyAnim, setMoneyAnim] = useState("");

  const betAmounts = [10, 50, 100, 200, 500];

  const playGame = () => {
    if (!choice) {
      setMessage("❗ Hãy chọn CHẴN hoặc LẺ!");
      return;
    }
    if (bet <= 0) {
      setMessage("❗ Hãy chọn tiền cược!");
      return;
    }

    // bật hiệu ứng xúc xắc
    setDiceAnim(true);
    setTimeout(() => setDiceAnim(false), 600);

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDice([d1, d2]);

      const sum = d1 + d2;
      const result = sum % 2 === 0 ? "even" : "odd";

      if (result === choice) {
        const win = bet * 2;
        setBalance(balance + win);

        setMessage(`🎉 Thắng! Tổng = ${sum} | +${win}`);
        setAnimClass("win-effect");

        // popup
        setPopup({ type: "win", amount: win });
        setTimeout(() => setPopup(null), 1400);

        // tiền bay lên
        setMoneyAnim("money-up");
        setTimeout(() => setMoneyAnim(""), 900);

        setTimeout(() => setAnimClass(""), 500);
      } else {
        setBalance(balance - bet);

        setMessage(`❌ Thua! Tổng = ${sum} | -${bet}`);
        setAnimClass("lose-effect");

        // popup
        setPopup({ type: "lose", amount: bet });
        setTimeout(() => setPopup(null), 1400);

        // tiền rơi xuống
        setMoneyAnim("money-down");
        setTimeout(() => setMoneyAnim(""), 900);

        setTimeout(() => setAnimClass(""), 500);
      }

      setBet(0);
    }, 300);
  };

  return (
    <>
      <div className={`wrapper ${animClass}`}>
        <h1 className="title">🎲 Game Chẵn Lẻ Xúc Xắc</h1>

        <div className="balance">
          💰 Số dư:
          <strong className={`money-amount ${moneyAnim}`}>{balance}</strong>
        </div>

        <p className="current-bet">
          Tiền cược: <strong>{bet}</strong>
        </p>

        {/* Bet Buttons */}
        <div className="bet-buttons">
          {betAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => amount <= balance && setBet(amount)}
              className={`bet-btn ${bet === amount ? "active" : ""}`}
            >
              {amount}
            </button>
          ))}
          <button className="bet-btn allin" onClick={() => setBet(balance)}>
            ALL-IN
          </button>
        </div>

        {/* Choice Buttons */}
        <div className="choice-box">
          <button
            className={`choice-btn ${choice === "even" ? "active" : ""}`}
            onClick={() => setChoice("even")}
          >
            CHẴN
          </button>

          <button
            className={`choice-btn ${choice === "odd" ? "active" : ""}`}
            onClick={() => setChoice("odd")}
          >
            LẺ
          </button>
        </div>

        {/* Dice */}
        <div className="dice-area">
          <div className={`dice ${diceAnim ? "dice-shake" : ""}`}>
            {dice[0] ?? "-"}
          </div>
          <div className={`dice ${diceAnim ? "dice-shake" : ""}`}>
            {dice[1] ?? "-"}
          </div>
        </div>

        <button className="play-btn" onClick={playGame}>
          ĐỔ XÚC XẮC
        </button>

        <p className="message">{message}</p>
      </div>

      {/* POPUP */}
      {popup && (
        <div className={`popup ${popup.type}`}>
          {popup.type === "win" ? `🎉 +${popup.amount}` : `💥 -${popup.amount}`}
        </div>
      )}
    </>
  );
}

export default App;
