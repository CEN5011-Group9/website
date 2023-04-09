import { Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [],
  controllers: [ SearchController ],
  providers: [DatabaseService]
})
export class SearchModule {}
