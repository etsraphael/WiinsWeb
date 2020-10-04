import { Action } from '@ngrx/store';
import { ProfileModel, BtnFollow } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';

export enum ActionTypes {

  RESET_PROFILE = '@profile_page/reset',

  GET_PROFILE = '@profile/get',
  GET_PROFILE_SUCCESS = '@profile/get_success',
  GET_PROFILE_FAIL = '@profile/get_fail',

  GET_PROFILE_BY_PSEUDO = '@profileByPseudo/get',
  GET_PROFILE_BY_PSEUDO_SUCCESS = '@profileByPseudo/get_success',
  GET_PROFILE_BY_PSEUDO_FAIL = '@profileByPseudo/get_fail',

  UPDATE_COVER = '@cover/update',
  UPDATE_COVER_SUCCESS = '@cover/update_success',
  UPDATE_COVER_FAIL = '@cover/update_fail',

  UPDATE_AVATAR = '@avatar/update',
  UPDATE_AVATAR_SUCCESS = '@avatar/update_success',
  UPDATE_AVATAR_FAIL = '@avatar/update_fail',

  GET_PROFILE_BY_ID = '@profileById/get',
  GET_PROFILE_BY_ID_SUCCESS = '@profileById/get_success',
  GET_PROFILE_BY_ID_FAIL = '@profileById/get_fail',

  GET_PROFILE_FRIENDS = '@profile/get_friends',
  GET_PROFILE_FRIENDS_SUCCESS = '@profile/get_friends_success',
  GET_PROFILE_FRIENDS_FAIL = '@profile/get_friends_fail',

  UPDATE_PROFILE = '@profile/update',
  UPDATE_PROFILE_SUCCESS = '@profile/update_success',
  UPDATE_PROFILE_FAIL = '@profile/update_fail',

  DELETE_FRIEND = '@friend/delete',
  DELETE_FRIEND_SUCCESS = '@friend/delete_success',
  DELETE_FRIEND_FAIL = '@friend/delete_fail',

  UPDAT_PROFILE_ACTIF_SPACE = '@myprofile_actif_space/update',
  UPDATE_ASK = '@ask/update',
  CREATED_ASK = '@ask_friend_created_sucess',
  ASK_ACCEPTED = '@ask_friend_accepted_sucess',
  ASK_REJECTED = '@ask_friend_rejected_sucess',

  UPDATE_GROUP_LEFT = '@profile/update_left_group',

  CHANGE_BTN_FOLLOW = '@change_btn_follow_udpate',
  CHANGE_BTN_FOLLOW_SUCCESS = '@change_btn_follow_udpate_success',
  CHANGE_BTN_FOLLOW_FAIL = '@change_btn_follow_udpate_fail',

  FOLLOW_PROFILE = '@profile/follow',
  FOLLOW_PROFILE_SUCCESS = '@profile/follow_success',
  FOLLOW_PROFILE_FAIL = '@profile/follow_fail',

  UNFOLLOW_PROFILE = '@profile/unfollow',
  UNFOLLOW_PROFILE_SUCCESS = '@profile/unfollow_success',
  UNFOLLOW_PROFILE_FAIL = '@profile/unfollow_fail',

  ADD_PAGE_PROFILE = '@add_page/profile'
}

export class addPageProfile implements Action {
  readonly type = ActionTypes.ADD_PAGE_PROFILE
  constructor(public page: PageModel) { }
}

export class udapteActifSpace implements Action {
  readonly type = ActionTypes.UPDAT_PROFILE_ACTIF_SPACE
  constructor(public payload: number) { }
}

export class resetProfile implements Action {
  readonly type = ActionTypes.RESET_PROFILE
}

export class UnFollowProfile implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE
  constructor(public id: string) { }
}

export class UnFollowProfileSuccess implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE_SUCCESS
  constructor(public message: string) { }
}

export class UnFollowProfileFail implements Action {
  readonly type = ActionTypes.UNFOLLOW_PROFILE_FAIL
  constructor(public payload: string) { }
}

export class FollowProfile implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE
  constructor(public id: string) { }
}

export class FollowProfileSuccess implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE_SUCCESS
  constructor(public message: string) { }
}

export class FollowProfileFail implements Action {
  readonly type = ActionTypes.FOLLOW_PROFILE_FAIL
  constructor(public payload: string) { }
}

export class ChangeBtnFollow implements Action {
  readonly type = ActionTypes.CHANGE_BTN_FOLLOW
  constructor(public payload: BtnFollow) { }
}

export class ChangeBtnFollowSuccess implements Action {
  readonly type = ActionTypes.CHANGE_BTN_FOLLOW_SUCCESS
  constructor(public payload: BtnFollow) { }
}

export class ChangeBtnFollowFail implements Action {
  readonly type = ActionTypes.CHANGE_BTN_FOLLOW_FAIL
  constructor(public payload: string) { }
}

export class updateLeftAdminPage implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_LEFT
  constructor(public pageID: string) { }
}

export class askCreated implements Action {
  readonly type = ActionTypes.CREATED_ASK
}

export class AcceptedAsk implements Action {
  readonly type = ActionTypes.ASK_ACCEPTED
}

export class RefusedAsk implements Action {
  readonly type = ActionTypes.ASK_REJECTED
}

export class GetProfile implements Action {
  readonly type = ActionTypes.GET_PROFILE;
}

export class GetProfileSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class GetProfileFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_FAIL;
  constructor(public payload: any) { }
}

export class GetProfileByPseudo implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_PSEUDO;
  constructor(public id: string) { }
}

export class GetProfileByPseudoSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_PSEUDO_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class GetProfileByPseudoFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_PSEUDO_FAIL;
  constructor(public payload: any) { }
}

export class GetProfileFriends implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS;
}

export class GetProfileFriendsSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS_SUCCESS;
  constructor(public payload: ProfileModel[]) { }
}

export class GetProfileFriendsFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_FRIENDS_FAIL;
  constructor(public payload: any) { }
}

export class UpdateProfile implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE;
  constructor(public payload: ProfileModel) { }
}

export class UpdateProfileSuccess implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class UpdateProfileFail implements Action {
  readonly type = ActionTypes.UPDATE_PROFILE_FAIL;
  constructor(public payload: any) { }
}

export class DeleteFriend implements Action {
  readonly type = ActionTypes.DELETE_FRIEND;
  constructor(public id: string) { }
}

export class DeleteFriendSuccess implements Action {
  readonly type = ActionTypes.DELETE_FRIEND_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class DeleteFriendFail implements Action {
  readonly type = ActionTypes.DELETE_FRIEND_FAIL;
  constructor(public payload: any) { }
}

export class GetProfileById implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_ID;
  constructor(public id: string) { }
}

export class GetProfileByIdSuccess implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_ID_SUCCESS;
  constructor(public payload: ProfileModel) { }
}

export class GetProfileByIdFail implements Action {
  readonly type = ActionTypes.GET_PROFILE_BY_ID_FAIL;
  constructor(public payload: any) { }
}

export class UpdateAsk implements Action {
  readonly type = ActionTypes.UPDATE_ASK;
  constructor(public payload: ProfileModel) { }
}

export class UpdateCover implements Action {
  readonly type = ActionTypes.UPDATE_COVER;
  constructor(public cover: string) { }
}

export class UpdateCoverSuccess implements Action {
  readonly type = ActionTypes.UPDATE_COVER_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateCoverFail implements Action {
  readonly type = ActionTypes.UPDATE_COVER_FAIL;
  constructor(public error: string) { }
}

export class UpdateAvatar implements Action {
  readonly type = ActionTypes.UPDATE_AVATAR;
  constructor(public avatar: string) { }
}

export class UpdateAvatarSuccess implements Action {
  readonly type = ActionTypes.UPDATE_AVATAR_SUCCESS;
  constructor(public payload: string) { }
}

export class UpdateAvatarFail implements Action {
  readonly type = ActionTypes.UPDATE_AVATAR_FAIL;
  constructor(public error: string) { }
}

export type Actions =
  | GetProfileSuccess
  | GetProfile
  | GetProfileFail
  | GetProfileFriendsFail
  | GetProfileFriendsSuccess
  | GetProfileFriends
  | UpdateProfile
  | UpdateProfileFail
  | UpdateProfileSuccess
  | GetProfileByPseudo
  | GetProfileByPseudoSuccess
  | GetProfileByPseudoFail
  | GetProfileById
  | GetProfileByIdSuccess
  | GetProfileByIdFail
  | DeleteFriend
  | DeleteFriendSuccess
  | DeleteFriendFail
  | UpdateAsk
  | UpdateCover
  | UpdateCoverSuccess
  | UpdateCoverFail
  | UpdateAvatar
  | UpdateAvatarSuccess
  | UpdateAvatarFail
  | askCreated
  | AcceptedAsk
  | RefusedAsk
  | updateLeftAdminPage
  | ChangeBtnFollow
  | ChangeBtnFollowSuccess
  | ChangeBtnFollowFail
  | FollowProfile
  | FollowProfileSuccess
  | FollowProfileFail
  | UnFollowProfile
  | UnFollowProfileSuccess
  | UnFollowProfileFail
  | udapteActifSpace
  | resetProfile
  | addPageProfile