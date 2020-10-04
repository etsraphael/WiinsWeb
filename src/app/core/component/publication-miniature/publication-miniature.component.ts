import { Component, Input } from '@angular/core';
import { PicturePublication, PostPublication, VideoPublication } from '../../models/publication/feed/feed-publication.model';

@Component({
  selector: 'app-publication-miniature',
  templateUrl: './publication-miniature.component.html',
  styleUrls: ['./publication-miniature.component.scss']
})

export class PublicationMiniatureComponent {

  // select the publications
  @Input() feedPublication: PicturePublication | PostPublication | VideoPublication | any

}
