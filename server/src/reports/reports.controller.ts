import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { get } from 'http';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  
  @Get('new')
  New_req(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.New_req(createReportDto);
  }

  @Get('all')
  All_req(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.All_req(createReportDto);
  }

  @Get('completed')
  Completed_req(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.Completed_req(createReportDto);
  }
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch('edit')
  update_chat(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.update_chat(createReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
