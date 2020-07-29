import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './components/line-chart/line-chart.component';



@NgModule({
    declarations: [LineChartComponent],
    exports: [
        LineChartComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ChartModule { }
