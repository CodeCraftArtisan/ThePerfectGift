import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  providers: [FlowbiteService],
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      flowbite.init();
    });
  }

}
