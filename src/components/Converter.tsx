import React, { useState } from "react";

const Converter: React.FC = () => {
  const [hexColor, setHexColor] = useState<string>("");
  const [rgbColor, setRgbColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hexToRgb = (hex: string): string | null => {
    const regex = /^#([0-9A-Fa-f]{6})$/;
    const match = hex.match(regex);
    if (!match) return null;

    const r = parseInt(match[1].substring(0, 2), 16);
    const g = parseInt(match[1].substring(2, 4), 16);
    const b = parseInt(match[1].substring(4, 6), 16);

    return `RGB: (${r}, ${g}, ${b})`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexColor(value);

    if (value.length === 7) {
      const rgb = hexToRgb(value);
      if (rgb) {
        setRgbColor(rgb);
        setError(null);
      } else {
        setRgbColor(null);
        setError("Ошибка");
      }
    } else {
      setRgbColor(null);
      setError(null);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: hexColor.length === 7 ? hexColor : "white",
      }}
    >
      <h1>Конвертер HEX в RGB</h1>
      <input
        type="text"
        value={hexColor}
        onChange={handleChange}
        placeholder="Введите HEX цвет"
      />
      <div style={{ marginTop: "20px" }}>
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : (
          rgbColor && <span>{rgbColor}</span>
        )}
      </div>
    </div>
  );
};

export default Converter;
