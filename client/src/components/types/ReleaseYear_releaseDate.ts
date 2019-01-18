/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ReleaseDatePrecision } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ReleaseYear_releaseDate
// ====================================================

export interface ReleaseYear_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the album was first released, for example 1981. Depending on the
   * precision, it might be shown as 1981-12, or 1981-12-15.
   */
  date: string | null;
  /**
   * The precision with which the release date value is known.
   */
  precision: ReleaseDatePrecision | null;
}
