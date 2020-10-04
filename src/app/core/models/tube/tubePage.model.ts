import { TubeModel } from './tube.model';
import { CommentModel } from '../comment/comment.model';

export class TubePageModel {
  tube: TubeModel | any
  comments: [CommentModel]
  tubes: [TubeModel]
}