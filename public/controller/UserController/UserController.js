const pool = require("../../db");

const UserController = {

    async createUser(req, res) {
        const body = req.body;
        const { username, email, password } = body;
        const cliente = await pool.connect();    
        console.log(email);
        try{
            
            await cliente.query('BEGIN');

            const insertQuery = 'INSERT INTO users (username, email, password) VALUES($1,$2, $3) RETURNING id, username, email'
            const insertValues = [username, email, password];

            const rows = await cliente.query(insertQuery, insertValues);
            await cliente.query("COMMIT");
            console.log(rows);
            res.status(201).json({id: rows.rows[0].id, username: rows.rows[0].username, email: rows.rows[0].email});

        } catch(err) {
            await cliente.query("ROLLBACK");
            return res.status(400).json(err);
        } finally {
            cliente.release();
        }
    },

    async getUsers(_, res){
        const cliente = await pool.connect();    

        try{
            const {rows} = await cliente.query('SELECT * FROM users;');
            return res.status(200).json(selectQuery);
        } catch (err) {
            return res.status(400).json(err);
        } finally {
            cliente.release();
        }

    },

    async getUserById(req, res) {
        const { id } = req.params;
        const cliente = await pool.connect();
        try{
            const query = 'SELECT * FROM users WHERE id = $1'
            const values = [id];
            const {rows} = await pool.query(query, values);
            if (rows.length > 0) {
                res.status(200).json({rows});
            } else {
                res.sendStatus(404);
            }
        } catch (err){
            res.status(500).json(err);
        }
    }, 

    async atualizaUser(req, res) {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const cliente = await pool.connect();

        try{
            await cliente.query('BEGIN');
            const updateQuery = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4';
            const values = [username, email, password, id];
            await cliente.query(updateQuery, values);
            await cliente.query('COMMIT');
            res.sendStatus(204);
        } catch (err) {
            await cliente.query('ROLLBACK');
            console.log(err);
            res.sendStatus(500);
        }
    },

    async deleteUser(req, res) {
        const {id} = req.params;
        const cliente = pool.connect();

        try {
            (await cliente).query('BEGIN');
            deleteUserQuery = 'DELETE FROM users WHERE id = $1';
            const values = [id];
            (await cliente).query(deleteUserQuery, values)
            await cliente.query('COMMIT');
            res.sendStatus(245);

        } catch (err) {
            (await cliente).query('ROLLBACK');
            console.error(error);
            res.sendStatus(500);
        } finally {
            (await cliente).release();
    }
    }
}

module.exports =  UserController;