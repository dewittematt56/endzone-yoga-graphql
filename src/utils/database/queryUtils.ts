import dbPool from './connectionUtils'
import { GraphQLError } from 'graphql'

/**
 * Execute a Normal Select Query on the database by acquiring a Connection from the pool  
 * @date 3/23/2024 - 11:50:47 PM
 *
 * @export
 * @async
 * @param {String[]} requestedColumns Columns to Select in Clause
 * @param {string} table Schema.TableName to Select public."Formation"
 * @param {Record<string, any>} filtersDict Args send from GraphQL
 * @returns {Promise<Record<string, any>>} Records returned from query
 */
export async function executeStandardQuery(requestedColumns: String[], table: string, filtersDict: Record<string, any>): Promise<Record<string, any>>{
    let connection = await dbPool.connect()
    try {
        return await connection.query(`
            SELECT ${requestedColumns.map((column) => `"${column}"`)}
            FROM ${table}
            ${formatWhereClause(filtersDict)}
        `).then((queryResults) => {
            return queryResults.rows
        }, (error) => {
            console.error(error)
            return new GraphQLError("Unable to Execute Query")
        })
    } catch(exception){
        console.log(exception)
        return new GraphQLError("Something Unexpected has occured")
    } finally {
        connection.release();
    }

}

function formatWhereClause(filtersDict: Record<string, any>): string {
    const whereClauseStatements: string[] = [];
    for (const [field, value] of Object.entries(filtersDict)) {
        if (typeof value === "string") {
            whereClauseStatements.push(`"${field}" = '${value}'`);
        } else if (typeof value === "number" || typeof value === "bigint") {
            whereClauseStatements.push(`"${field}" = ${value}`);
        }
    }
    if (whereClauseStatements.length > 0) {
        return "WHERE " + whereClauseStatements.join(" AND ");
    } else {
        return "";
    }
}