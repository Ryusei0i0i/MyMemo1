import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { Pool } from 'pg'


const app = express()
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
})
app.use(express.json())
app.use(express.static('public'))

//Root
app.get('/', (req, res) => {
    res.json({ message: 'OK!' })
})

app.get('/memos', async (req, res) => {
    const result = await pool.query('select * from memos;')
    const memos = result.rows

    res.json(memos);
})

app.post('/memos', async (req, res) => {
    const {title, content} = req.body
    await pool.query('insert into memos (title, content) values ($1, $2);', [title, content])
    res.json({messae: 'POST!'})
})

app.put('/memos/:id', async (req, res) => {
    const { title, content } = req.body
    const id = Number(req.params.id)
    const result = await pool.query(`update memos set title = $1, content = $2, updated_at = NOW() where id = $3;`, [title, content, id])
    res.json({message: 'UPDATE!'})
})

app.delete('/memos/:id', async (req, res) => {
    const id = req.params.id
    await pool.query(`delete from memos where id = $1`, [id])
    res.json({message:'DELETE!'})
})

//Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})