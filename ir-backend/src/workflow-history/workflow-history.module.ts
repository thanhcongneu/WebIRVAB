import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowHistory } from './entities/workflow-history.entity';
import { WorkflowHistoryService } from './workflow-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowHistory])],
  providers: [WorkflowHistoryService],
  exports: [WorkflowHistoryService],
})
export class WorkflowHistoryModule {}
