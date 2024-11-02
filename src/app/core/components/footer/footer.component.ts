import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FACEBOOK_GROUP_LINK, WSP_LINK } from '../../constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  wspLink = WSP_LINK;
  faceGroupLink = FACEBOOK_GROUP_LINK;

}
