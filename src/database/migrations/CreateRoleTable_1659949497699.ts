import { MongoClient } from 'mongodb';
import { MigrationInterface } from 'ts-node-migrate';
import * as fs from 'fs';

export class CreateRoleTable_1659949497699 implements MigrationInterface {
  public async up(client: MongoClient): Promise<void> {
    const roles = JSON.parse(
      fs.readFileSync(__dirname + '/../master-data/role.json', 'utf-8')
    );
    await client.db().collection('roles').insertMany(roles.data);
  }

  public async down(client: MongoClient): Promise<void> {
    await client.db().collection('roles').drop();
  }
}
