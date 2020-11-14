// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  // default
  production: false,

  // core
  baseUrl: 'https://wiins-backend.herokuapp.com',
  baseSocket: 'wss://wiins-web-socket.herokuapp.com?token=',
  coinBaseUrl: 'https://api.commerce.coinbase.com',

  // amazon s3
  link_avatar_group: 'dev-eps-file-avatar-group',
  link_cover_page: 'dev-eps-file-cover-page',
  link_avatar_page: 'dev-eps-file-avatar-page',
  link_avatar: 'dev-eps-file-avatar',
  link_music: 'dev-eps-file-music',
  link_cover: 'dev-eps-file-cover',
  link_feed_publication_video: 'dev-eps-file-feed-publication-video',
  link_feed_publication_image: 'dev-eps-file-feed-publication-image',
  link_feed_publication_poster: 'dev-eps-file-feed-publication-poster',
  link_music_img: 'dev-eps-file-music-img',
  link_music_img_playlist: 'dev-eps-file-playlist-music-img',
  link_tube_video: 'dev-eps-file-tube',
  link_tube_poster: 'dev-eps-tube-poster',
  link_verification: 'dev-eps-file-verification'

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
