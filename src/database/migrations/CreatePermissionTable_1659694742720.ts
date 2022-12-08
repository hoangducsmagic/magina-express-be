import { MongoClient } from 'mongodb';
import { MigrationInterface } from 'ts-node-migrate';
import * as fs from 'fs';

export class CreatePermissionTable_1659694742720 implements MigrationInterface {
  public async up(client: MongoClient): Promise<void> {
    const permissions = JSON.parse(
      fs.readFileSync(__dirname + '/../master-data/permission.json', 'utf-8')
    );
    await client.db().collection('permissions').insertMany(permissions.data);
  }

  public async down(client: MongoClient): Promise<void> {
    await client.db().collection('permissions').drop();
  }
}
