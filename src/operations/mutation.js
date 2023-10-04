import { gql } from '@apollo/client';

export const played = gql`
mutation($play: Int!, $ico: Int!) {
  played(play: $play, ico: $ico) {
    table_id
    p_0
    p_1
    p_2
    p_3
    p_4
    p_5
  }
}
`;

export const resetTable = gql`
mutation($gameId: Int!) {
  resetTable(game_id: $gameId) {
    p_0
    p_1
    p_2
    p_3
    p_4
    p_5
  }
}
`;
