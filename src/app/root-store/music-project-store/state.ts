import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model';

export const featureAdapter: EntityAdapter<MusicProject> = createEntityAdapter<MusicProject>({
  selectId: model => model._id,
  sortComparer: (a: MusicProject, b: MusicProject): number =>
    b.visibilityDate.toString().localeCompare(a.visibilityDate.toString())
})

export interface State extends EntityState<MusicProject> {
  isLoading?: boolean
  error?: string
  categorie?: string
}

export const initialState: State = featureAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
    categorie: null
  }
)
