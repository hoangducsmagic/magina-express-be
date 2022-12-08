/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ObjectId } from 'mongodb';
import { MigrationInterface } from 'ts-node-migrate';

export class UpdateUserRole_1661746225352 implements MigrationInterface {
  public async up(client: MongoClient): Promise<void> {
    const users = await client.db().collection('users').find().toArray();

    const getRole = async (code: string) =>
      await client.db().collection('roles').findOne({ code });

    const updateUserRole = async (_id: ObjectId, role: any) => {
      const condition = { _id };

      return await client
        .db()
        .collection('users')
        .updateOne(condition, {
          $set: {
            role: role
          }
        });
    };

    try {
      await Promise.all(
        users.map(async (user) => {
          const role = await getRole(user.role.code);

          await updateUserRole(user['_id'], role);
        })
      );
    } catch (error) {
      throw error;
    }
  }

  public async down(): Promise<void> {
    // Do nothing here
  }
}
