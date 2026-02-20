import { useEffect, useState } from "react";

export function ZeldaCardsIA() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures")
      .then((response) => response.json())
      .then((result) => {
        setData(result.data); // la API regresa { data: [...] }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div style={styles.container}>
      {data.slice(0, 12).map((item) => (
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.name} style={styles.image} />
          <h3>{item.name}</h3>
          <p>{item.description?.slice(0, 100)}...</p>
          <small>{item.category}</small>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "#000",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};

