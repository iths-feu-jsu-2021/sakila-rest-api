import { query } from './db';
import { TActor } from '../types/typesActor';

export const getActors = async (): Promise<TActor[]> => {
    const response = await query('SELECT * FROM actor LIMIT 100');
    return response.rows;
}

export const getActorById = async (actorId: number): Promise<TActor> => {
    const response = await query('SELECT * FROM actor WHERE actor_id = $1', [ actorId ]);
    return response.rows.length ? response.rows[0] : null;
}

export const insertActor = async (actor:TActor) => {
    const createdActor = await query('INSERT INTO actor(first_name, last_name, last_update) VALUES($1, $2, current_timestamp) RETURNING *', [ actor.firstname, actor.lastname]);
    return createdActor.rows[0];
}

export const updateActor = async (actorId:number, actor:TActor) => {
    await query('UPDATE actor SET first_name=$1, last_name=$2, last_update=current_timestamp WHERE actor_id=$3 RETURNING *',[ actor.firstname, actor.lastname, actorId ]);
    return await getActorById(actorId);
}

export const deleteActor = async (actorId:number) => {
    return await query('DELETE FROM actor WHERE actor_id=$1', [ actorId ]);
}

// Tested on Insomnia