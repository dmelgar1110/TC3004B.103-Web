const pool = require("../db");
// Obtener todos las reservaciones
exports.getAllReservaciones = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservaciones ORDER BY created_at");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    res.status(500).json({ error: "Error al obtener las reservaciones" });
  }
};
// Obtener una reservacion por ID
exports.getReservacionById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservaciones WHERE reservation_id = $1", [
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
  const { sala_id, user_id, people, start_time, end_time, status } = req.body;
  // Validación básica
  if (!sala_id || !user_id || !people || !start_time || !end_time || !status) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO reservaciones (sala_id, user_id, people, start_time, end_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [sala_id, user_id, people, start_time, end_time, status],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear la reservacion:", error);
    res.status(500).json({ error: "Error al crear la reservacion" });
  }
};

// Actualizar una reservacion existente
exports.updateReservacion = async (req, res) => {
  const { sala_id, user_id, people, start_time, end_time, status } = req.body;
  const reservationId = req.params.id;
  // Validación básica
  if (!sala_id || !user_id || !people || !start_time || !end_time || !status) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    // Verificar si la reservacion existe
    const checkResult = await pool.query(
      "SELECT * FROM reservaciones WHERE reservation_id = $1",
      [reservationId],
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    // Actualizar la reservacion
    const updateResult = await pool.query(
      "UPDATE reservaciones SET sala_id = $1, user_id = $2, people = $3, start_time = $4, end_time = $5, status = $6 WHERE reservation_id = $7 RETURNING *",
      [sala_id, user_id, people, start_time, end_time, status, reservationId],
    );
    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error al actualizar la reservacion:", error);
    res.status(500).json({ error: "Error al actualizar la reservacion" });
  }
};
// Eliminar una reservacion
exports.deleteReservacion = async (req, res) => {
  const reservationId = req.params.id;
  try {
    // Verificar si la reservacion existe
    const checkResult = await pool.query(
      "SELECT * FROM reservaciones WHERE reservation_id = $1",
      [reservationId],
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Reservacion no encontrada" });
    }
    // Eliminar la reservacion
    await pool.query("DELETE FROM reservaciones WHERE reservation_id = $1", [reservationId]);
    res.json({ message: "Reservacion eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la reservacion:", error);
    res.status(500).json({ error: "Error al eliminar la reservacion" });
  }
};
