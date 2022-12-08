/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ObjectId } from 'mongodb';
import { MigrationInterface } from 'ts-node-migrate';

export class MigrationUserType_1663038487020 implements MigrationInterface {
  public async up(client: MongoClient): Promise<void> {
    const users = await client.db().collection('users').find().toArray();

    const getUserType = (roleCode: string) => {
      return roleCode === 'Admin'
        ? 'onboarder'
        : roleCode === 'Employee'
        ? 'onboardee'
        : '';
    };

    const updateUserType = async (_id: ObjectId, roleCode: string) => {
      const condition = { _id };
      return await client
        .db()
        .collection('users')
        .updateOne(condition, {
          $set: {
            userType: getUserType(roleCode)
          }
        });
    };

    try {
      await Promise.all(
        users.map(async (user) => {
          await updateUserType(user['_id'], user.role.code);
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
