const pool = require("../db");
// Obtener todos las reservaciones
exports.getAllReservaciones = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservacion ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    res.status(500).json({ error: "Error al obtener las reservaciones" });
  }
};
// Obtener una reservacion por ID
exports.getReservacionById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservacion WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener la reservacion:", error);
    res.status(500).json({ error: "Error al obtener la reservacion" });
  }
};
// Crear un nueva reservacion
exports.createReservacion = async (req, res) => {
  const { name, capital, currency } = req.body;
  // Validación básica
  if (!name) {
    return res.status(400).json({ error: "El nombre de la reservacion es obligatorio" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO reservacion (name, capital, currency) VALUES ($1, $2, $3) RETURNING *",
      [name, capital, currency],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear la reservacion:", error);
    res.status(500).json({ error: "Error al crear la reservacion" });
  }
};

// Actualizar una reservacion existente
exports.updateReservacion = async (req, res) => {
  const { name, capital, currency } = req.body;
  const countryId = req.params.id;
  // Validación básica
  if (!name) {
    return res.status(400).json({ error: "El nombre de la reservacion es obligatorio" });
  }
  try {
    // Verificar si la reservacion existe
    const checkResult = await pool.query(
      "SELECT * FROM reservacion WHERE id = $1",
      [countryId],
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    // Actualizar la reservacion
    const updateResult = await pool.query(
      "UPDATE reservacion SET name = $1, capital = $2, currency = $3 WHERE id = $4 RETURNING *",
      [name, capital, currency, countryId],
    );
    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error al actualizar la reservacion:", error);
    res.status(500).json({ error: "Error al actualizar la reservacion" });
  }
};
// Eliminar una reservacion
exports.deleteReservacion = async (req, res) => {
  const countryId = req.params.id;
  try {
    // Verificar si la reservacion existe
    const checkResult = await pool.query(
      "SELECT * FROM reservacion WHERE id = $1",
      [countryId],
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    // Eliminar la reservacion
    await pool.query("DELETE FROM reservacion WHERE id = $1", [countryId]);
    res.json({ message: "Reservacion eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la reservacion:", error);
    res.status(500).json({ error: "Error al eliminar la reservacion" });
  }
};
