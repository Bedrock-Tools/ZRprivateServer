export const prefix = '/api/profile';

async function routes(app) {
    app.get('/:friendCode', async (req, res) => {
        if (!req.query.userKey) {
            return {
                status: 'error',
                message: 'No such user exists.'
            };
        }
        const db = await app.mysql.getConnection();
        const [rows] = await db.execute('SELECT user_id FROM sessions WHERE `key` = ?', [req.query.userKey]);
        if (rows.length === 0) {
            db.release();
            return {
                status: 'error',
                message: 'No such user exists.'
            };
        }
        const [userRows] = await db.execute('SELECT * FROM users WHERE id = ? AND friend_code = ?', [rows[0].user_id, req.params.friendCode]);
        if (userRows.length === 0) {
            db.release();
            return {
                status: 'error',
                message: 'No user exists with the specified friend code.'
            };
        }
        const user = userRows[0];
        const name = user.friend_code.slice(0, -5);
        const response = {
            status: 'success',
            user: {
                name,
                friend_code: user.friend_code,
                avatar: user.avatar,
                level: user.level
            },
            stats: {
                all: {
                    Solo: {
                        name,
                        kills: 0,
                        kills_per_round: 0,
                        rounds: 0,
                        time_alive: 0,
                        top10: 0,
                        winrate: 0,
                        wins: 0
                    },
                    Duo: {
                        name,
                        kills: 0,
                        kills_per_round: 0,
                        rounds: 0,
                        time_alive: 0,
                        top10: 0,
                        winrate: 0,
                        wins: 0
                    },
                    Squad: {
                        name,
                        kills: 0,
                        kills_per_round: 0,
                        rounds: 0,
                        time_alive: 0,
                        top10: 0,
                        winrate: 0,
                        wins: 0
                    }
                }
            }
        };
        return response;
    });
}

export default routes;
