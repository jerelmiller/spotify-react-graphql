/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AlbumGroup {
  ALBUM = "ALBUM",
  APPEARS_ON = "APPEARS_ON",
  COMPILATION = "COMPILATION",
  SINGLE = "SINGLE",
}

export enum AlbumType {
  ALBUM = "ALBUM",
  COMPILATION = "COMPILATION",
  SINGLE = "SINGLE",
}

export enum ReleaseDatePrecision {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export interface PlayCollectionInput {
  collectionUri: string;
  deviceId?: string | null;
}

export interface PlayTrackInput {
  track: string;
  deviceId?: string | null;
  contextUri?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
