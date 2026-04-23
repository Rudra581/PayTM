import { Pool } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: "postgres://24c2dbb0c92fdeb4eb4763e27f0b4d13aa560dc75cef6c83eacf22d50143d795:sk_uYx4pgFumjeHR4m3YkLKJ@db.prisma.io:5432/postgres?sslmode=require&pool=true",
  ssl: { rejectUnauthorized: false }
});

app.post("/hdfcWebhook", async (req, res) => {
  const { token, userId, amount } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const txn = await client.query(
      `SELECT status FROM "OnRampTransaction" WHERE token = $1 FOR UPDATE`,
      [token]
    );

    if (txn.rowCount === 0) {
      throw new Error("Invalid token");
    }

    if (txn.rows[0].status === "Success") {
      await client.query("COMMIT");
      return res.json({ message: "Already captured" });
    }

    await client.query(
      `UPDATE "Balance" SET amount = amount + $1 WHERE "userId" = $2`,
      [amount * 100, userId]
    );

    await client.query(
      `UPDATE "OnRampTransaction" SET status = 'Success' WHERE token = $1`,
      [token]
    );

    await client.query("COMMIT");
    res.json({ message: "Captured" });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Webhook error:", err);
    res.status(500).json({ message: "Webhook failed" });
  } finally {
    client.release();
  }
});

app.listen(3003, () => {
  console.log("Webhook server running on 3003");
});
